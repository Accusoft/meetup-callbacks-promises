'use strict';

/* === OUR DUAL-MODE LIBRARY === */

let doProcessingSteps = inputData => {
  return Promise.resolve(inputData.toLowerCase());
};

module.exports.processData = (inputData, callback) => {
  if (typeof callback === 'function') {
    doProcessingSteps(inputData)
      .then(result => { callback(undefined, result); })
      .catch(callback);
    return undefined;
  }
  return doProcessingSteps(inputData);
}

/* === SOME USER WITH CALLBACKS === */

const awesomeCallbackLibrary = module.exports;
awesomeCallbackLibrary.processData('Hello, World!', (err, output) => {
  if (err) {
    return console.error(err);
  }
  console.log('callback result: ', output);
});

/* === SOME USER WITH PROMISES === */

const awesomePromiseLibrary = module.exports;
awesomePromiseLibrary.processData('Hello, World!')
  .then(console.log.bind(this, ' promise result: '))
  .catch(console.error);
