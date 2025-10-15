const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');
const router = require('./router/router');
const exphbs = require('express-handlebars');


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

//probably not needed
// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'my-super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

// Views setup (Handlebars)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


//Helpers
const hbs = exphbs.create({
    extname: 'hbs',
    defaultLayout: 'layout',
    helpers: {
        //for pagination
        incrementPage: (value) => parseInt(value) + 1,
        decrementPage: (value) => parseInt(value) - 1,
        gt: (a, b) => a > b, //greater than
        lt: (a, b) => a < b //less than 
    }
})


// Routes
app.use('/', router);




app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
