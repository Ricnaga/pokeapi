"use client";

import { useFetchQuery, useLazyFetchQuery } from "@/app/hooks/client";
import { PokeCardLoading, PokemonImage } from "@/app/shared/components/@Poke";
import { Pagination, PokemonResponse } from "@/app/types";

export default function Page() {
  const { data: pokemonsData, isLoading: isPokemonsLoading } = useFetchQuery<
    Pagination<{ name: string }>
  >({
    endpoint: "/pokemon",
    params: {
      limit: "100",
    },
  });

  const {
    data: pokemonData,
    isLoading: isPokemonLoading,
    getData,
  } = useLazyFetchQuery<PokemonResponse>();

  const onFetchPokemon = (index: number) =>
    getData({
      endpoint: "/pokemon/:id".replace(":id", (index + 1).toString()),
    });

  return (
    <main>
      <h1>Essa página foi criada para renderizar on Client usando o fetch</h1>
      <div className="grid grid-cols-10 gap-4 p-4">
        <PokeCardLoading data={pokemonsData} isLoading={isPokemonsLoading}>
          {(data) =>
            data.results.map((result, index) => (
              <div key={result.name}>
                <p
                  className="text-xl hover:cursor-pointer hover:text-blue-500 active:text-blue-800"
                  onClick={() => onFetchPokemon(index)}
                >
                  {result.name}
                </p>
              </div>
            ))
          }
        </PokeCardLoading>
      </div>

      <div className="mt-4 grid grid-cols-1 justify-items-center">
        <PokeCardLoading data={pokemonData} isLoading={isPokemonLoading}>
          {(pokeData) => (
            <PokemonImage
              src={pokeData.sprites.other["official-artwork"].front_default}
            />
          )}
        </PokeCardLoading>
      </div>
    </main>
  );
}
