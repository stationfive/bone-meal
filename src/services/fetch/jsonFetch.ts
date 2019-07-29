const jsonFetch = <ResponseType>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<ResponseType> =>
  fetch(input, init).then(async (resp: Response) => {
    const response = await resp.json();
    if (!resp.ok) {
      throw response;
    }
    return response;
  });

export default jsonFetch;
