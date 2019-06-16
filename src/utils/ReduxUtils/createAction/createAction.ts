export const createAction = <A extends ((...args: any[]) => any) | (() => void)>(
  snakeKey: string,
  action: A,
): ((...args: Parameters<A>) => { type: string, payload: ReturnType<A> }) => {
    const creatorFn = (...args: any[]) => ({
      type: snakeKey,
      payload: action(...args),
    });
    creatorFn.toString = () => snakeKey;
    return creatorFn;
};

export const makeCreateAction = (
  ns: string,
) => <A extends ((...args: any[]) => any) | (() => void)>(
  snakeKey: string,
  action: A,
): ((...args: Parameters<A>) => { type: string, payload: ReturnType<A> }) =>
  createAction(`${ns}/${snakeKey}`, action);
