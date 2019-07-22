import { mapObj } from '../';

export default <O>(objMap: O, key: string = 'key') =>
  mapObj((obj: Object, k) => ({
    [key]: k,
    ...obj,
  }))(objMap) as O;
