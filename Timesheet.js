const mongoose = require("mongoose")


const TimesheetSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: String, required: true },
  clockIn: { type: String, required: true },
  clockOut: { type: String, required: true },
  totalHours: { type: Number, required: true },
});

module.exports = mongoose.model('Timesheet', TimesheetSchema);
