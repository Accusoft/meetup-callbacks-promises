'use strict';

const http = require('http');
const _SERVER = '\u001b[31m[SERVER]\u001b[0m';
const _CLIENT = '\u001b[32m[CLIENT]\u001b[0m';

let delayedResponse = ms => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
};

let lookupRecordInDatabase = () => {
  console.log(_SERVER, 'Making complex database query, will take 1 second');
  return delayedResponse(1000);
};

let makeMicroserviceCall = () => {
  console.log(_SERVER, 'Calling local microservice, will take 0.5 seconds');
  return delayedResponse(500);
};

let encodeVideo = () => {
  console.log(_SERVER, 'Starting to encode video, will take 8 seconds');
  return delayedResponse(8000);
};

let processSync = res => {
  console.log(_SERVER, 'Processing synchronous request');
  lookupRecordInDatabase()
    .then(makeMicroserviceCall)
    .then(encodeVideo)
    .then(() => {
        console.log(_SERVER, 'Sending response to client');
    })
    .then(() => {
      res.end('Done');
    })
    .then(() => {
        console.log(_SERVER, 'Sync processing completed');
    })
    .catch(console.error);
};

let processAsync = res => {
  console.log(_SERVER, 'Processing asynchronous request');
  lookupRecordInDatabase()
    .then(() => {
        console.log(_SERVER, 'Sending response to client');
    })
    .then(() => {
      res.end('Done');
    })
    .then(makeMicroserviceCall)
    .then(encodeVideo)
    .then(() => {
        console.log(_SERVER, 'Async processing completed');
    })
    .catch(console.error);
};

http.createServer((req, res) => {
  console.log(_SERVER, 'Received request from user');
  if (req.url === '/sync') {
    return processSync(res);
  }
  if (req.url === '/async') {
    return processAsync(res);
  }
  res.end('404 Not Found');
}).listen(8000);
console.log(_SERVER, 'Listening on port 8000');

setTimeout(() => {
  console.log('\n' + _CLIENT, 'Making synchronous request to the server');
  http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/sync',
    agent: false
  }, response => {
    response.on('data', output => {
      console.log(_CLIENT, 'Sync Response received')
    });
  });
}, 2000);

setTimeout(() => {
  console.log('\n' + _CLIENT, 'Making asynchronous request to the server');
  http.get({
    hostname: 'localhost',
    port: 8000,
    path: '/async',
    agent: false
  }, response => {
    response.on('data', output => {
      console.log(_CLIENT, 'Async Response received')
    });
  });
}, 15000);
