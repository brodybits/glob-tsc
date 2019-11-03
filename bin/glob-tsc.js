#! /usr/bin/env node

const execa = require('execa');

var
    helper = require('../lib/program-helper'),
    options = helper.getOptions(),
    commandArgs = options.unknown.concat(helper.resolveTSFiles()),
    proc = execa.sync(helper.getTSCCommand(), commandArgs, { stdio: 'inherit' });

module.exports = process;
