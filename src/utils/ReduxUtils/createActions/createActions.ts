import { createAction as createReduxAction } from 'redux-actions';
import { camelToSnake } from 'utils/StringUtils';

const createActions = (
  ns: string,
) => <O extends { [P in keyof O]: ((...args: any[]) => any) | (() => void)}, P extends string>(
  actionMap: O,
): { [P in keyof O]: ((...args: Parameters<O[P]>) => { type: string, payload: ReturnType<O[P]> }) } => {
  return Object.keys(actionMap).reduce((acc: O, k: string) => {
    const creatorFn = (...args: any[]) => ({
      type: `${ns}/${camelToSnake(k)}`,
      // @ts-ignore
      ...(actionMap[k] ? { payload: actionMap[k](...args) } : {}),
    });
    creatorFn.toString = () => `${ns}/${camelToSnake(k)}`;
    return ({
      ...acc,
      [k]: creatorFn,
    });
  }, {} as O) as { [P in keyof O]: ((...args: Parameters<O[P]>) => { type: string, payload: ReturnType<O[P]> }) };
};

export default createActions;
