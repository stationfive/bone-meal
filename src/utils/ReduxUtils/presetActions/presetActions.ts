import R from 'ramda';

export default {
  makeIdentity: <T>() => (a: T) => a,
  void: () => {},
};
