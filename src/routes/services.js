const express = require('express');

const router = express.Router();

const { accounts, users, writeJSON } = require('../data');

// transfer  route
router.get('/transfer', (req, res) => {
    res.render('transfer ', {
      accounts: accounts
    });
  });


// transfer post  route
router.post('/transfer', (req, res) => {
    const { from, to, amount } = req.body;

    // Convert amount to a number
    const amountNum = parseInt(amount);
  
    // Calculate new balances
    accounts[from].balance -= amountNum;
    accounts[to].balance += amountNum;

      // Save updated account data to disk
  const accountsJSON = JSON.stringify(accounts, null, 4);

  writeJSON(accounts)

  //fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');

   // Render the transfer view with success message
   const message = "Transfer Completed";
   res.render('transfer', { message });

  });


// payment route
router.get('/payment', function(req, res) {
    res.render('payment', { account: accounts.credit });
  });

// transfer post  route
router.post('/payment', (req, res) => {
    accounts.credit.balance -= parseInt(req.body.amount);
    accounts.credit.available += parseInt(req.body.amount);
  
    const accountsJSON = JSON.stringify(accounts);

    writeJSON(accounts)
    //fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), accountsJSON, 'utf8');
  
    res.render('payment', { message: 'Payment Successful', account: accounts.credit });

  });

  module.exports = router;