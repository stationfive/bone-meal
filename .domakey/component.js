const viewBody = `import { FC, ReactElement } from 'react';
import React from 'react';
import { {{CompName}}Props } from './{{CompName}}.props';

const {{CompName}}View: FC<{{CompName}}Props> = (props: {{CompName}}Props): ReactElement<'div'> => {
  return (
    <div>
    </div>
  );
};

export default {{CompName}}View;
`;

const propsBody = `export type {{CompName}}PublicProps = {
}
{{CalcedProps}}{{propsExports}}
`;

const propsCalcBody = `
type {{CompName}}CalcedProps = {
  // add props
}
`;

const propsExportsWCont = `
export type {{CompName}}Props = {{CompName}}PublicProps & {{CompName}}CalcedProps;`;
/* e.g. for view-injected container style: */
//export type {{CompName}}ContainerProps = ContainerProps<{{CompName}}PublicProps, {{CompName}}CalcedProps>;

const propsExportsWOCont = `
export type {{CompName}}Props = {{CompName}}PublicProps;`;

/* e.g. for props when needing to generate ContainerProps */
// const containerImport = `import { ContainerProps } from 'utils/TypeUtils/ContainerProps';
// `;

const CompIndex = `import {{CompName}} from './{{CompName}}.{{contOrView}}';

export default {{CompName}};
`;

/* e.g. reference CompIndex for view-injected style
import { FC } from 'react';
import View from './Home.view';
import Container from './Home.container';
import { HomePublicProps } from "./Home.props";

const Home: FC<HomePublicProps> =
  (props: HomePublicProps) => Container({ View, ...props });

export default Home;
 */

const containerBody = `import { FC } from 'react';
import React from 'react';
import { {{CompName}}PublicProps, {{CompName}}Props } from "./{{CompName}}.props";
import {{CompName}}View from './{{CompName}}.view';

const {{CompName}}Container: FC<{{CompName}}PublicProps> = (ownProps: {{CompName}}PublicProps) => {
  // {{containerBodyPrefabs}}
  const combinedProps: {{CompName}}Props = {
    ...ownProps,
    // your calculated props
  };
  
  return <{{CompName}}View {...combinedProps} />
};

export default {{CompName}}Container;
`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  if (cliFlags['h'] || !cliArgs[0]) {
    makey.print(help);
    return;
  }

  const compName = makey.toLowerCaseFirst(
    cliArgs[0] || (await makey.ask('Name of your component:'))
  );
  if (!compName) throw Error("Please provide a component name");

  const CompName = makey.toUpperCaseFirst(compName);

  const makeContainer = cliFlags['y']
    ? true
    : cliFlags['container'] || (await makey.askYN('Create a (smart) container for the Comp?'));

  const viewFilled = makey.templateReplace(viewBody, { CompName });

  makey.createFile(
    `./src/components/${CompName}/${CompName}.view.tsx`,
    viewFilled,
  );

  const CalcedProps = makeContainer
    ? makey.templateReplace(propsCalcBody, { CompName })
    : '';

  const propsFilled = makey.templateReplace(propsBody, {
    propsExports: makeContainer ? propsExportsWCont : propsExportsWOCont,
    CalcedProps,
    CompName,
  });

  makey.createFile(
    `./src/components/${CompName}/${CompName}.props.tsx`,
    propsFilled,
  );

  makey.createFile(
    `./src/components/${CompName}/index.tsx`,
    makey.templateReplace(
      CompIndex,
      {
        contOrView: makeContainer ? 'container' : 'view',
        CompName,
      },
    ),
  );

  if (makeContainer) {
    makey.createFile(
      `./src/components/${CompName}/${CompName}.container.tsx`,
      makey.templateReplace(
        containerBody,
        {
          CompName,
        },
      ),
    );
  }

  // todo: import the Comp:
  // makey.editFile(`src/components/index.tsx`, (existingCompFile) =>
  //   existingCompFile.replace(
  //     `NOT_FOUND: {`,
  //     makey.templateReplace(`{{COMP_NAME}}: {
  //   component: '{{CompName}}',
  //   path: '/{{path}}',
  // },
  // NOT_FOUND: {`,
  //       {
  //         COMP_NAME,
  //         CompName,
  //         path,
  //       },
  //     )
  //   ),
  // );
};

const help = `Adds a new React component.

This will create the new component folder (/src/components/MyCompName), the components files,
and add to the index in /src/components/index.tsx

\`npm run domakey component MyCompName\`

Options:
 --container    Create container by default
 --y            Accept all default suggestions
`;
