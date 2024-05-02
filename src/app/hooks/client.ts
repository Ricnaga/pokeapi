import { useEffect, useState } from "react";
import { IFetchBase, onFetch } from "./fetcher";

const useClientBase = <T = undefined>() => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<T>();

  const onLoadingIsOff = () => setIsLoading(false);
  const onLoadingIsOn = () => setIsLoading(true);

  return {
    data,
    setData,
    isLoading,
    onLoadingIsOff,
    onLoadingIsOn,
  };
};

type UseFetchQueryType = Omit<IFetchBase, "method">;

export const useFetchQuery = <T = undefined>(payload: UseFetchQueryType) => {
  const { data, isLoading, onLoadingIsOff, setData } = useClientBase<T>();

  useEffect(() => {
    (async () => {
      const response: T = await onFetch(payload)
        .then((response) => {
          return response.json();
        })
        .finally(onLoadingIsOff);

      setData(response);
    })();
  }, []);

  return { data, isLoading };
};

type UseFetchLazyQueryType = UseFetchQueryType;

type GetDataType = Omit<UseFetchLazyQueryType, "endpoint">;

export const useLazyFetchQuery = <T = undefined>(
  payload: UseFetchLazyQueryType
) => {
  const { endpoint, ...rest } = payload;

  const { data, isLoading, onLoadingIsOff, setData } = useClientBase<T>();

  const getData = async (data: GetDataType = {}) => {
    const response: T = await onFetch({
      ...(!data || !data.params ? rest : data),
      endpoint,
    })
      .then((response) => {
        return response.json();
      })
      .finally(onLoadingIsOff);

    setData(response);
  };

  return { data, isLoading, getData };
};

type UseFetchMutationType = Omit<IFetchBase, "body" | "method" | "params">;

interface IUseFetchMutation extends UseFetchMutationType {
  method?: "POST" | "PATCH" | "PUT" | "DELETE";
}

interface MutateType<V = BodyInit> extends Omit<IUseFetchMutation, "endpoint"> {
  variables: V;
}

export const useFetchMutation = <T = undefined, V = undefined>(
  payload: IUseFetchMutation
) => {
  const { endpoint, method = "POST", ...rest } = payload;

  const { data, isLoading, onLoadingIsOff, setData } = useClientBase<T>();

  const mutate = async (data: MutateType<V>) => {
    const { variables, ...dataRest } = data;

    const body = !!variables ? JSON.stringify(variables) : null;

    const response: T = await onFetch({
      ...(dataRest || rest),
      body,
      method,
      endpoint,
    })
      .then((response) => {
        return response.json();
      })
      .finally(onLoadingIsOff);

    setData(response);
  };

  return { data, isLoading, mutate };
};
