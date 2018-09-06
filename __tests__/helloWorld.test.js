const helloWorld = require('../controllers/helloWorld');
const httpMocks = require('node-mocks-http');

it('returns a Hello World object', () => {
  // this is a mock request object.
  const request = httpMocks.createRequest({
    method: 'GET',
    url: '/',
  });
  // this is a mock response object.
  const response = httpMocks.createResponse();
  // calls helloWorld controller psssing in
  // request and response.
  helloWorld(request, response);

  expect(response._getData().message).toBe('Hello World!');
});
