'use strict';

function getUserRecord(userId) {
  let record = {
    name: {
      first: 'John',
      middle: 'Q',
      last: 'Public'
    },
    accountRoles: [
      'siteAdmin', 'globalUser'
    ]
  };
  return Promise.resolve(record);
}

function getName(user) {
  return new Promise((resolve, reject) => {
    if (user.name) {
      return resolve(user.name);
    }
    reject(new Error('UserHasNoName'));
  });
}

function adjustPart(part) {
  return new Promise((resolve, reject) => {
    if (!part || part.length === 0) {
      return resolve(null);
    }
    if (part.length === 1) {
      return resolve(`${part}.`);
    }
    resolve(part);
  });
}

function adjustNameParts(parts) {
  let promises = Object.keys(parts).map(entry => {
    return adjustPart(parts[entry]);
  });
  return Promise.all(promises);
}














function formatName(name) {
  return adjustNameParts(name)
    .then(names => {
      let parts = names.filter(name => name != null);
      if (parts.length === 0) {
        throw new Error('NameFormatFailed');
      }
      return parts.join(' ');
    });
}












function getUserName(userId) {
  return getUserRecord(userId)
    .then(getName)
    .then(formatName);
}














getUserName(123)
  .then(console.log)
  .catch(console.error);
