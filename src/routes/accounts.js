const express = require('express');

const router = express.Router();

const { accounts, users, writeJSON } = require('../data');

  // Saving route
  router.get('/savings', (req, res) => {
    res.render('account', {
        account: accounts.savings
    });
  });

  // Saving route
  router.get('/checking', (req, res) => {
    res.render('index', {
        account: accounts.checking
    });
  });

    // Saving route
    router.get('/credit', (req, res) => {
    res.render('account', {
        account: accounts.credit
    });
  });

  module.exports = router;