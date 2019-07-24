const tmplBody = `export type {{TypeName}} = {
};
`;

module.exports = async ({cliArgs, cliFlags, templateName, makey}) => {
  if (cliFlags['h'] || !cliArgs[0]) {
    makey.print(help);
    return;
  }
  const typePathFull = (cliArgs[0] || (await makey.ask('Type name (Path?/TypeName):')));

  const [TypeName, typePath] = (
    (typeSplit) => [
      typeSplit[typeSplit.length - 1],
      typePathFull.substr(0, typePathFull.length - typeSplit[typeSplit.length - 1].length),
    ]
  )(typePathFull.split('/'));

  console.log(TypeName, 'x', typePath);

  makey.createFile(
    `./src/types/${typePath}${TypeName}.ts`,
    makey.templateReplace(tmplBody, { TypeName }),
  );
};

const help = `Adds a new TypeScript type definition.

\`npm run domakey type TypeFile\`
 -> Create a type under /src/types

or \`npm run domakey type Store/TypeFile\`
 -> Create a type under /src/types/Store/ (for example)
`;
