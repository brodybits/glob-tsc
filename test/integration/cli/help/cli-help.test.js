const execa = require('execa');

const path = require('path');

// THANKS for initial guidance:
// * https://medium.com/@ole.ersoy/unit-testing-commander-scripts-with-jest-bc32465709d6
// * https://github.com/superflycss/cli/blob/master/index.spec.js
// * https://github.com/brodybits/create-react-native-module/blob/0.11.0/tests/integration/cli/help/cli-help.test.js
test('bin/glob-tsc.js --help', async () => {
    const { stdout } = await execa.command(`node ${path.resolve('bin/glob-tsc.js')} --help`);

    expect(stdout).toMatchSnapshot();
});
