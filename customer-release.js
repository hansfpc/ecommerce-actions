const fs = require('fs')
const semver = require('semver')
const fileName = './packages/apps/cl-customer-webapp/package.json'
let file = require(fileName)

let currentVersion = file.version;
let newVersion = semver.inc(file.version, 'patch');

file.version = newVersion

fs.writeFile(fileName, JSON.stringify(file, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    console.log('writing to ' + fileName);
});

console.log('************************* UPDATE SUMMARY **************************')
console.table([
    { NAME: '@ecommerce/customer', CURRENT_VERSION: currentVersion, NEW_VERSION: newVersion },
])
