var expect = require('chai').expect;

/**
 * @constructor
 */
var Process = function () {
    /** @type {Record<string, Function>} */
    var listeners = {};

    /**
     * @param {string} event
     * @param {Function} cb
     */
    function onEvent (event, cb) {
        listeners[event] = cb;
    };

    this.on = onEvent;
};

module.exports =
    /**
     * @param {string} cmd
     * @param {string[]} args
     */
    function (cmd, args) {
        expect(cmd).to.equal('tsc');
        expect(args).to.eql(['src/User.ts']);
        return new Process();
    }
