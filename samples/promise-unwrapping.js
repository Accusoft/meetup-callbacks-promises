'use strict';

let _i = process.argv[2] || 7;

let promiseInPromise = x => {
  return new Promise((resolve, reject) => {
    if (!x) {
      return reject(new Error('NoInputDefined'));
    }
    resolve(x * x);
  });
};

let valueAsPromise = x => {
  if (!x) {
    throw new Error('NoInputDefined');
  }
  return x * x;
};

let getNumber = () => {
  return Promise.resolve(_i);
};

getNumber()
  .then(promiseInPromise)
  .then(console.log.bind(this, ' promise in promise:', _i, '^ 2 ='))
  .catch(console.error);

getNumber()
  .then(valueAsPromise)
  .then(console.log.bind(this, '   value as promise:', _i, '^ 2 ='))
  .catch(console.error);
