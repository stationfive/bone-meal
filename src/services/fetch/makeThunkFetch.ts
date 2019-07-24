import { Dispatch } from 'redux';
import { Store } from 'types/Store/Store';

// todo: needs updating
type AsyncActionSet<A, B> = [A, B];

interface ThunkConfigReq<RequestParams, Response> {
  fetchConfig: RequestInfo;
  asyncActionSet: AsyncActionSet<RequestParams, Response>;
}

interface ThunkConfigOpt<RequestParams, SuccessPayload> {
  authenticated: boolean;
  transformResponse: (
    resp: any,
    extra?: {
      action: RequestParams;
      dispatch: Dispatch;
      getState?: () => Store;
    },
  ) => SuccessPayload | Promise<SuccessPayload>;
}

type ThunkConfigParams<RequestParams, SuccessPayload> = ThunkConfigReq<
  RequestParams,
  SuccessPayload
> &
  Partial<ThunkConfigOpt<RequestParams, SuccessPayload>>;

type ThunkConfigDefaulted<RequestParams, SuccessPayload> = ThunkConfigReq<
  RequestParams,
  SuccessPayload
> &
  ThunkConfigOpt<RequestParams, SuccessPayload>;

export default function makeThunkFetch<RequestParams, SuccessPayload>(
  passedThunkConfig: ThunkConfigParams<RequestParams, SuccessPayload>,
) {
  const thunkConfig: ThunkConfigDefaulted<RequestParams, SuccessPayload> = {
    authenticated: false,
    transformResponse: (resp: any): SuccessPayload => resp,
    ...passedThunkConfig,
  };

  return (params: RequestParams) => (
    dispatch: Dispatch,
    getState?: () => Store,
  ) => {
    // dispatch(thunkConfig.asyncActionSet.fetch(params));
    fetch(thunkConfig.fetchConfig)
      .then((response: Response) => {
        if (response.ok) {
          return response.json();
        }
        const err = new Error('Did not receive valid json response');
        // @ts-ignore
        err.statusCode = response.status; // /!\
        throw err;
      })
      .then((resp: any) =>
        thunkConfig.transformResponse(resp, {
          action: params,
          dispatch,
          ...(getState ? { getState } : {}),
        }),
      )
      .then((response: SuccessPayload) => {
        // dispatch(thunkConfig.asyncActionSet.success(response));
      })
      .catch((err: any) => {
        // const errors =
        //   err.errors !== undefined && Array.isArray(err.errors)
        //     ? err.errors
        //     : err.errors !== undefined
        //     ? [err.errors]
        //     : [err];
        // Warning: Makes best guess at any[]
        // dispatch(thunkConfig.asyncActionSet.fail(errors));
      });
  };
}
