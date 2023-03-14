const fs = require('fs');
const path = require('path')
const express = require('express')

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// set the directory where your views can be found
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Read contents of accounts.json file
const accountData = fs.readFileSync('src/json/accounts.json', { encoding: 'utf8' });

// Parse JSON into JavaScript object
const accounts = JSON.parse(accountData);


// Read contents of users.json file
const userData  = fs.readFileSync('src/json/users.json', { encoding: 'utf8' });

// Parse JSON into JavaScript object
const users  = JSON.parse(userData );


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
  // Saving route
app.get('/savings', (req, res) => {
    res.render('account', {
        account: accounts.savings
    });
  });

  // Saving route
  app.get('/checking', (req, res) => {
    res.render('index', {
        account: accounts.checking
    });
  });

    // Saving route
app.get('/credit', (req, res) => {
    res.render('account', {
        account: accounts.credit
    });
  });




  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`PS Project Running on port ${PORT}!`);
  });