type Key = string | number;

export default (mapFn: (val: any, key: Key) => any) => (obj: Object): Object =>
  Object.keys(obj).reduce((result: Object, key: Key): Object => {
    // @ts-ignore
    result[key] = mapFn(obj[key], key);
    return result;
  }, {});
