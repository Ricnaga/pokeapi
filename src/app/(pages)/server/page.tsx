import { onServerFetch } from "@/app/hooks/server";
import { PokemonImage } from "@/app/shared/components/@Poke";
import { Pagination, PokemonResponse } from "@/app/types";
import { Suspense } from "react";
import { PokemonGrid } from "./_components/PokemonGrid";

export default async function Page() {
  const { results } = await onServerFetch<Pagination<{ name: string }>>({
    endpoint: "/pokemon",
    params: {
      limit: "100",
    },
  });

  const onFetchPokemon = async (index: number) => {
    "use server";
    const data = await onServerFetch<PokemonResponse>({
      endpoint: "/pokemon/:id".replace(":id", (index + 1).toString()),
    });

    return data.sprites.other["official-artwork"].front_default;
  };

  return (
    <main>
      <h1>Essa página foi criada para renderizar on Server usando fetch</h1>
      <Suspense fallback={<>Carregando...</>}>
        <PokemonGrid data={results} onGetPokemon={onFetchPokemon} />
      </Suspense>
    </main>
  );
}
