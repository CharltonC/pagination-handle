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
    coverageReporters: ['text'],
    // coverageDirectory: `./doc/test-report`,

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