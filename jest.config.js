const { collectCov } = require('yargs').argv;
const { defaults } = require('jest-config');  // def. jest config object

// JEST Option (not cli option)
// - Ref: https://jestjs.io/docs/en/configuration#testmatch-arraystring
module.exports = {
    verbose: true,

    // # Mock & Global variable
    clearMocks: true,
    globals: {
        // e.g. 'someGlobalVar': true
    },

    // # Coverage & Report
    collectCoverage: true,
    coverageReporters: [ collectCov ? 'lcov' : 'text' ],
    coverageDirectory: './coverage',

    // # File to test (either use `testMatch` or `tesstRegex`)
    testMatch: [
        '**/?(*.)+(spec|test).[jt]s'
    ],

    // # Folder/File to ignored
    testPathIgnorePatterns: [
        ...defaults.testPathIgnorePatterns,

    ],
    coveragePathIgnorePatterns: [
        ...defaults.coveragePathIgnorePatterns,
    ]
};