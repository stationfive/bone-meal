import { Action } from '../Action';
import { ValErr } from '../ValErr';

export interface AsyncActionSet<RequestParams, Response> {
  fetch: (a: RequestParams) => Action<void>;
  success: (a: Response) => Action<Response>;
  fail: (a: ValErr[]) => Action<ValErr[]>;
}
