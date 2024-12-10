const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  assignedEmployees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
  tasks: [
      {
          taskName: { type: String, required: true },
          assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
          deadline: { type: Date, required: true },
          status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
      },
  ],
});

module.exports = mongoose.model('Project', ProjectSchema);
