const fs = require('fs');
const path = require('path');
const httpMocks = require('node-mocks-http');
const createShoppingList = require('../controllers/createShoppingList');

// (done) parameter means jest will wait for async operations.
it('creates a new shopping list', (done) => {
  // tells this test that one assertion will happen.
  expect.assertions(1);
  // creates an object that wiil represent our POST data.
  const body = {
    items: ['broccoli', 'bread', 'bananas'],
  };
  // Mocks a request object passing a body key as controller
  // expects to find POST data on req.body.
  const request = httpMocks.createRequest({
    method: 'POST',
    url: '/shopping-lists',
    body: body,
  });
  // event emitter is passed in so that when res.send is
  // called node-mocks-http uses the event emitter to trigger
  // an end event.
  const response = httpMocks.createResponse({
    eventEmitter: require('events').EventEmitter,
  });

  createShoppingList(request, response);
  // listens out for the end event that signals that res.send
  // hasa been called.
  response.on('end', () => {
    // res.send has been called, response._getData should
    // return an object with created filename therefore
    // assign this filename to a filename variable.
    const filename = response._getData().filename;
    // then use path,join to get the exact location of the
    // file and assign to a filePath.
    // __dirname gives current directory name.
    const filePath = path.join(__dirname, '../controllers/shoppingLists', filename);
    // now read the newly created file.
    fs.readFile(filePath, 'utf8', (error, data) => {
      // expect contents of file to equal our body object.
      expect(data).toBe(JSON.stringify(request.body));
      // done() tells jest that the test can end.
      done();
    });
  });
  // you could then delete the created file so there
  // is no evidence of the test being run.
});
