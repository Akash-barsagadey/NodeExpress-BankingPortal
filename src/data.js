const fs = require('fs');
const path = require('path')


// Read contents of accounts.json file
const accountData = fs.readFileSync('src/json/accounts.json', { encoding: 'utf8' });

// Parse JSON into JavaScript object
const accounts = JSON.parse(accountData);


// Read contents of users.json file
const userData  = fs.readFileSync('src/json/users.json', { encoding: 'utf8' });

// Parse JSON into JavaScript object
const users  = JSON.parse(userData );


const writeJSON = (accountsJSON) =>{
    //fs.writeFileSync(path.join(__dirname, filepath), data, 'utf8');
    fs.writeFileSync(path.join(__dirname, 'json/accounts.json'), 'accountsJSON', 'utf8');
}




module.exports = {
    accounts,
    users,
    writeJSON,
  };