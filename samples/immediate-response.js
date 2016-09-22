'use strict';

// Event Emitters
function testEventEmitters() {
  console.log('\nStarting Event Emitter Test');
  const events = require('events');
  let emitter = new events.EventEmitter();
  emitter.on('myEvent', data => {
    console.log('[immediate]', data);
  });
  emitter.emit('myEvent', 'The Event Emitter Has Something To Say');
  setTimeout(() => {
    emitter.on('myEvent', data => {
      console.log('[later]', data);
    });
    console.log('Event Emitter Done');
  }, 1000);
}

// Promises
function testPromises() {
  console.log('\nStarting Promise Test');
  let promise = new Promise((resolve, reject) => {
    resolve('The Promise Has Something To Say');
  });
  promise.then(data => {
    console.log('[immediate]', data);
  });
  setTimeout(() => {
    promise.then(data => {
      console.log('[later]', data);
    });
    console.log('Promise Done');
  }, 1000);
}

// Execute our tests with a delay in between

setTimeout(testEventEmitters, 0);
setTimeout(testPromises, 1500);
