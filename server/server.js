const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const FUNNY_MOVIES_KEY = process.env.FUNNY_MOVIES_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const MYSQL_HOST = process.env.MYSQL_HOST;
const MYSQL_DATABASE_NAME = process.env.MYSQL_DATABASE_NAME;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;

const ACCESS_TOKEN_SECRET =  crypto.randomBytes(64).toString('hex');

const connection = mysql.createConnection({
  host: `${MYSQL_HOST}`,
  user: `${MYSQL_USER}`,
  password: `${MYSQL_PASSWORD}`,
  database: `${MYSQL_DATABASE_NAME}`
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

// set up body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('api server work!')
})


// set up CORS middleware

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
  next();
});

app.use(cors({
  origin: ['https://funny-movies-7dsu.vercel.app','https://funny-movies-7dsu.vercel.app/*' ]
}));


//token access
const generateAccessToken = (id) => {
  return jwt.sign(id, ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
};

// Post method
app.post(`${FUNNY_MOVIES_KEY}/login`, async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send('Please provide an email and password');
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.query(sql, [email], async (error, results) => {
      if (error) {
        return res.status(500).send('An error occurred');
      }

      if (results.length === 0) {
        return res.status(400).send('Invalid email or password');
      }

      const user = results[0];

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send('Invalid email or password');
      }

      const token = generateAccessToken({ id: user.id });

      res.status(200).send({ user, token, message: 'Login successfully', });
    });
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

app.post(`${FUNNY_MOVIES_KEY}/register`, async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;

    if (!username || !email || !password) {
      return res.status(400).send('Please provide a name, email and password');
    }

    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.query(sql, [email], async (error, results) => {
      if (error) {
        return res.status(500).send('An error occurred');
      }

      if (results.length > 0) {
        return res.status(400).send('Email already exists');
      }

      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const token = generateAccessToken({ email });

      const sql = 'INSERT INTO users (username, email, password, isAdmin) VALUES (?, ?, ?, ?)';
      connection.query(sql, [username, email, hashedPassword, false], (error, results) => {
        if (error) {
          return res.status(500).send('An error occurred');
        }

        res.status(201).send({ message: 'User created successfully', token});
      });
    });
  } catch (error) {
    res.status(500).send('An error occurred');
  }
});

app.post(`${FUNNY_MOVIES_KEY}/video`, async (req, res) => {
  const { url, video_id } = req.body;
  try {
      // Check if the video URL already exists in the database
      connection.query('SELECT * FROM video WHERE video_id = ?', [video_id], async (error, results) => {
      if (error) {
        return res.status(500).send('An error occurred');
      }
      if (results.length > 0) {
        return res.status(409).json({ message: 'Video URL already exists' });
      }
      connection.query('INSERT INTO video (url, video_id) VALUES (?, ?)', [url, video_id], (error, results) => {
        if (error) {
          return res.status(500).send('An error occurred');
        }
        res.status(201).send({ message: 'Video URL successfully added' });
      });
    });

    // If the video URL does not exist, insert it into the database
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Get method
app.get(`${FUNNY_MOVIES_KEY}/videos`, (req, res) => {
  const sql = 'SELECT * FROM video';
  connection.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/video/:videoId', (req, res) => {
  const videoId = req.params.videoId;
  const apiUrl = `${YOUTUBE_API_KEY}`+`id=${videoId}&key=${GOOGLE_API_KEY}&part=snippet`;
  
  axios.get(apiUrl)
    .then(response => {
      const videoData = response.data.items[0];
      res.send(videoData);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('Error fetching video data');
    });
});


const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


module.exports = app
