export default {
  makeIdentity: <T>() => (payload: T) => payload,
  void: () => {},
};
