const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/auth');
const bodyParser = require('body-parser');
const mongoose = require("mongoose")

const employeeScheduleRoutes = require('./routes/employeeScheduleRoutes');
const timesheetRoutes = require('./routes/timesheetRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const projectRoutes = require('./routes/projectRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

mongoose.connect('mongodb://localhost:27017/employee_management')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));


const app = express();
const port = process.env.PORT || 5000;


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', authRoute);
app.use('/api/employee-schedules', employeeScheduleRoutes);
app.use('/api/timesheets', timesheetRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/complaints', complaintRoutes);


app.listen(port, () => { console.log(`Server is running at ${port}!`) });

