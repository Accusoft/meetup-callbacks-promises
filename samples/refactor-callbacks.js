'use strict';

function getUserRecord(userId, callback) {
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
  callback(undefined, record);
}

function getName(user, callback) {
  if (user.name) {
    return callback(undefined, user.name);
  }
  callback(new Error('UserHasNoName'));
}



function adjustPart(part, callback) {
  if (!part || part.length === 0) {
    return callback(undefined, null);
  }
  if (part.length === 1) {
    return callback(undefined, `${part}.`);
  }
  callback(undefined, part);
}



function adjustNameParts(parts, callback) {
  let fault = false;
  let remaining = Object.keys(parts).length;
  for (var part in parts) {
    let initial = parts[part];
    adjustPart(initial, function (err, adjusted) {
      if (err && !fault) {
        fault = true;
        return callback(err);
      }
      if (!fault) {
        parts[part] = adjusted;
        if (--remaining === 0) {
          callback(undefined, parts);
        }
      }
    });
  }
}

function formatName(name, callback) {
  adjustNameParts(name, function(err, names) {
    if (err) {
      return callback(err);
    }
    let parts = [];
    if (name.first) {
      parts.push(name.first);
    }
    if (name.middle) {
      parts.push(name.middle);
    }
    if (name.last) {
      parts.push(name.last);
    }
    if (parts.length === 0) {
      return callback(new Error('NameFormatFailed'));
    }
    callback(undefined, parts.join(' '));
  });
}

function getUserName(userId, callback) {
  getUserRecord(userId, function (err, userRecord) {
    if (err) {
      return callback(err);
    }
    getName(userRecord, function (err, name) {
      if (err) {
        return callback(err);
      }
      formatName(name, function (err, formattedName) {
        if (err) {
          return callback(err);
        }
        callback(undefined, formattedName);
      })
    });
  });
}

getUserName(123, function (err, name) {
  if (err) {
    return console.error(err);
  }
  console.log(name);
});
