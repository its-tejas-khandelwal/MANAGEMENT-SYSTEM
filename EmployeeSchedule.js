const mongoose = require('mongoose');

const EmployeeScheduleSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    date: { type: String, required: true },
    shift: { type: String, enum: ['Morning', 'Evening', 'Night'], required: true },
    tasks: [{ type: String }],
});

module.exports = mongoose.model('EmployeeSchedule', EmployeeScheduleSchema);
