const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send', async (req, res) => {
  const { email, filename } = req.body;

  try {
    const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "umasrikandhukuri@gmail.com",
    pass: "laez jgda pvhy jbvk"
  }
});

    const link = `http://localhost:5000/uploads/${filename}`;

    await transporter.sendMail({
      from: 'your_email@gmail.com',
      to: email,
      subject: 'Document Shared with You',
      text: `Download your document here: ${link}`
    });

    res.json({ message: 'Email sent successfully' });

  } catch (err) {
    console.log("EMAIL ERROR FULL:",err);
    res.status(500).json({ message: 'Email failed' });
  }
});

module.exports = router;