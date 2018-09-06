const fs = require('fs');
const path = require('path');

const createShoppingList = (req, res) => {
  const filename = Date.now().toString();
  const contents = JSON.stringify(req.body);

  fs.writeFile(path.join(__dirname, 'shoppingLists', filename), contents, (err) => {
    if (err) throw err;

    res.send({ filename: filename });
  });
};

module.exports = createShoppingList;
