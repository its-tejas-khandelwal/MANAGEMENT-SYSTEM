const express = require('express');
const router = express.Router();
const EmployeeSchedule = require('../models/EmployeeSchedule');
const fetchuser = require('../middleware/middleware');
const dotenv = require('dotenv');
dotenv.config();

router.post('/create', fetchuser, async (req, res) => {
    try {
        const { email } = req.user;

        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(400).json({ error: 'You are not authorized to create a schedule' });
        }

        const { employeeId, date, shift, tasks } = req.body;
        const schedule = new EmployeeSchedule({ employeeId, date, shift, tasks: tasks.split(',') });
        await schedule.save();
        res.status(201).json(schedule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/all', fetchuser, async (req, res) => {
    try {
        const { email } = req.user;

        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(400).json({ error: 'You are not authorized to view all schedules' });
        }

        const schedules = await EmployeeSchedule.find();
        res.status(200).json(schedules);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/', fetchuser, async (req, res) => {
    try {
        const { id } = req.user;
        const schedules = await EmployeeSchedule.find({ employeeId: id });
        res.status(200).json(schedules);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
