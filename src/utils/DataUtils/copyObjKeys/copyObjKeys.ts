import mapObj from '../mapObj/mapObj';

export default <O>(objMap: O, key: string = 'key') =>
  mapObj((obj: Record<string, any>, k) => ({
    [key]: k,
    ...obj,
  }))(objMap) as O;
