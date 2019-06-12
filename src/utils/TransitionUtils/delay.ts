const delay: Function = (ms: number = 200): Promise<number> =>
  new Promise((resolve: Function): number => setTimeout(resolve, ms));

export default delay;
