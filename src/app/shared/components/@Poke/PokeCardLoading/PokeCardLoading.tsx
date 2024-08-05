import { ReactNode } from "react";

type PokeCardLoadingProps<T extends object> = {
  isLoading: boolean;
  data: T | undefined;
  children: (data: T) => ReactNode;
  loadingMessage?: string;
  dataMessage?: string;
};

export function PokeCardLoading<T extends object>(
  props: PokeCardLoadingProps<T>
) {
  const {
    isLoading = false,
    data,
    dataMessage,
    loadingMessage,
    children,
  } = props;

  if (isLoading) return <h1>{loadingMessage || "Carregando..."}</h1>;

  if (!data)
    return <h1>{dataMessage || "Não foi possível Carregar dados :("}</h1>;

  return children(data);
}
