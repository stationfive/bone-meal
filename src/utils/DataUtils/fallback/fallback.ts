const fallback = <O, T>(obj: O, fn: (optimisticObj: Required<O>) => T, dflt?: T): T | undefined => {
  try {
    const result: T | undefined = fn(<Required<O>>obj);
    return result !== undefined ? result : dflt;
  } catch (e) {
    return dflt;
  }
};

export default fallback;
