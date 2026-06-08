import pCamisetaPreta from "@/assets/p-camiseta-preta.jpg";
import pCamisetaOff from "@/assets/col-camisetas.jpg";
import pPoloOliva from "@/assets/p-polo-oliva.jpg";
import pPoloPreto from "@/assets/p-polo-preto.jpg";
import pCalcaGrafite from "@/assets/p-calca-grafite.jpg";
import pCalcaPreta from "@/assets/p-calca-preta.jpg";
import pJaquetaOliva from "@/assets/p-jaqueta-oliva.jpg";
import pJaquetaPreta from "@/assets/p-jaqueta-preta.jpg";
import pTricoCreme from "@/assets/p-trico-creme.jpg";
import pCamisaOxford from "@/assets/p-camisa-oxford.jpg";
import pMoletom from "@/assets/p-moletom-cinza.jpg";
import pTenis from "@/assets/p-tenis-branco.jpg";
import pCinto from "@/assets/p-cinto-preto.jpg";
import pBermuda from "@/assets/p-bermuda-linho.jpg";

export type Product = {
  slug: string;
  name: string;
  collection: string;
  price: number;
  images: string[];
  sizes: string[];
  stock: Record<string, number>;
  shortDescription: string;
  description: string;
  composition: string;
  care: string;
  tags?: string[];
};

export const products: Product[] = [
  {
    slug: "camiseta-essencial-preta",
    name: "Camiseta Essencial — Preta",
    collection: "camisetas",
    price: 289,
    images: [pCamisetaPreta, pCamisetaOff],
    sizes: ["P", "M", "G", "GG"],
    stock: { P: 4, M: 8, G: 6, GG: 2 },
    shortDescription: "Algodão pima de gramatura premium, modelagem reta.",
    description:
      "A camiseta essencial em algodão pima de fibra longa. Modelagem reta, ombros estruturados e barra ligeiramente alongada. Feita para durar e melhorar com o tempo.",
    composition: "100% algodão pima.",
    care: "Lavar à mão ou ciclo delicado em água fria. Secar à sombra.",
  },
  {
    slug: "camiseta-essencial-off-white",
    name: "Camiseta Essencial — Off White",
    collection: "camisetas",
    price: 289,
    images: [pCamisetaOff, pCamisetaPreta],
    sizes: ["P", "M", "G", "GG"],
    stock: { P: 0, M: 5, G: 3, GG: 4 },
    shortDescription: "O básico em sua expressão mais sofisticada.",
    description:
      "Mesma construção da nossa camiseta essencial, em tom off white quente. O complemento neutro para qualquer combinação.",
    composition: "100% algodão pima.",
    care: "Lavar à mão ou ciclo delicado em água fria. Secar à sombra.",
  },
  {
    slug: "polo-pique-oliva",
    name: "Polo Piquê — Oliva",
    collection: "polos",
    price: 459,
    images: [pPoloOliva, pPoloPreto],
    sizes: ["P", "M", "G", "GG"],
    stock: { P: 3, M: 6, G: 5, GG: 1 },
    shortDescription: "Piquê italiano em tom verde oliva.",
    description:
      "Polo em piquê de algodão mercerizado, com gola estruturada e três botões em corozo. Tom oliva profundo, ideal para compor com tons neutros.",
    composition: "100% algodão mercerizado.",
    care: "Lavar à máquina em ciclo delicado. Não usar alvejante.",
  },
  {
    slug: "polo-pique-preta",
    name: "Polo Piquê — Preta",
    collection: "polos",
    price: 459,
    images: [pPoloPreto, pPoloOliva],
    sizes: ["P", "M", "G", "GG"],
    stock: { P: 5, M: 7, G: 4, GG: 3 },
    shortDescription: "A polo preta definitiva.",
    description:
      "Polo em piquê italiano com modelagem ajustada, gola firme e acabamento limpo. A peça que define o vestuário casual elevado.",
    composition: "100% algodão mercerizado.",
    care: "Lavar à máquina em ciclo delicado. Não usar alvejante.",
  },
  {
    slug: "calca-alfaiataria-grafite",
    name: "Calça Alfaiataria — Grafite",
    collection: "calcas",
    price: 789,
    images: [pCalcaGrafite, pCalcaPreta],
    sizes: ["38", "40", "42", "44", "46"],
    stock: { "38": 2, "40": 4, "42": 5, "44": 3, "46": 1 },
    shortDescription: "Lã italiana, cintura média, perna reta.",
    description:
      "Calça de alfaiataria em lã virgem italiana de toque fluido. Cintura média, pences frontais discretas e caimento limpo até a barra.",
    composition: "98% lã virgem, 2% elastano.",
    care: "Lavar a seco. Passar com vapor.",
  },
  {
    slug: "calca-chino-preta",
    name: "Calça Chino — Preta",
    collection: "calcas",
    price: 589,
    images: [pCalcaPreta, pCalcaGrafite],
    sizes: ["38", "40", "42", "44", "46"],
    stock: { "38": 3, "40": 5, "42": 6, "44": 4, "46": 2 },
    shortDescription: "Sarja japonesa, modelagem reta clássica.",
    description:
      "Chino em sarja japonesa de algodão pesado. Modelagem reta, cintura média e detalhes discretos. Versatilidade absoluta.",
    composition: "100% algodão.",
    care: "Lavar à máquina em água fria. Passar do avesso.",
  },
  {
    slug: "jaqueta-bomber-oliva",
    name: "Jaqueta Bomber — Oliva",
    collection: "jaquetas",
    price: 1290,
    images: [pJaquetaOliva],
    sizes: ["P", "M", "G", "GG"],
    stock: { P: 1, M: 3, G: 2, GG: 1 },
    shortDescription: "Bomber em camurça com forro de seda.",
    description:
      "Jaqueta bomber em camurça selecionada, gola e punhos em ribana. Forro interno em seda. Uma peça-statement em sua expressão mais sutil.",
    composition: "Exterior: 100% camurça. Forro: 100% seda.",
    care: "Apenas limpeza profissional especializada em camurça.",
  },
  {
    slug: "sobretudo-la-preto",
    name: "Sobretudo Lã — Preto",
    collection: "jaquetas",
    price: 2490,
    images: [pJaquetaPreta],
    sizes: ["P", "M", "G", "GG"],
    stock: { P: 0, M: 2, G: 2, GG: 1 },
    shortDescription: "Lã pura italiana, modelagem oversized.",
    description:
      "Sobretudo longo em lã pura italiana, com lapelas estreitas e forro interno em viscose. Caimento generoso e silhueta atemporal.",
    composition: "100% lã italiana. Forro: 100% viscose.",
    care: "Apenas limpeza a seco.",
  },
  {
    slug: "trico-creme",
    name: "Tricô Cashmere — Creme",
    collection: "essentials",
    price: 989,
    images: [pTricoCreme],
    sizes: ["P", "M", "G", "GG"],
    stock: { P: 2, M: 4, G: 3, GG: 1 },
    shortDescription: "Cashmere puro mongol, gola careca.",
    description:
      "Tricô em cashmere puro de fibras finas, gola careca e canelado nos punhos e barra. Tom creme quente, peso ideal para meia estação.",
    composition: "100% cashmere.",
    care: "Lavar à mão em água fria com sabão neutro. Secar plano.",
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCollection = (collectionSlug: string) =>
  products.filter((p) => p.collection === collectionSlug);

export const getRelatedProducts = (slug: string, limit = 4) => {
  const current = getProduct(slug);
  if (!current) return [];
  const sameCollection = products.filter(
    (p) => p.collection === current.collection && p.slug !== slug,
  );
  const others = products.filter(
    (p) => p.collection !== current.collection && p.slug !== slug,
  );
  return [...sameCollection, ...others].slice(0, limit);
};

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);