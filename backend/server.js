const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());
app.use(express.json());

require('dotenv').config();

app.post('/send-email', (req, res) => {
  const { receiver, subject, text } = req.body;
  const sender = process.env.SMTP_SENDER;
  const password = process.env.SMTP_PASSWORD;

  // Prepare command with arguments
  const command = `python smtp.py "${receiver}" "${subject}" "${text}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Error sending email');
    }
    console.log(`stdout: ${stdout}`);
    console.error(`stderr: ${stderr}`);
    res.send('Email sent successfully');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
