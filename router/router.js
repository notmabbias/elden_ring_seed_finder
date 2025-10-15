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


//not needed, in findElements.js
const elements = [
  {value: "eNone", label: "None", mCamp:true,mRuins:true,mChurch:true,mFort:true},
  {value: "eFire", label: "Fire", mCamp:true,mRuins:false,mChurch:true,mFort:false},
  {value: "eLightning", label: "Lightning", mCamp:true,mRuins:true,mChurch:false,mFort:false},
  {value: "eMadness", label: "Madness", mCamp:true,mRuins:false,mChurch:false,mFort:false},
  {value: "ePoison", label: "Poison", mCamp:false,mRuins:true,mChurch:false,mFort:false},
  {value: "eBleed", label: "Bleed", mCamp:false,mRuins:true,mChurch:false,mFort:false},
  {value: "eHoly", label: "Holy", mCamp:false,mRuins:true,mChurch:true,mFort:false},
  {value: "eMagic", label: "Magic", mCamp:false,mRuins:true,mChurch:false,mFort:true},
  {value: "eDeath", label: "Death", mCamp:false,mRuins:true,mChurch:false,mFort:false},
  {value: "eSleep", label: "Sleep", mCamp:false,mRuins:true,mChurch:false,mFort:false},
  {value: "eFrost", label: "Frost", mCamp:false,mRuins:true,mChurch:false,mFort:false}
]




//home page

router.get('/', (req, res) => {
  res.render('home');
})

//find page

router.get('/find', (req, res) => {
  res.render('find', {majorBase, elements});
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
