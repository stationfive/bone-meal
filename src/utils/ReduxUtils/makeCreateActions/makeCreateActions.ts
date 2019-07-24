import { camelToSnake } from 'utils/StringUtils';

const makeCreateActions = (ns: string) => <
  O extends { [P in keyof O]: ((...args: any[]) => any) | (() => void) },
  P extends string
>(
  actionMap: O,
): {
  [P in keyof O]: ((
    ...args: Parameters<O[P]>
  ) => { type: string; payload: ReturnType<O[P]> })
} =>
  Object.keys(actionMap).reduce((acc: Partial<O>, k: string) => {
    const creatorFn = (...args: any[]) => ({
      type: `${ns}/${camelToSnake(k)}`,
      // @ts-ignore
      ...(actionMap[k] ? { payload: actionMap[k](...args) } : {}),
    });
    creatorFn.toString = () => `${ns}/${camelToSnake(k)}`;
    return {
      ...acc,
      [k]: creatorFn,
    };
  }, {}) as {
    [P in keyof O]: ((
      ...args: Parameters<O[P]>
    ) => { type: string; payload: ReturnType<O[P]> })
  };

export default makeCreateActions;
