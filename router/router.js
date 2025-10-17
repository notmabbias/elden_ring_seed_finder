const express = require('express');
const router = express.Router();
const { AppDataSource } = require("../db/db");
const { seed } = require("../entity/seed"); 
const { seed_data } = require("../entity/seed_data")

const majorBase = [
  {value:"select",label:"--Select--"},
  {value:"Camp",label:"Camp"},
  {value:"Ruins",label:"Ruins"},
  {value:"Great_Church",label:"Church"},
  {value:"Fort",label:"Fort"},
  {value:"None",label:"None"}
]

const smallBase = [
  {value:"Nothing",label:"None"},
  {value:"Church",label:"Church"},
  {value:"Township",label:"Township"},
  {value:"Rise",label:"Sorcerer's Rise"},
  {value:"Difficult_Rise",label:"Difficult Rise"}
]

const shifting_earth = [
  {value:"Default",label:"Default"},
  {value:"Mountaintop",label:"Mountaintop"},
  {value:"Crater",label:"Crater"},
  {value:"Rotted_Woods",label:"Rotted Woods"},
  {value:"Noklateo",label:"Noklateo"},
]

const currentNightlord = [
  { value: "Gladius", label: "Gladius" },
  { value: "Adel", label: "Adel" },
  { value: "Gnoster", label: "Gnoster" },
  { value: "Maris", label: "Maris" },
  { value: "Libra", label: "Libra" },
  { value: "Fulghor", label: "Fulghor" },
  { value: "Caligo", label: "Caligo" },
  { value: "Heolstor", label: "Heolstor" },
];





//home page

router.get('/', (req, res) => {
  res.render('home');
})

//find page

router.get('/find', (req, res) => {
  res.render('find', {majorBase, smallBase, shifting_earth, currentNightlord});
})

router.post('/find', async (req, res) => {
  const nightLordQuery = req.query.nightlord;
  
  //logic for db

  let currentSeed = 0;

  //add logic for libra and maris seed


  try {
    const rows = await AppDataSource.manager
    .createQueryBuilder(seed,'s')
    .select('s')
    .where('s.nightlord = :nightlord',{ nightlord: req.body.curNightLord})
    .andWhere('s.summonwater_base = :base1', { base1: req.body.major1})
    .andWhere('s.summonwater_element = :element1', {element1: req.body.elements1})
    .andWhere('s.mistwood_base = :base2', {base2: req.body.major2})
    .andWhere('s.mistwood_element = :element2', {element2: req.body.elements2})
    .andWhere('s.hawk_small_base = :small1', {small1: req.body.small1})
    .andWhere('s.church_small_base = :small2', {small2: req.body.small2})
    .getMany();

    currentSeed = rows[0].seed;
  
    const extraData = await AppDataSource.manager
    .createQueryBuilder(seed_data,'sd')
    .select('sd')
    .where('sd.seed = :seed',{seed: currentSeed})
    .getMany();



    res.render('result', {data: rows, extraData: extraData, formData: req.body})
    
  } catch (err) {
    console.error("query error:", err);
    res.status(500).redirect("seedError")
  }


  //res.render('result', {data: req.body})

})

router.get('/seedError', (req,res) => {
  res.render('seedError')
}) 



router.get('/test/:id', (req,res) => {
  try {
    const repo = AppDataSource.getRepository(seed);
    
  } catch (err) {
    console.error("query error:", err);
    res.status(500).send("whoops!!!")
  }
})


// .andWhere
// createQueryBuilder("user")
//     .where("user.firstName = :firstName", { firstName: "Timber" })
//     .andWhere("user.lastName = :lastName", { lastName: "Saw" })

//crappy code
router.get("/seed/:id", async (req, res) => {
  try {
    const repo = AppDataSource.getRepository(seed);
    const result = await repo.findOneBy({ seed: parseInt(req.params.id) });
    if (result) {
      res.json(result);
    } else {
      res.status(404).send("Seed not found");
    }
  } catch (err) {
    console.error("Query error:", err);
    res.status(500).send("Internal Server Error");
  }
});



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
