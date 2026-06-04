import colEssentials from "@/assets/col-essentials.jpg";
import colPolos from "@/assets/col-polos.jpg";
import colCamisetas from "@/assets/col-camisetas.jpg";
import colJaquetas from "@/assets/col-jaquetas.jpg";
import colCalcas from "@/assets/col-calcas.jpg";

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
};

export const collections: Collection[] = [
  {
    slug: "essentials",
    name: "Essentials",
    tagline: "O guarda-roupa essencial.",
    image: colEssentials,
  },
  {
    slug: "polos",
    name: "Polos",
    tagline: "Refinamento casual.",
    image: colPolos,
  },
  {
    slug: "camisetas",
    name: "Camisetas",
    tagline: "Construção impecável.",
    image: colCamisetas,
  },
  {
    slug: "jaquetas",
    name: "Jaquetas",
    tagline: "Camadas com presença.",
    image: colJaquetas,
  },
  {
    slug: "calcas",
    name: "Calças",
    tagline: "Caimento e estrutura.",
    image: colCalcas,
  },
];

export const getCollection = (slug: string) =>
  collections.find((c) => c.slug === slug);