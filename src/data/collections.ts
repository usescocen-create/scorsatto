import colEssentials from "@/assets/col-essentials.jpg";
import colPolos from "@/assets/col-polos.jpg";
import colCamisetas from "@/assets/col-camisetas.jpg";
import colJaquetas from "@/assets/col-jaquetas.jpg";
import colCalcas from "@/assets/col-calcas.jpg";
import colCamisaOxford from "@/assets/p-camisa-oxford.jpg";
import colMoletom from "@/assets/p-moletom-cinza.jpg";
import colTenis from "@/assets/p-tenis-branco.jpg";
import colCinto from "@/assets/p-cinto-preto.jpg";
import colBermuda from "@/assets/p-bermuda-linho.jpg";
import colWeekend from "@/assets/col-weekend.jpg";
import colHero from "@/assets/hero.jpg";
import colLifestyle from "@/assets/lifestyle.jpg";
import colTrico from "@/assets/p-trico-creme.jpg";

export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  /** When set, filters by product.tags. Otherwise filters by product.collection === slug. */
  tag?: string;
};

/** Coleções por categoria (linhas de produto) */
export const categoryCollections: Collection[] = [
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
    slug: "camisas",
    name: "Camisas",
    tagline: "Estrutura e elegância.",
    image: colCamisaOxford,
  },
  {
    slug: "tricots",
    name: "Tricots",
    tagline: "Fibras nobres.",
    image: colTrico,
  },
  {
    slug: "moletons",
    name: "Moletons",
    tagline: "Conforto elevado.",
    image: colMoletom,
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
  {
    slug: "bermudas",
    name: "Bermudas",
    tagline: "Verão sem esforço.",
    image: colBermuda,
  },
  {
    slug: "calcados",
    name: "Calçados",
    tagline: "Construção atemporal.",
    image: colTenis,
  },
  {
    slug: "acessorios",
    name: "Acessórios",
    tagline: "Detalhes que finalizam.",
    image: colCinto,
  },
];

/** Coleções editoriais (filtram por tag) */
export const editorialCollections: Collection[] = [
  { slug: "novidades", name: "Novidades", tagline: "Recém-chegados à curadoria.", image: colHero, tag: "novidades" },
  { slug: "mais-vendidos", name: "Mais Vendidos", tagline: "As peças favoritas da casa.", image: colLifestyle, tag: "mais-vendidos" },
  { slug: "casual-premium", name: "Casual Premium", tagline: "Conforto com presença.", image: colMoletom, tag: "casual-premium" },
  { slug: "office", name: "Office", tagline: "Para a semana de trabalho.", image: colCamisaOxford, tag: "office" },
  { slug: "weekend", name: "Weekend", tagline: "Final de semana, sem esforço.", image: colWeekend, tag: "weekend" },
  { slug: "inverno", name: "Inverno", tagline: "Camadas e gramaturas.", image: colJaquetas, tag: "inverno" },
  { slug: "verao", name: "Verão", tagline: "Tecidos leves e respiráveis.", image: colBermuda, tag: "verao" },
];

export const collections: Collection[] = [...categoryCollections, ...editorialCollections];

export const getCollection = (slug: string) =>
  collections.find((c) => c.slug === slug);