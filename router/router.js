const express = require('express');
const router = express.Router();

const majorBase = [
  {value:"mCamp",label:"Camp"},
  {value:"mRuins",label:"Ruins"},
  {value:"mChurch",label:"Church"},
  {value:"mFort",label:"Fort"},
  {value:"mNone",label:"None"}
]

const elements = [
  {value: "eNone", label: "None", mCampSh:true,mRuinsSh:true,mChurchSh:true,mFort:true},
  {value: "eFire", label: "Fire", mCampSh:true,mRuinsSh:false,mChurchSh:true,mFort:false},
  {value: "eLightning", label: "Lightning", mCampSh:true,mRuinsSh:true,mChurchSh:false,mFort:false},
  {value: "eMadness", label: "Madness", mCampSh:true,mRuinsSh:false,mChurchSh:false,mFort:false},
  {value: "ePoison", label: "Poison", mCampSh:false,mRuinsSh:true,mChurchSh:false,mFort:false},
  {value: "eBleed", label: "Bleed", mCampSh:false,mRuinsSh:true,mChurchSh:false,mFort:false},
  {value: "eHoly", label: "Holy", mCampSh:false,mRuinsSh:true,mChurchSh:true,mFort:false},
  {value: "eMagic", label: "Magic", mCampSh:false,mRuinsSh:true,mChurchSh:false,mFort:true},
  {value: "eDeath", label: "Death", mCampSh:false,mRuinsSh:true,mChurchSh:false,mFort:false},
  {value: "eSleep", label: "Sleep", mCampSh:false,mRuinsSh:true,mChurchSh:false,mFort:false},
  {value: "eFrost", label: "Frost", mCampSh:false,mRuinsSh:true,mChurchSh:false,mFort:false}
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
