'use strict';

// HERE THERE BE MONSTERS -- stubbed database implementation here for simulation
const db = {query: (sql, params, callback) => {let result = [ { numMatches: 0 } ];if (typeof callback === 'function') {return callback(undefined, result);}return Promise.resolve(result);}};
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
  // NOTE: YOU CANNOT DO IT THIS WAY! Time to rewrite all your calling code!
  throw new Error('CannotDoThisSync');
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
function checkUniqueCallback(id, callback) {
  db.query('select count(1) as numMatches from someTable where id = ?', id, function(err, rows) {
    if (rows[0].numMatches === 0) {
      return callback(undefined, id);
    }
    callback(new Error('GeneratedDuplicateId'));
  });
}

function generateIdCallback(callback) {
  try {
    let id = uuid.v4();
    checkUniqueCallback(id, function (err, id) {
      if (err) {
        return generateIdCallback(callback);
      }
      callback(undefined, id);
    });
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
function checkUniquePromise(id) {
  return db.query('select count(1) as numMatches from someTable where id = ?', id)
    .then(rows => {
      if (rows[0].numMatches === 0) {
        return id;
      }
      throw new Error('GeneratedDuplicateId');
    });
}

function generateIdPromise() {
  let id = uuid.v4()
  return checkUniquePromise(id)
    .catch(err => {
      if (err.msg === 'GeneratedDuplicateId') {
        return generateIdPromise();
      }
      throw err;
    });
}

// Caller Implementation
generateIdPromise()
  .then(widgetId => {
    console.log(`Created Widget: ${widgetId} (promise)`)
  })
  .catch(console.error);
