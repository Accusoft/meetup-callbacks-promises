'use strict';

const uuid = require('uuid');

/*
 *  Asyncronous Implementation
 *
 *  This is the normal, procedural way this would normally be used. The major
 *  drawbacks are that the caller has to handle errors manually and, if we
 *  needed to add any async wait to the process in the future, we would have
 *  to fix all calling code.
 */

// Function Implementation
function generateIdSync() {
  return uuid.v4();
}

// Caller Implementation
try {
  let widgetId = generateIdSync();
  console.log(`Created Widget: ${widgetId} (sync)`);
} catch (err) {
  console.error(err);
}

/*
 *  Implemented as a Callback
 *
 *  By moving to async using a standard callback, we gain the ability to both
 *  capture errors inside the function in a standard way and the ability to
 *  modify our behavior for async needs in the future. The negative is in
 *  general readability and the inability to chain together error handling.
 */

// Function Implementation
function generateIdCallback(callback) {
  try {
    callback(undefined, uuid.v4());
  } catch (err) {
    callback(err);
  }
}

// Caller Implementation
generateIdCallback(function (err, widgetId) {
  if (err) {
    return console.error(err);
  }
  console.log(`Created Widget: ${widgetId} (callback)`);
});

/*
 *  Implemented as a Promise
 *
 *  Even though we don't need async calls at this time, we may in the future.
 *  This implementation handles errors well and allows us to, for instance,
 *  start verifying our UUID's are unique in DB before returning.
 */

// Function Implementation
function generateIdPromise() {
  return Promise.resolve(uuid.v4());
}

// Caller Implementation
generateIdPromise()
  .then(widgetId => {
    console.log(`Created Widget: ${widgetId} (promise)`)
  })
  .catch(console.error);
