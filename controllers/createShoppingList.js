// Node.js modules used for dealing with file system &
// file systems paths.
const fs = require('fs');
const path = require('path');

const createShoppingList = (req, res) => {
  // creates a string for the filename which gives a number
  // which is converted to a string.
  const filename = Date.now().toString();
  // req.body is the POST data that body-parser parses into
  // a JS object. JSON.stringify converts it to a JSON string.
  const contents = JSON.stringify(req.body);

  fs.writeFile(path.join(__dirname, 'shoppingLists', filename), contents, (err) => {
    if (err) throw err;

    // reason we move res.send({ filename: filename })
    // into the callback is we only want to send a response
    // after we know for sure the file has been created.
    res.send({ filename: filename });
  });
};

module.exports = createShoppingList;
