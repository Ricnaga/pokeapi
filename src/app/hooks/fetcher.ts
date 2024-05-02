import { Params } from "../types/requests.types";

enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PATCH = "PATCH",
  PUT = "PUT",
  DELETE = "DELETE",
}

const BASEURL = "https://pokeapi.co/api/v2";

type FetchRequestType = Omit<RequestInit, "method">;

export interface IFetchBase extends FetchRequestType {
  endpoint: string;
  params?: Params;
  method?: keyof typeof HttpMethod;
}

export const onFetch = async (payload: IFetchBase) => {
  const { params, endpoint, method = "GET", ...rest } = payload;

  let ENDPOINTURL = new URL(BASEURL.concat(endpoint));

  if (!!params) {
    Object.entries(params).forEach(([key, value]) =>
      ENDPOINTURL.searchParams.append(key, value)
    );
  }

  return fetch(ENDPOINTURL, { method, ...rest });
};
