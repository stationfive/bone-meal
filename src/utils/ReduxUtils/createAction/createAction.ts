const createAction = (
  ns: string,
) => <A extends ((...args: any[]) => any) | (() => void)>(
  snakeKey: string,
  action: A,
): ((...args: Parameters<A>) => { type: string, payload: ReturnType<A> }) => {
    const creatorFn = (...args: any[]) => ({
      type: `${ns}/${snakeKey}`,
      payload: action(...args),
    });
    creatorFn.toString = () => `${ns}/${snakeKey}`;
    return creatorFn;
};

export default createAction;
