var expect = require('chai').expect,
    fs = require('fs'),
    path = require('path');


describe('program-helper', function () {
    // FUTURE TODO DEFINE EXPLICITLY in lib/program-helper.js:
    /** @type {Record<string, Function>} */
    var helper;

    beforeEach(function () {
        process.argv = [];
        process.chdir(path.join(__dirname, '..'));
        helper = require('../lib/program-helper');
    });

    describe('.getTSCCommand()', function () {
        it('should find valid tsc in top-level project dir', function () {
            expect(helper.getTSCCommand()).to.eq('tsc')
        });
        // FUTURE TODO test error case:
        xit('should throw error if no valid tsc is found', function () {
            process.chdir(path.join(__dirname, 'empty'));
            expect(helper.getTSCCommand).throws('ERROR: Missing Typescript compiler executable [tsc].')
        });
    });

    describe('.resolveTSFiles()', function () {
        beforeEach(function () {
            process.chdir(path.join(__dirname, 'tsconfig_file'));
        });

        it('should resolve files from tsconfig.json', function () {
            expect(helper.resolveTSFiles()).to.eql(['src/User.ts'])
        });
        it('should resolve files from alternative tsconfig.json', function () {
            process.argv = ['--tsconfig-file', 'conf/tsconfig.json'];
            expect(helper.resolveTSFiles()).to.eql(['src/User.ts'])
        });
        it('should resolve files from command line', function () {
            process.argv = ['--files-glob', '**/*.spec.ts'];
            expect(helper.resolveTSFiles()).to.eql(['src/User.spec.ts'])
        });
        it('should throw error if no "filesGlob" property in tsconfig.json', function () {
            process.chdir(path.join(__dirname, 'invalid_tsconfig'));
            expect(helper.resolveTSFiles).throws('ERROR: Property "filesGlob" not found in tsconfig.json')
        });
        it('should throw error if tsconfig.json is not accesible', function () {
            process.chdir(path.join(__dirname, 'empty'));
            expect(helper.resolveTSFiles).throws('ERROR: tsconfig.json file is not accessible.')
        });
    });

    describe('.getOptions()', function () {
        describe('.unknown', function () {
            it('should contain ["--outDir", "dist"]', function () {
                process.argv = ['--outDir', 'dist']
                expect(helper.getOptions().unknown).to.eql(['--outDir', 'dist']);
            })
        })
    });
});
