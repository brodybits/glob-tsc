var path = require('path'),
    mock = require('mock-require');


xdescribe("glob-tsc bin script", function () {
    beforeEach(function () {
        mock('../lib/program-helper', './program-helper.mock');
        mock('cross-spawn', './cross-spawn.mock.js');
    });

    it("should execute tsc command with vars", function () {
        require('../bin/glob-tsc');
    });

    afterEach(function () {
        mock.stopAll();
    })
});
