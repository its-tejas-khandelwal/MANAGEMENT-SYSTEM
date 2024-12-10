const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const fetchuser = require('../middleware/middleware');

const dotenv = require('dotenv');
dotenv.config();

router.post('/submit', fetchuser, async (req, res) => {
    try {
        const { title, description } = req.body;
        const complaint = new Complaint({ employeeId: req.user.id, title, description });
        await complaint.save();
        res.status(201).json(complaint);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/my', fetchuser, async (req, res) => {
    try {
        const complaints = await Complaint.find({ employeeId: req.user.id });
        res.status(200).json(complaints);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/update/:complaintId', async (req, res) => {
    try {
        const { status } = req.body;
        const complaint = await Complaint.findByIdAndUpdate(req.params.complaintId, { status }, { new: true });
        res.status(200).json(complaint);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', fetchuser, async (req, res) => {
    try {
        const { email } = req.user;

        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(400).json({ error: 'You are not authorized to view all schedules' });
        }

        const complaints = await Complaint.find();
        res.status(200).json(complaints);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = router;
