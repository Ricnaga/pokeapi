"use client";

import { PokemonImage } from "@/app/shared/components/@Poke";
import { ReactNode, useState } from "react";

type PokemonGridProps = {
  data: Array<{ name: string }>;
  onGetPokemon: (index: number) => Promise<string>;
};

export function PokemonGrid(props: PokemonGridProps) {
  const { data, onGetPokemon } = props;
  const [source, setSource] = useState<string>("");

  const handlePokemonPhoto = async (index: number) =>
    setSource(await onGetPokemon(index));

  return (
    <>
      <div className="grid grid-cols-10 gap-4 p-4">
        {data.map((item, index) => (
          <div key={item.name}>
            <p
              className="text-xl hover:cursor-pointer hover:text-blue-500 active:text-blue-800"
              onClick={() => handlePokemonPhoto(index)}
            >
              {item.name}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-1 justify-items-center">
        {source && <PokemonImage src={source} />}
      </div>
    </>
  );
}
