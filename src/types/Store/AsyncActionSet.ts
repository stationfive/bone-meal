import { Action } from "../Action";

export interface AsyncActionSet<RequestParams, Response> {
  fetch: (a: RequestParams) => Action<void>,
  success: (a: Response) => Action<Response>,
  fail: (a: any[]) => Action<any[]>,
}
