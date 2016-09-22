'use strict';

const fs = require('fs');

// Note: comment the following line out for regular promises
// const Promise = require('lazy-promise');

let createEmployeePromises = path => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, files) => {
      let output = files.reduce(function(output, employee) {
        output[employee] = {
          name: employee,
          getBoss: getManagerForEmployee(path, employee)
        };
        return output;
      }, {});
      resolve(output);
    });
  });
};

let getManagerForEmployee = (path, employeeName) => {
  if (!employeeName) {
    return new Promise((resolve, reject) => {
      resolve([]);
    });
  }
  return new Promise((resolve, reject) => {
    console.log('-> Reading Data:', employeeName);
    fs.readFile(path + '/' + employeeName, { encoding: 'utf8' }, (err, data) => {
      if (err) {
        return reject(new Error('FailedToReadFile'));
      }
      let boss = data.replace(/[^A-Za-z]/, '');
      resolve(boss);
    });
  });
};

let reportBoss = (employees, employee) => {
  return employees[employee].getBoss.then(boss => {
    if (boss) {
      console.log(employees[employee].name, 'reports to', boss);
      return reportBoss(employees, boss);
    }
    return undefined;
  })
}

createEmployeePromises(__dirname + '/../data')
  .then(employees => {
    console.log('Employee Data Readied');
    process.argv.slice(2).forEach(employee => {
      reportBoss(employees, employee);
    });
  });
