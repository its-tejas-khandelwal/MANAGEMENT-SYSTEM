const mongoose = require("mongoose")


const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: {type: String, required: true},
  position: { type: String, required: true },
  department: { type: String },
  hireDate: { type: Date, required: true },
});

module.exports = mongoose.model('Employee', EmployeeSchema);
