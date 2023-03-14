const fs = require('fs');
const path = require('path')
const express = require('express')

const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// set the directory where your views can be found
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// create a GET route for the root URL path '/'
app.get('/', (req, res) => {
    // render the index view and pass an object with a single key value pair
    res.render('index', { title: 'Index' });
  });
  

  const PORT = 3000;

  app.listen(PORT, () => {
    console.log(`PS Project Running on port ${PORT}!`);
  });