const express = require('express');
const axios = require('axios');
const { exec } = require('child_process');
const app = express();
const port = 3001;
const cors = require('cors');
const { access } = require('fs');

app.use(access);
app.use(cors());

require('dotenv').config();

app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { receiver, password, subject, text } = req.body;
  const sender = process.env.SMTP_SENDER;

  try {
    const response = await axios.post('http://localhost:3001', {
      sender,
      receiver,
      password,
      subject,
      text
    }, {
      headers: {
        'access-control-allow-origin': '*',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    console.log(response.data);

    // Set environment variables for the Python script
    process.env.RECEIVER = receiver;
    process.env.PASSWORD = password;
    subject = "testando o envio de email"
    text = "testando o envio de email"

    exec('python smtp.py', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).send('Error sending email');
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
      res.send('Email sent successfully');
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending email via API Gateway');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
