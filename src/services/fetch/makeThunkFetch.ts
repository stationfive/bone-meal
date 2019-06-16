import { Dispatch } from "redux";
import { AsyncActionSet } from "types/Store/AsyncActionSet";

type ThunkConfigReq<RequestParams, Response> = {
  asyncActionSet: AsyncActionSet<RequestParams, Response>,
};

type ThunkConfigOpt = {
  authorized?: boolean,
}

type ThunkConfig<RequestParams, Response> = ThunkConfigReq<RequestParams, Response> & ThunkConfigOpt;

export default function makeThunkFetch<RequestParams, Resp>(
  fetchRequestInfo: RequestInfo,
  passedThunkConfig: ThunkConfig<RequestParams, Resp>,
) {
  const thunkConfig: ThunkConfig<RequestParams, Resp> = {
    authorized: false,
    ...passedThunkConfig,
  };

  return (params: RequestParams) => (dispatch: Dispatch) => {
    dispatch(thunkConfig.asyncActionSet.fetch(params));
    fetch(fetchRequestInfo)
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        } else {
          const err = new Error("Did not receive valid json response");
          err.statusCode = response.status; // /!\
          throw err;
        }
      })
      .then((response: {}) => {
        // Warning: Assumes response is correct type
        dispatch(thunkConfig.asyncActionSet.success(response as Resp));
      })
      .catch((err: any) => {
        const errors = (err.errors !== undefined && Array.isArray(err.errors)) ? err.errors
          : (err.errors !== undefined) ? [err.errors]
          : [err];

        // Warning: Makes best guess at any[]
        dispatch(thunkConfig.asyncActionSet.fail(errors));
      });
  }
}
