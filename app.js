// creates a new instance of express
const express = require('express');

// bodyParser will parse any incoming POST and store it on
// req.body.
const bodyParser = require('body-parser');

const helloWorld = require('./controllers/helloWorld');
const createShoppingList = require('./controllers/createShoppingList');


const app = express();
// configures Express to use the JSON parser.
app.use(bodyParser.json());

// '/' is the route - helloWorld is the controller
// in this case it links to another file which has
// callback function const helloWorld = (req, res) => 
// res.send({ message: 'Hello World!' }); in it.

app.get('/', helloWorld);

app.post('/shopping-lists', createShoppingList);

// this fires up a web server and redirects requests to
// our routes.
app.listen(3000, () => console.log('Example app listening on port 3000!'));
