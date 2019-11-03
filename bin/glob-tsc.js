#! /usr/bin/env node

const execa = require('execa');

const helper = require('../lib/program-helper');

const options = helper.getOptions();

const commandArgs = options.unknown.concat(helper.resolveTSFiles());

execa.sync(helper.getTSCCommand(), commandArgs, { stdio: 'inherit' });
