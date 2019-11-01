/**
 * @typedef {import('commander').Command} Command
 */

const fs = require('fs');
const path = require('path');

const commander = require('commander');

const execa = require('execa');

const glob = require('glob');

/**
 * Throw error and stop process.
 */
function error() {
    const args = Array.prototype.slice.call(arguments);

    throw ['ERROR:', args.join(' ')].join(' ')
}

/**
 * Resolve file globs based in command line or tsconfig.json file.
 * @returns {Array}
 */
function resolveGlobs() {
    const options = getOptions();

    if (options['filesGlob'] && options['filesGlob'].length) {
        return options['filesGlob'];
    } else {
        const tsConfigFile = path.join(process.cwd(), options['tsconfigFile']);

        try {
            fs.accessSync(tsConfigFile, fs.constants.R_OK);

            const tsConfig = require(tsConfigFile);

            if (!tsConfig['filesGlob'] || !(tsConfig['filesGlob'] instanceof Array)) {
                error('Property "filesGlob" not found in tsconfig.json');
            }

            return tsConfig['filesGlob'];
        } catch (err) {
            error('tsconfig.json file is not accessible.', err);
        }
    }
}

/**
 * Check if a file exists
 * @param cmdPath
 * @returns {boolean}
 */
function fileExists(cmdPath) {
    try {
        fs.accessSync(cmdPath, fs.constants.F_OK);
        return true;
    } catch (e) {
        return false;
    }
}

/**
 * Find tsc file executable path - exported
 *
 * @returns {string}
 */
function getTSCCommand () {
    // NOTE: This will throw an error if no valid tsc CLI program is found.
    // FUTURE TODO: show more descriptive error and test it in the test suite
    console.info('checking for valid `tsc` CLI program');
    execa.commandSync('tsc --version', { stdio: 'inherit' });
    console.info('valid `tsc` CLI program found');

    return 'tsc';
};

/**
 * Resolve ts file paths - exported
 *
 * @returns {Array}
 */
function resolveTSFiles () {
    const files = [];

    resolveGlobs().forEach(function (pattern) {
        glob.sync(pattern).forEach(function (file) {
            files.push(file);
        });
    });

    return files
};

/**
 * Get command options - exported
 * @returns {Command}
 */
function getOptions () {
    const program = commander
        .command('glob-tsc')
        .version(require('../package.json').version)
        .usage('[options]')
        .allowUnknownOption(true)
        .option('-f, --tsconfig-file <path>', 'tsconfig.json file location. Default ./tsconfig.json', 'tsconfig.json')
        .option('-g, --files-glob <globs>', 'File globs', function (val) {
            return val.split(',');
        }, []).parse(process.argv);

    program.unknown = program.parseOptions(process.argv).unknown;

    return program;
};

module.exports = {
    getOptions,
    getTSCCommand,
    resolveTSFiles
};
