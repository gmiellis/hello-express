const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const updateShoppingList = require('../controllers/updateShoppingList');

it('updates an already existing shopping list', (done) => {
  expect.assertions(1);
  const filename = Date.now().toString();
  const filePath = path.join(__dirname, '../controllers/shoppingLists', filename);
  const body = {
    items: ['carrots', 'crunchies', 'cornflakes'],
  };

  fs.writeFile(filePath, JSON.stringify(body), (err) => {
    if (err) throw err;

    const request = httpMocks.createRequest({
      method: 'PUT',
      url: '/shopping-lists/:filename',
      params: {
        filename: filename,
      },
      body: body,
    });

    const response = httpMocks.createResponse({
      eventEmitter: require('events').EventEmitter,
    });

    updateShoppingList(request, response);

    response.on('end', () => {
      fs.readFile(filePath, 'utf8', (error, data) => {
        if (error) throw error;
        expect(data).toBe(JSON.stringify(request.body));
        done();
      });
    });
  });
});
