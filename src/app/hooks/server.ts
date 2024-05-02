import { IFetchBase, onFetch } from "./fetcher";

interface IOnServerFetch<V = BodyInit> extends Omit<IFetchBase, "body"> {
  variables?: V;
}

export const onServerFetch = async <T = undefined>(payload: IOnServerFetch) => {
  const { variables, ...rest } = payload;

  const body = variables || null;
  
  const response: T = await onFetch({ body, ...rest }).then((response) => {
    return response.json();
  });

  return response;
};
