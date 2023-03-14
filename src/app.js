const fs = require('fs');
const path = require('path')
const express = require('express')
const { accounts, users, writeJSON } = require('./data');

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// set the directory where your views can be found
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Add this middleware to handle POST data
app.use(express.urlencoded({ extended: true }));


const accountRoutes = require('./routes/accounts')
const servicesRoutes = require('./routes/services')


// Index route
app.get('/', (req, res) => {
    res.render('index', {
      title: 'Account Summary',
      accounts: accounts
    });
  });


        // profile route
app.get('/profile', (req, res) => {
    res.render('profile', {
        user: users[0]
    });
  });

  app.use('/account', accountRoutes);

  app.use('/services', servicesRoutes);


  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`PS Project Running on port ${PORT}!`);
  });


 