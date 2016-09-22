'use strict';

let fulfilledPromise = new Promise((resolve, reject) => { resolve('ok'); });
let rejectedPromise = new Promise((resolve, reject) => { reject(new Error('SomeError')); });
let pendingPromise = new Promise((resolve, reject) => { return undefined; });

console.log('  pendingPromise:', pendingPromise);
console.log('fulfilledPromise:', fulfilledPromise);
console.log(' rejectedPromise:', rejectedPromise);
