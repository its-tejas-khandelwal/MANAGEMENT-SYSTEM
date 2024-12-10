const express = require('express');
const router = express.Router();
const Timesheet = require('../models/Timesheet');
const fetchuser = require('../middleware/middleware');

const dotenv = require('dotenv');
dotenv.config();

router.post('/create', fetchuser, async (req, res) => {
    try {

        const { email } = req.user;
        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(400).json({ error: 'You are not authorized to create a timesheet' });
        }

        const { employeeId, date, clockIn, clockOut, totalHours } = req.body;
        const timesheet = new Timesheet({ employeeId, date, clockIn, clockOut, totalHours });
        await timesheet.save();
        res.status(201).json(timesheet);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/all', fetchuser, async (req, res) => {
    try {
        const { email } = req.user;
        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(400).json({ error: 'You are not authorized to view all timesheets' });
        }

        const timesheets = await Timesheet.find();
        res.status(200).json(timesheets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', fetchuser, async (req, res) => {
    try {

        const { id } = req.user;

        const timesheets = await Timesheet.find({ employeeId: id });
        res.status(200).json(timesheets);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
