export default {
  // SET,
  // OBJECT_ASSIGN,
  makeReset: <T>(initState: T) => (state: T) => initState,
  empty: (state: any) => null,
}
