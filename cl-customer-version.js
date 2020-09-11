const fs = require('fs')
const semver = require('semver')
const fileName = './packages/apps/cl-customer-webapp/package.json'
let file = require(fileName)

let currentVersion = file.version;
let newVersion = semver.inc(file.version, 'patch');


console.log('CL-CUSTOMER current version: ', currentVersion)
console.log('CL-CUSTOMER new version: ', newVersion)

file.version = newVersion


fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    console.log('writing to ' + fileName);
    console.log('UPGRADED PACKAGE VERSION SUCCESSFULLY!')
});

