type Key = string | number;

export default (mapFn: (val: any, key: Key) => any) => (
  obj: Record<string, any>,
): {} =>
  Object.keys(obj).reduce((result: Record<string, any>, key: Key): {} => {
    // @ts-ignore
    // eslint-disable-next-line
    result[key] = mapFn(obj[key], key);
    return result;
  }, {});
