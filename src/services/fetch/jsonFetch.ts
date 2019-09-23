const DEFAULT_HEADERS: Record<string, string> = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const jsonFetch = <ResponseType>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<ResponseType> => {
  const filledInit: RequestInit = {
    ...init,
    headers: {
      ...DEFAULT_HEADERS,
      ...(init || {}).headers,
    },
  };

  return fetch(input, filledInit).then(async (resp: Response) => {
    const response = await resp.json();
    if (!resp.ok) {
      throw response;
    }
    return response;
  });
};
export default jsonFetch;
