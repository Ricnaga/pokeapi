import { onFetch } from "@/app/hooks/fetcher";
import { PokeCardLoading, PokemonImage } from "@/app/shared/components/@Poke";
import { Pagination, PokemonResponse } from "@/app/types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const PokemonsQueryFn = async () => {
  const data: Pagination<{ name: string }> = await onFetch({
    endpoint: "/pokemon",
    params: {
      limit: "100",
    },
  }).then((response) => response.json());

  return data;
};

const PokemonQueryFn = async (index: number) => {
  const data: PokemonResponse = await onFetch({
    endpoint: "/pokemon/:id".replace(":id", index.toString()),
  }).then((response) => response.json());

  return data;
};

export function Container() {
  const { data: pokemonsData, isLoading: isPokemonsLoading } = useQuery({
    queryKey: ["PokemonPagination"],
    queryFn: PokemonsQueryFn,
  });

  const [pokemon, setPokemon] = useState<number | undefined>(undefined);
  const { data: pokemonData, isLoading: isPokemonLoading } = useQuery({
    queryKey: ["PokemonPhoto".concat("-", pokemon?.toString() || "")],
    queryFn: () => PokemonQueryFn(pokemon || 0),
    enabled: pokemon !== undefined,
  });

  return (
    <main>
      <h1>
        Essa página foi criada para renderizar on Client usando o react-query
      </h1>

      <div className="grid grid-cols-10 gap-4 p-4">
        <PokeCardLoading data={pokemonsData} isLoading={isPokemonsLoading}>
          {(data) =>
            data.results.map((result, index) => (
              <div key={result.name}>
                <p
                  className="text-xl hover:cursor-pointer hover:text-blue-500 active:text-blue-800"
                  onClick={() => setPokemon(index + 1)}
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
