const express = require('express');
const router = express.Router();

const majorBase = [
  {value:"select",label:"--Select--"},
  {value:"mCamp",label:"Camp"},
  {value:"mRuins",label:"Ruins"},
  {value:"mChurch",label:"Church"},
  {value:"mFort",label:"Fort"},
  {value:"mNone",label:"None"}
]

const smallBase = [
  {value:"sCamp",label:"None"},
  {value:"sChurch",label:"Church"},
  {value:"sTown",label:"Township"},
  {value:"sRise",label:"Sorcerer's Rise"}
]




//home page

router.get('/', (req, res) => {
  res.render('home');
})

//find page

router.get('/find', (req, res) => {
  res.render('find', {majorBase, smallBase});
})








// Login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Handle login form submit
router.post('/login', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.render('login', { error: 'Username is required' });
  }

  // Save user in session
  req.session.user = { username };
  res.redirect('/dashboard');
});

// Dashboard (protected)
router.get('/dashboard', (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  res.render('dashboard', { user: req.session.user });
});

// Logout
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.send('Error logging out');

    res.clearCookie('connect.sid');
    res.redirect('/login');
  });
});

module.exports = router;
