const fs = require('fs')
const semver = require('semver')
const sharedFileName = './packages/libs/shared/package.json'
const clcFileName = './packages/apps/cl-customer-webapp/package.json'
let sharedFile = require(sharedFileName)
let clcFile = require(clcFileName)

let sharedCurrentVersion = sharedFile.version;
let sharedNewVersion = semver.inc(sharedFile.version, 'patch');

/* Note: SIC means "Shared(dependency) in Cl-customer package" */
let SICCurrentVersion = clcFile.dependencies["@ecommerce/shared"]
let SICNewVersion = semver.inc(clcFile.dependencies["@ecommerce/shared"], 'patch');

sharedFile.version = sharedNewVersion
clcFile.dependencies["@ecommerce/shared"] = SICNewVersion

fs.writeFile(sharedFileName, JSON.stringify(sharedFile, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    console.log('writing to ' + sharedFileName);
});

fs.writeFile(clcFileName, JSON.stringify(clcFile, null, 2), function writeJSON(err) {
    if (err) return console.log(err);
    console.log('writing to ' +  clcFileName + ' (@ecommerce/shared dependency)');
});

console.log('************************* UPDATE SUMMARY **************************')
console.table([
    { NAME: 'SHARED_PACKAGE', CURRENT_VERSION: sharedCurrentVersion, NEW_VERSION: sharedNewVersion },
    { NAME: 'SIC_PACKAGE', CURRENT_VERSION: SICCurrentVersion, NEW_VERSION: SICNewVersion }
])
console.log('Note: SIC means << Shared(dependency) in Cl-customer package >>')
