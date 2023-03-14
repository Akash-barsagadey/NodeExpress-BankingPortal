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

// Add this middleware to handle POST data
app.use(express.urlencoded({ extended: true }));


// Index route
app.get('/', (req, res) => {
    res.render('index', {
      title: 'Account Summary',
      accounts: accounts
    });
  });

// transfer  route
app.get('/transfer', (req, res) => {
    res.render('transfer ', {
      accounts: accounts
    });
  });


// transfer post  route
app.post('/transfer', (req, res) => {
    const { from, to, amount } = req.body;

    // Convert amount to a number
    const amountNum = parseInt(amount);
  
    // Calculate new balances
    accounts[from].balance -= amountNum;
    accounts[to].balance += amountNum;

      // Save updated account data to disk
  const accountsJSON = JSON.stringify(accounts, null, 4);

  fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');

   // Render the transfer view with success message
   const message = "Transfer Completed";
   res.render('transfer', { message });

  });


// payment   route
app.get('/payment', function(req, res) {
    res.render('payment', { account: accounts.credit });
  });

// transfer post  route
app.post('/payment', (req, res) => {
    accounts.credit.balance -= parseInt(req.body.amount);
    accounts.credit.available += parseInt(req.body.amount);
  
    const accountsJSON = JSON.stringify(accounts);
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
  
    res.render('payment', { message: 'Payment Successful', account: accounts.credit });

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