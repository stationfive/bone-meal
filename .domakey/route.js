const viewBody = `import { FC, ReactElement } from 'react';
import React from 'react';
import { {{RouteName}}Props } from './{{RouteName}}.props';

const {{RouteName}}View: FC<{{RouteName}}Props> = (props: {{RouteName}}Props): ReactElement<'div'> => {
  return (
    <div>
    </div>
  );
};

export default {{RouteName}}View;
`;

const propsBody = `import { RouteDef } from 'types/RouteDef';

export type {{RouteName}}PublicProps = {
  route: RouteDef,
}
{{CalcedProps}}{{propsExports}}
`;

const propsCalcBody = `
type {{RouteName}}CalcedProps = {
  // add props
}
`;

const propsExportsWCont = `
export type {{RouteName}}Props = {{RouteName}}PublicProps & {{RouteName}}CalcedProps;`;
/* e.g. for view-injected container style: */
//export type {{RouteName}}ContainerProps = ContainerProps<{{RouteName}}PublicProps, {{RouteName}}CalcedProps>;

const propsExportsWOCont = `
export type {{RouteName}}Props = {{RouteName}}PublicProps;`;

/* e.g. for props when needing to generate ContainerProps */
// const containerImport = `import { ContainerProps } from 'utils/TypeUtils/ContainerProps';
// `;

const routeIndex = `import {{RouteName}} from './{{RouteName}}.{{contOrView}}';

export default {{RouteName}};
`;

/* e.g. reference routeIndex for view-injected style
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
import { {{RouteName}}PublicProps, {{RouteName}}Props } from "./{{RouteName}}.props";
import {{RouteName}}View from './{{RouteName}}.view';

const {{RouteName}}Container: FC<{{RouteName}}PublicProps> = (ownProps: {{RouteName}}PublicProps) => {
  // {{containerBodyPrefabs}}
  const combinedProps: {{RouteName}}Props = {
    ...ownProps,
    // your calculated props
  };
  
  return <{{RouteName}}View {...combinedProps} />
};

export default {{RouteName}}Container;
`;

module.exports = async ({ cliArgs, cliFlags, templateName, makey }) => {
  if (cliFlags['h'] || !cliArgs[0]) {
    makey.print(help);
    return;
  }

  const routeName = makey.toLowerCaseFirst(
    cliArgs[0] || (await makey.ask('Name of your route:'))
  );
  if (!routeName) throw Error("Please provide a route name");

  const RouteName = makey.toUpperCaseFirst(routeName);

  const ROUTE_NAME = cliFlags['y']
    ? makey.camelToSnakeCaps(routeName)
    : (await makey.ask(
    `Identifier for your route: (${makey.camelToSnakeCaps(routeName)})`
  )) || makey.camelToSnakeCaps(routeName);

  const makeContainer = cliFlags['y']
    ? true
    : cliFlags['container'] || (await makey.askYN('Create a (smart) container for the route?'));

  const viewFilled = makey.templateReplace(viewBody, { RouteName });

  makey.createFile(
    `./src/routes/${RouteName}/${RouteName}.view.tsx`,
    viewFilled,
  );

  const CalcedProps = makeContainer
    ? makey.templateReplace(propsCalcBody, { RouteName })
    : '';

  const path = cliFlags['y']
    ? makey.camelToKebab(routeName)
    : (await makey.ask(`URL path (${makey.camelToKebab(routeName)}):`)) || makey.camelToKebab(routeName);

  const propsFilled = makey.templateReplace(propsBody, {
    propsExports: makeContainer ? propsExportsWCont : propsExportsWOCont,
    CalcedProps,
    RouteName,
  });

  makey.createFile(
    `./src/routes/${RouteName}/${RouteName}.props.tsx`,
    propsFilled,
  );

  makey.createFile(
    `./src/routes/${RouteName}/index.tsx`,
    makey.templateReplace(
      routeIndex,
      {
        contOrView: makeContainer ? 'container' : 'view',
        RouteName,
      },
    ),
  );

  if (makeContainer) {
    makey.createFile(
      `./src/routes/${RouteName}/${RouteName}.container.tsx`,
      makey.templateReplace(
        containerBody,
        {
          RouteName,
        },
      ),
    );
  }

  // todo: import the route:
  makey.editFile(`src/routes/index.tsx`, (existingRouteFile) =>
    existingRouteFile.replace(
      `NOT_FOUND: {`,
      makey.templateReplace(`{{ROUTE_NAME}}: {
      component: '{{RouteName}}',
      path: '/{{path}}',
    },
  NOT_FOUND: {`,
        {
          ROUTE_NAME,
          RouteName,
          path,
        },
      )
    ),
  );
};

const help = `Adds a new React 'route' component.

This will create the new route folder (/src/routes/MyRouteName), the route files,
and add to the index in /src/routes/index.tsx

\`npm run domakey route MyRouteName\`

Options:
 --container    Create container by default
 --y            Accept all default suggestions
`;
