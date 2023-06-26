const express = require('express');
const app = express();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const path = require('path');

const Users = require('./models/Users');
const Watchlist = require('./models/Watchlist');
const Favourite = require('./models/Favourite');

app.use(cookieParser());
app.use(express.static('public'));
app.use(cors({
  origin: true,
  credentials: true,
}));
dotenv.config();
app.use(express.json())

//Databse connection
mongoose.connect(process.env.DATABASE_CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//JWT secret key
const jwtSecret = process.env.JWT_SECRET_KEY

//Uploading profile picture
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/uploads/');
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

//Registering a new user
app.post('/register', upload.single('photo'), async (req, res) => {
  const { name, email, password } = req.body;
  const { filename } = req.file;
  const securePass = bcrypt.hashSync(password, 15);
  try {
    // Check if user already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    //Creating a new user if not already presnt
    const createdUser = await Users.create({ name, email, photo: filename, password: securePass });
    //Assigning a cookie
    jwt.sign({ userId: createdUser._id, name: createdUser.name, photo: createdUser.photo, email: createdUser.email }, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none', path: '/' }).status(201).json({ name: createdUser.name, email: createdUser.email, photo: createdUser.photo });
    })
  } catch (err) {
    res.json("User cannot be created");
  }
});

//Logging in an existing user
app.post('/login', upload.none(), async (req, res) => {
  const { email, password } = req.body;
  console.log("email:", email)
  try {
    const findUser = await Users.findOne({ email: email });
    console.log("user:", findUser);
    if (findUser) {
      const passOk = bcrypt.compareSync(password, findUser.password);
      if (passOk) {
        jwt.sign({ userId: findUser._id, name: findUser.name, email: findUser.email, photo: findUser.photo }, jwtSecret, {}, (err, token) => {
          if (err) throw err;
          res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'none', path: '/' }).status(200).json(findUser);
        });
      } else {
        res.status(401).json("Password not matched");
      }
    } else {
      res.status(401).json('User not found');
    }
  }
  catch (err) {
    res.status(500).json('Internal Server Error');
  }
})

//Fetching the profile of the logged in user
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    //Verify the token 
    jwt.verify(token, jwtSecret, {}, (err, data) => {
      if (err) throw err;
      res.json(data);
    })
  } else {
    res.status(401).json('no token');
  }
})

//Adding content to watchlist
app.post('/watchlist', async (req, res) => {
  const { userId, contentId, type } = req.body;
  try {
    // Find the watchlist for the given userId
    const watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) {
      // No watchlist exists, create a new one
      const newWatchlist = new Watchlist({
        userId: userId,
        content: [],
      });
      newWatchlist.content.push({ contentId, type });
      await newWatchlist.save();
      return res.json({ message: 'Content added to watchlist' });
    }
    // Check if the content is already present
    const existingContentIndex = watchlist.content.findIndex(
      (c) => c.contentId == contentId
    );
    if (existingContentIndex !== -1) {
      // Content already exists, remove it from the watchlist
      watchlist.content.splice(existingContentIndex, 1);
      await watchlist.save();
      return res.json({ message: 'Content removed from watchlist' });
    }
    // Content not present, add it to the watchlist
    const newContent = { contentId, type };
    watchlist.content.push(newContent);
    await watchlist.save();
    return res.json({ message: 'Content added to watchlist' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});


app.get('/watchlistSection', async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await Watchlist.findOne({ userId });
    if (user) {
      const contentIds = user.content;
      res.status(200).json(contentIds);
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/favourite', async (req, res) => {
  const { userId, contentId, type } = req.body;
  try {
    // Find the favourites for the given userId
    const favourite = await Favourite.findOne({ userId });
    if (!favourite) {
      // No favourites exists, create a new one
      const newFavourite = new Favourite({
        userId: userId,
        content: [],
      });
      newFavourite.content.push({ contentId, type });
      await newFavourite.save();
      return res.json({ message: 'Content added to favourites' });
    }
    // Check if the content is already present
    const existingContentIndex = favourite.content.findIndex(
      (c) => c.contentId == contentId
    );
    if (existingContentIndex !== -1) {
      // Content already exists, remove it from the favourites
      favourite.content.splice(existingContentIndex, 1);
      await favourite.save();
      return res.json({ message: 'Content removed from favourites' });
    }
    // Content not present, add it to the watchlist
    const newContent = { contentId, type };
    favourite.content.push(newContent);
    await favourite.save();
    return res.json({ message: 'Content added to favourites' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
});

app.get('/favouriteSection', async (req, res) => {
  const { userId } = req.query;
  try {
    const user = await Favourite.findOne({ userId });
    if (user) {
      const contentIds = user.content;
      res.status(200).json(contentIds);
    } else {
      res.status(404).json("User not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});




//User Logging out
app.post('/logout', (req, res) => {
  res.cookie('token', '').json("Logged Out");
})

app.listen(4001);