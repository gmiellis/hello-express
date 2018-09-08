// creates a new instance of express
const express = require('express');

// bodyParser will parse any incoming POST and store it on
// req.body.
const bodyParser = require('body-parser');

const helloWorld = require('./controllers/helloWorld');
const createShoppingList = require('./controllers/createShoppingList');
const getShoppingList = require('./controllers/getShoppingList');
const updateShoppingList = require('./controllers/updateShoppingList');
const deleteShoppingList = require('./controllers/deleteShoppingList');

const app = express();
// configures Express to use the JSON parser.
app.use(bodyParser.json());

// '/' is the route - helloWorld is the controller
// in this case it links to another file which has
// callback function const helloWorld = (req, res) => 
// res.send({ message: 'Hello World!' }); in it.


// controllers >>>
app.get('/', helloWorld);
app.post('/shopping-lists', createShoppingList);
app.get('/shopping-lists/:filename', getShoppingList);
app.put('/shopping-lists/:filename', updateShoppingList);
app.delete('/shopping-lists/:filename', deleteShoppingList);

// this fires up a web server and redirects requests to
// our routes.
app.listen(3000, () => console.log('Example app listening on port 3000!'));
