const execa = require('execa');

const path = require('path');

// THANKS:
// https://stackoverflow.com/questions/49603939/async-callback-was-not-invoked-within-the-5000ms-timeout-specified-by-jest-setti/49864436#49864436
jest.setTimeout(10*1000);

// THANKS for initial guidance:
// * https://medium.com/@ole.ersoy/unit-testing-commander-scripts-with-jest-bc32465709d6
// * https://github.com/superflycss/cli/blob/master/index.spec.js
// * https://github.com/brodybits/create-react-native-module/blob/0.11.0/tests/integration/cli/help/cli-help.test.js
test('bin/glob-tsc.js --files-glob', async () => {
    const { stdout } = await execa.command(`node ${path.resolve('bin/glob-tsc.js')} --allowJs --checkJs --noEmit --files-glob test/integration/cli/files-glob/demo/demo.js`);

    expect(stdout).toMatchSnapshot();
});
