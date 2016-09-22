'use strict';

console.log('\n\n\n');

let syncFn = x => {
  console.log('sync', x);
  if (x < 10) {
    syncFn(x + 1);
  }
}

console.log('=== start sync ===');
syncFn(1);
console.log('=== end sync ===');

console.log('\n\n\n');

let anotherTickFn = x => {
  console.log('async', x);
  if (x < 10) {
    process.nextTick(() => {
      anotherTickFn(x + 1);
    });
  }
}

console.log('=== start async ===');
anotherTickFn(1);
console.log('=== end async ===');
