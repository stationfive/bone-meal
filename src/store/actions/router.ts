import { Action } from 'types/Action';

const link: Function = <P>(
  nextRoute: string,
  payload: P,
): Action<P> => ({
  type: nextRoute,
  payload,
});

export default {
  link,
};
