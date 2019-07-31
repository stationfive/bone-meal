const tmplBody = `import {{fileName}} from './{{fileName}}';

describe('{{filePath}}{{fileName}}', () => {
  const fixture = {};

  test('', () => {
    const expected = {};

    const result: YourExpectedType = {{fileName}}();

    expect(result).toEqual(expected);
  });
});
`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  const filePathFull = cliArgs[0] || (await makey.ask('File path of new file:'));

  if (!filePathFull) throw Error('Domakey ts file aborted with no file name provided');

  const [fileName, filePath] = (
    (fileSplit) => [
      fileSplit[fileSplit.length - 1],
      filePathFull.substr(0, filePathFull.length - fileSplit[fileSplit.length - 1].length),
    ]
  )(filePathFull.split('/'));

  makey.createFile(
    `./src/${filePathFull}.spec.ts`,
    makey.templateReplace(tmplBody, { fileName, filePath }),
  );
};
