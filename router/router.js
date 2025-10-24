const express = require('express');
const router = express.Router();
const { AppDataSource } = require("../db/db");
const { seed } = require("../entity/seed"); 
const { seed_data } = require("../entity/seed_data")

const majorBase = [
  {value:"select",label:"--Select--"},
  {value:"Camp",label:"Camp",short:'c'},
  {value:"Ruins",label:"Ruins",short:'r'},
  {value:"Great_Church",label:"Church",short:'g'},
  {value:"Fort",label:"Fort",short:'f'},
  {value:"None",label:"None",short:'n'}
]

const smallBase = [
  {value:"Nothing",label:"None",short:'n'},
  {value:"Church",label:"Church",short:'c'},
  {value:"Township",label:"Township",short:'t'},
  {value:"Rise",label:"Rise", short:'r'},
  {value:"Difficult_Rise",label:"Difficult Rise",short:'d'}
]

const shifting_earth = [
  {value:"Default",label:"Default",short:'d'},
  {value:"Mountaintop",label:"Mountaintop",short:'m'},
  {value:"Crater",label:"Crater",short:'c'},
  {value:"Rotted_Woods",label:"Rotted Woods",short:'r'},
  {value:"Noklateo",label:"Noklateo",short:'n'},
]

const currentNightlord = [
  { value: "Gladius", label: "Gladius",short:'t'},
  { value: "Adel", label: "Adel",short:'a'},
  { value: "Gnoster", label: "Gnoster",short:'g'},
  { value: "Maris", label: "Maris",short:'m'},
  { value: "Libra", label: "Libra",short:'l'},
  { value: "Fulghor", label: "Fulghor",short:'f'},
  { value: "Caligo", label: "Caligo",short:'c'},
  { value: "Heolstor", label: "Heolstor",short:'h'},
];


//home page

router.get('/', (req, res) => {
  res.redirect('find');
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
    res.render('seedError', {link:'find'})
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
  res.render('string', {currentNightlord})
})

router.post('/string', async (req, res) => {
  const inputArray = stringReader(req.body.stringInput)
  const foundSeed = await findSeed
  (
    inputArray[0],
    inputArray[1],
    inputArray[2],
    inputArray[3],
    inputArray[4],
    inputArray[5],
    inputArray[6],
    inputArray[7]
  )
  if (!Array.isArray(foundSeed) || foundSeed.length === 0) {
    console.log("seedError")
    res.render('seedError', {link:'string'})
  }
  else {
    const extraData = await getExtraData(foundSeed[0].seed);
    //send data to page to be rendered
    res.render('result', {data: foundSeed, extraData: extraData, formData: req.body})
  }
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

  const elementsString = [
  { value: "None", short: "n" },
  { value: "Fire", short: "f" },
  { value: "Lightning", short: "l" },
  { value: "Madness", short: "m" },
  { value: "Poison", short: "p" },
  { value: "Bleed", short: "b" },
  { value: "Holy", short: "h" },
  { value: "Magic", short: "i" },
  { value: "Death", short: "d" },
  { value: "Sleep", short: "s" },
  { value: "Frost", short: "c" }
];

  const result = [];

  const checkString = inputString.toLowerCase().trim();

  for (let i=0; i<checkString.length;i++) {


    if (i===0) {
      //nightlord
      for (let k=0;k<currentNightlord.length;k++) {
        if (checkString[i] == currentNightlord[k].short) {
          result.push(currentNightlord[k].value)
        }
      }
    }
    if (i===1) {
      //shifting earth
      for (let k=0;k<shifting_earth.length;k++) {
        if (checkString[i] === shifting_earth[k].short) {
          result.push(shifting_earth[k].value) //adds to end of array
        }
      }
    }
    if (i===2 || i===4) {
      //major base
      for (let k=0;k<majorBase.length;k++) {
        if (checkString[i] === majorBase[k].short) {
          result.push(majorBase[k].value) 
        }
      }
    }
    if (i===3 || i===5) {
      //elements
      for (let k=0;k<elementsString.length;k++) {
        if (checkString[i] === elementsString[k].short) {
          result.push(elementsString[k].value)
        }
      }
    }
    if (i>5) {
      //small base
      for (let k=0;k<smallBase.length;k++) {
        if (checkString[i] === smallBase[k].short) {
          result.push(smallBase[k].value)
        }
      }
    }
  }
  return result;
}

module.exports = router;
