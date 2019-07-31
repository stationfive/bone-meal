const domakeyTest = require('./test');

const tmplBody = `// import _ from '_';

const {{fileName}} = () => {
};

export default {{fileName}};
`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  const filePathFull = cliArgs[0] || (await makey.ask('File path of new file:'));

  if (!filePathFull) throw Error('Domakey ts file aborted with no file name provided');

  const [fileName] = (
    (fileSplit) => [
      fileSplit[fileSplit.length - 1],
      filePathFull.substr(0, filePathFull.length - fileSplit[fileSplit.length - 1].length),
    ]
  )(filePathFull.split('/'));

  const addTest = await makey.askYN('Add a unit test?', false);

  makey.createFile(
    `./src/${filePathFull}.ts`,
    makey.templateReplace(tmplBody, { fileName }),
  );

  if (addTest) domakeyTest({ cliArgs, makey, cliFlags, templateName: 'test' })
 };
