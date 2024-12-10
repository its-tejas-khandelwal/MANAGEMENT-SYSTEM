const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');
const fetchuser = require('../middleware/middleware');
const dotenv = require('dotenv');
dotenv.config();

router.post('/request', fetchuser, async (req, res) => {
    try {
        const { startDate, endDate, reason } = req.body;
        const leaveRequest = new Leave({ employeeId: req.user.id, startDate, endDate, reason });
        await leaveRequest.save();
        res.status(201).json(leaveRequest);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', fetchuser, async (req, res) => {
    try {

        const { email } = req.user;

        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const leaves = await Leave.find();
        res.status(200).json(leaves);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/my', fetchuser, async (req, res) => {
    try {
        const leaves = await Leave.find({ employeeId: req.user.id });
        res.status(200).json(leaves);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/update/:leaveId', async (req, res) => {
    try {
        const { status } = req.body;
        const leave = await Leave.findByIdAndUpdate(req.params.leaveId, { status }, { new: true });
        res.status(200).json(leave);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
