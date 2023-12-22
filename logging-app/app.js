const express = require('express');
require('dotenv').config();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const path = require('path');
const Log = require('./log');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();


const { connectDB } = require('./db');
const ip = process.env.IP;
app.use(cors({
  origin: (origin, callback) => {
      const allowedOrigins = [`http://${ip}:3000`, `http://${ip}`];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();


app.get('/', (req, res) => {
  res.send('Logging Service is running');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    // Authenticate the user
    if (username === process.env.ADMIN_USER && password === process.env.ADMIN_PASSWORD) {
      const user = { name: username };
  
      // Generate a JWT
      const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET,  { expiresIn: '1h' });
      res.json({ accessToken });
    } else {
      res.status(401).send('Username or password incorrect');
    }
  });

  const authenticateToken = (req, res, next) => {
    // Get the auth header value
    const authHeader = req.headers['authorization'];
  
    // Check if bearer token is present
    if (authHeader) {
      const token = authHeader.split(' ')[1]; // Bearer <token>
  
      // Verify the token
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
          // If token is not valid, respond with 403 Forbidden
          console.error("Token Verification Error:", err);
          return res.status(403).json({ message: "Forbidden. Invalid token." });
        }
  
        // If token is valid, add user info to request and proceed
        req.user = user;
        next();
      });
    } else {
      // If no token, respond with 401 Unauthorized
      res.status(401).json({ message: "Unauthorized. No token provided." });
    }
  };

app.get('/logs', authenticateToken,  async (req, res) => {
  try {
    const logs = await Log.find({});
    res.json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/logs', upload.single('logFile'), async (req, res) => {
  const sourceIdentifier = req.headers['x-source-identifier'] || 'Unknown';
  console.log('Received logs from:', sourceIdentifier);
  try {
    // Validate file type by extension
    const fileExtension = path.extname(req.file.originalname).toLowerCase();
    if (fileExtension !== '.json') {
      return res.status(400).send('Invalid file type. Only JSON files are allowed.');
    }

    // Validate file type by MIME type (assuming multer sets mimetype)
    if (req.file.mimetype !== 'application/json') {
      return res.status(400).send('Invalid MIME type. Only JSON files are allowed.');
    }

    // Read and parse the file
    const logEntries = fs.readFileSync(req.file.path, 'utf8');
    const logs = JSON.parse(logEntries);

    // Validate JSON structure (Basic example, consider using a schema validation library for complex structures)
    if (!Array.isArray(logs) || !logs.every(log => log.hasOwnProperty('timestamp') && log.hasOwnProperty('level'))) {
      return res.status(400).send('Invalid JSON structure.');
    }

    // Insert logs into the database
    await Log.insertMany(logs);

    res.status(201).send('Log file processed successfully');
  } catch (error) {
    res.status(400).send('Error processing log file: ' + error.message);
  }
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});