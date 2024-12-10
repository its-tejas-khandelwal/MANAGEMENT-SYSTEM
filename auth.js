const express = require('express');
const Employee = require('../models/Employee');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const fetchuser = require('../middleware/middleware');
const dotenv = require('dotenv');
dotenv.config();

// For User
router.post('/login-employee', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const user = await Employee.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isMatch = user.password === password;

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    });


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.post('/register-employee', fetchuser, async (req, res) => {
  try {
    const { email: adminEmail } = req.user;

    if (adminEmail !== process.env.ADMIN_EMAIL) {
      return res.status(400).json({ message: "You are not authorized to perform this action" });
    }

    const { name, email, password, position, department, hireDate } = req.body;
    const newUser = new Employee({ name, email, password, position, department, hireDate });

    if (!name || !email || !password || !position || !department || !hireDate) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const existingUser = await Employee.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        type: newUser.type,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})


// For Admin
router.post('/login-admin', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const adminMail = process.env.ADMIN_EMAIL;
    const adminPass = process.env.ADMIN_PASSWORD;

    if (email !== adminMail || password !== adminPass) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: adminMail }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        email: adminMail,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get('/get-employees', fetchuser, async (req, res) => {
  try {
    const { email: adminEmail } = req.user;

    if (adminEmail !== process.env.ADMIN_EMAIL) {
      return res.status(400).json({ message: "You are not authorized to perform this action" });
    }

    const employees = await Employee.find();
    res.json(employees);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.delete('/delete-employee/:id', fetchuser, async (req, res) => {
  try {
    const { email: adminEmail } = req.user;

    if (adminEmail !== process.env.ADMIN_EMAIL) {
      return res.status(400).json({ message: "You are not authorized to perform this action" });
    }

    const { id } = req.params;
    await Employee.findByIdAndDelete(id);

    res.json({ message: "Employee deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.put('/update-employee/:id', fetchuser, async (req, res) => {
  try {
    const { email: adminEmail } = req.user;

    if (adminEmail !== process.env.ADMIN_EMAIL) {
      return res.status(400).json({ message: "You are not authorized to perform this action" });
    }

    const { id } = req.params;

    await Employee.findByIdAndUpdate(id, req.body);

    res.json({ message: "Employee updated successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})

router.get('/myProfile', fetchuser, async (req, res) => {
  try {
    const user = await Employee.findById(req.user.id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
})


module.exports = router;