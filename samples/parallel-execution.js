'use strict';

let myStrings = ['Node', 'JS', 'Rocks'];

// Callback Implementation and Execution

function myCallbackFunction(someString, callback) {
  let delay = Math.random() * 1000 + 500;
  setTimeout(callback.bind(this, undefined, someString), delay);
}

function getDelayedStringsFromCallback(inputStrings, callback) {
  let output = [];
  let closed = false;
  let remaining = inputStrings.length;
  inputStrings.forEach(function (val, index) {
    myCallbackFunction(val, function (err, result) {
      if (closed) {
        return;
      }
      if (err) {
        closed = true;
        return callback(err);
      }
      output[index] = result;
      if (--remaining === 0) {
        callback(undefined, output);
      }
    });
  });
}

getDelayedStringsFromCallback(myStrings, function (err, result) {
  if (err) {
    return console.error(err);
  }
  console.log('via Callback:', result);
});

// Promise Implementation and Execution

function myPromiseFunction(someString) {
  let delay = Math.random() * 1000 + 500;
  return new Promise((resolve, reject) => {
    setTimeout(resolve.bind(this, someString), delay);
  })
}

function getDelayedStringsFromPromise(inputStrings) {
  return Promise.all(inputStrings.map(myPromiseFunction));
}

getDelayedStringsFromPromise(myStrings)
  .then(console.log.bind(this, 'via Promises:'))
  .catch(console.error);
