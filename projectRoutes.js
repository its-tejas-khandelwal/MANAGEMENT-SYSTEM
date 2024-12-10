const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const fetchuser = require('../middleware/middleware');
const dotenv = require('dotenv');
dotenv.config();

router.post('/create', fetchuser, async (req, res) => {
    try {
        const { email } = req.user;

        if (email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const { name, description, startDate, endDate, assignedEmployees, tasks } = req.body;
        const project = new Project({ name, description, startDate, endDate, assignedEmployees, tasks });
        await project.save();
        res.status(201).json(project);
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
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/updateTask/:projectId', async (req, res) => {
    try {
        const { taskId, status } = req.body;
        const project = await Project.findByIdAndUpdate(
            req.params.projectId,
            { 'tasks.$[task].status': status },
            { arrayFilters: [{ 'task._id': taskId }], new: true }
        );
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/myProjects', fetchuser, async (req, res) => {
    try {
        const projects = await Project.find({ assignedEmployees: req.user.id });
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;
