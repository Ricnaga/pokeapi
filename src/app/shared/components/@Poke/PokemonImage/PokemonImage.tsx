import Image from "next/image";
import { ComponentProps } from "react";

interface PokemonImage extends Omit<ComponentProps<typeof Image>, "alt"> {
  alt?: string;
}

export function PokemonImage(props: PokemonImage) {
  const { alt = "Pokémon photo", width = 500, height = 500, ...rest } = props;

  return <Image alt={alt} width={width} height={height} {...rest} />;
}
