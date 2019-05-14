const express = require("express");
const cors = require('cors');
const jwt = require("jsonwebtoken");

// Use dotenv to read .env vars into Node
require('dotenv').config();

const PORT = process.env.PORT || 5000;

console.log('process.env.PORT', process.env.PORT);
console.log('process.env.APP_SECRET', process.env.APP_SECRET);

const app = express();
app.use(cors());
//allow OPTIONS on all resources
app.options('*', cors());

app.get('/api', (req, res) => {
  res.json({
    message: "Welcome to the API"
  });
});

// Verify Token Middleware
function verifyToken(req, res, next){
  const bearerToken = req.headers["authorization"];
  if(bearerToken) {
    req.token = bearerToken.split(" ")[1];
    next();
  } else {
    res.json(403, {
      error: "Bearer token is missing from the header",
      data: []
    });
  }
}

app.post('/api/posts', verifyToken, (req, res) => {
  try {
    const decoded = jwt.verify(req.token, process.env.APP_SECRET);
    res.json(200, {
      error: null,
      authData: decoded,
      message: "Post has been created"
    });
  } catch(e) {
    res.json(403, {
      error: e.message,
      data: []
    });
  }
});

app.post('/api/login', (req, res) => {
  // TODO: Will come from DB
  const user = {
    id: "#123",
    email: "jdoe@gmail.com",
    username: "John",
    firstName: "Doe",
    lastName: "V",
    dob : "10/04/1991",
    address: {
        street: "#123 street",
        city: "Tampa",
        state: "Florida",
        zip: "33813"
    }
  };

  // Create token
  const jwtOptions = {
    expiresIn: '1h',
  };
  const token = jwt.sign({user}, process.env.APP_SECRET, jwtOptions);

  // Send token in response
  res.json(200, {
    token
  });
});

app.listen(PORT, () => {
  console.log("App is listening to port " + PORT);
})
