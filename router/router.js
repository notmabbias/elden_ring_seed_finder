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
  {value:"Rise",label:"Rise"},
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

//find page render
router.get('/find', (req, res) => {
  res.render('find', {majorBase, smallBase, shifting_earth, currentNightlord});
})

//post for selection page
router.post('/find', async (req, res) => {
  
  //add logic for libra and maris seed

  //find seed
  const foundSeed = await findSeed(req.body.curNightLord,req.body.shifting_earth_sel,req.body.major1,req.body.elements1,req.body.major2,req.body.elements2,req.body.small1,req.body.small2)
  //find extra data for seed, if seed found

  //check if arary has return anything, if not redirect to error page
  if (!Array.isArray(foundSeed) || foundSeed.length === 0) {
    res.status(500).redirect("seedError");
  }
  //if array returns something, grab extra data and render result page
  else {
    const extraData = await getExtraData(foundSeed[0].seed);
    //send data to page to be rendered
    res.render('result', {data: foundSeed, extraData: extraData, formData: req.body})
  }
})

//string page render
router.get('/string',(req, res) => {
  res.render('string')
})

router.post('/string', async (req, res) => {
  console.log(req.body.stringInput);
  //just for now - not an actual error
  stringReader(req.body.stringInput)
  res.redirect('seedError')
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



//timer page
router.get("/timer", (req, res) => {
  res.render('timer')
})


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

async function findSeed(nightlordInput,shiftingEarthInput, base1Input, element1Input, base2Input, element2Input, small1Input, small2Input) {
  try {
    const selectResult = await AppDataSource.manager
    .createQueryBuilder(seed,'s')
    .select('s')
    .where('s.nightlord = :nightlord', {nightlord: nightlordInput})
    .andWhere('s.shifting_earth = :earth', {earth: shiftingEarthInput})
    .andWhere('s.summonwater_base = :base1', {base1: base1Input})
    .andWhere('s.summonwater_element = :element1', {element1: element1Input})
    .andWhere('s.mistwood_base = :base2', {base2: base2Input})
    .andWhere('s.mistwood_element = :element2', {element2: element2Input})
    .andWhere('s.hawk_small_base = :small1', {small1: small1Input})
    .andWhere('s.church_small_base = :small2', {small2: small2Input})
    .getMany();

    return selectResult;
  }
  catch (err) {
    console.error("seed query error:\n", err);
    res.status(500).redirect("seedError");
  }
  
}

async function getExtraData(inputSeed) {
  try {
    const extraData = await AppDataSource.manager
    .createQueryBuilder(seed_data,'sd')
    .select('sd')
    .where('sd.seed = :seed', {seed: inputSeed})
    .getMany();

    return extraData;
  }
  catch (err) {
    console.error("extra data query error:\n",err) 
    res.status(500).redirect("seedError")
  }
}


function stringReader(inputString) {
  //example string:
  //d(shiftingearth)cf(camp,fire)gn(church,none)cr(church,rise)
  //dcfgncr

  earthPairs = [
    {'d':'Default'},
    {'m':'Mountaintop'},
    {'c':'Crater'},
    {'r:':'Rotted_Woods'},
    {'n':'Noklateo'}
  ]

  const checkString = inputString.toLowerCase().trim();

  if (checkString.length !== 7) {
    console.log("incorrect string size")
    return null;
  }

  for (let i=0; i<checkString.length;i++) {
    console.log(checkString[i])
  }

  




  


}



module.exports = router;
