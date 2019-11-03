var path = require('path'),
    mock = require('mock-require');


describe("glob-tsc bin script", function () {
    beforeEach(function () {
        mock('../lib/program-helper', './program-helper.mock');
        // FUTURE TBD consider changing `cross-spawn` to `execa` mock
        mock('cross-spawn', './cross-spawn.mock.js');
    });

    xit("should execute tsc command with vars", function () {
        require('../bin/glob-tsc');
    });

    afterEach(function () {
        mock.stopAll();
    })
});
