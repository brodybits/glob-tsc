var expect = require('chai').expect;

/**
 * @constructor
 */
var Process = function () {
    var listeners = {};

    this.on = function (event, cb) {
        listeners[event] = cb;
    };
};

module.exports =
    function (cmd, args) {
        expect(cmd).to.equal('tsc');
        expect(args).to.eql(['src/User.ts']);
        return new Process();
    }
