type ArgsFn = ((...args: any[]) => any) | (() => void);

export const createAction = <A extends ArgsFn>(
  snakeKey: string,
  action: A,
): ((...args: Parameters<A>) => { type: string; payload: ReturnType<A> }) => {
  const creatorFn = (...args: any[]) => ({
    type: snakeKey,
    payload: action(...args),
  });
  creatorFn.toString = () => snakeKey;
  return creatorFn;
};

export const makeCreateAction = (ns: string) => <A extends ArgsFn>(
  snakeKey: string,
  action: A,
): ((...args: Parameters<A>) => { type: string; payload: ReturnType<A> }) =>
  createAction(`${ns}/${snakeKey}`, action);
