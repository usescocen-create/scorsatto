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
  { slug: "camiseta-essencial-preta", name: "Camiseta Essencial — Preta", collection: "camisetas", price: 289, images: [pCamisetaPreta, pCamisetaOff], sizes: ["P","M","G","GG"], stock: {P:4,M:8,G:6,GG:2}, shortDescription: "Algodão pima de gramatura premium, modelagem reta.", description: "A camiseta essencial em algodão pima de fibra longa. Modelagem reta, ombros estruturados e barra ligeiramente alongada. Feita para durar e melhorar com o tempo.", composition: "100% algodão pima.", care: "Lavar à mão ou ciclo delicado em água fria. Secar à sombra.", tags: ["essentials","mais-vendidos","office","verao"] },
  { slug: "camiseta-essencial-off-white", name: "Camiseta Essencial — Off White", collection: "camisetas", price: 289, images: [pCamisetaOff, pCamisetaPreta], sizes: ["P","M","G","GG"], stock: {P:0,M:5,G:3,GG:4}, shortDescription: "O básico em sua expressão mais sofisticada.", description: "Mesma construção da nossa camiseta essencial, em tom off white quente. O complemento neutro para qualquer combinação.", composition: "100% algodão pima.", care: "Lavar à mão ou ciclo delicado em água fria. Secar à sombra.", tags: ["essentials","verao"] },
  { slug: "camiseta-algodao-egipcio", name: "Camiseta Algodão Egípcio — Branca", collection: "camisetas", price: 349, images: [pCamisetaOff], sizes: ["P","M","G","GG"], stock: {P:3,M:5,G:4,GG:2}, shortDescription: "Algodão egípcio de fibra extra-longa.", description: "Camiseta em algodão egípcio de fibra extra-longa, com toque sedoso e durabilidade superior. Modelagem clássica.", composition: "100% algodão egípcio.", care: "Lavar a 30°C. Secar à sombra.", tags: ["essentials","novidades","verao"] },
  { slug: "camiseta-gola-portuguesa-marinho", name: "Camiseta Gola Portuguesa — Marinho", collection: "camisetas", price: 329, images: [pCamisetaPreta], sizes: ["P","M","G","GG"], stock: {P:2,M:4,G:3,GG:2}, shortDescription: "Gola portuguesa, modelagem refinada.", description: "Camiseta com gola portuguesa em algodão mercerizado. Detalhe vintage com construção contemporânea.", composition: "100% algodão mercerizado.", care: "Lavar à mão.", tags: ["casual-premium","novidades"] },
  { slug: "camiseta-manga-longa-preta", name: "Camiseta Manga Longa — Preta", collection: "camisetas", price: 379, images: [pCamisetaPreta], sizes: ["P","M","G","GG"], stock: {P:3,M:5,G:4,GG:2}, shortDescription: "Manga longa, gramatura média.", description: "Camiseta manga longa em algodão pima de gramatura média. Base perfeita para sobreposições.", composition: "100% algodão pima.", care: "Lavar a 30°C.", tags: ["inverno","essentials"] },
  { slug: "camiseta-slim-premium-grafite", name: "Camiseta Slim Premium — Grafite", collection: "camisetas", price: 319, images: [pCamisetaPreta], sizes: ["P","M","G","GG"], stock: {P:4,M:6,G:5,GG:3}, shortDescription: "Modelagem ajustada, caimento limpo.", description: "Slim premium em algodão pima penteado, com modelagem mais ajustada ao corpo.", composition: "95% algodão, 5% elastano.", care: "Lavar à máquina ciclo delicado.", tags: ["mais-vendidos","office"] },

  { slug: "polo-pique-oliva", name: "Polo Piquê — Oliva", collection: "polos", price: 459, images: [pPoloOliva, pPoloPreto], sizes: ["P","M","G","GG"], stock: {P:3,M:6,G:5,GG:1}, shortDescription: "Piquê italiano em tom verde oliva.", description: "Polo em piquê de algodão mercerizado, com gola estruturada e três botões em corozo.", composition: "100% algodão mercerizado.", care: "Lavar à máquina em ciclo delicado.", tags: ["casual-premium","weekend","novidades"] },
  { slug: "polo-pique-preta", name: "Polo Piquê — Preta", collection: "polos", price: 459, images: [pPoloPreto, pPoloOliva], sizes: ["P","M","G","GG"], stock: {P:5,M:7,G:4,GG:3}, shortDescription: "A polo preta definitiva.", description: "Polo em piquê italiano com modelagem ajustada, gola firme e acabamento limpo.", composition: "100% algodão mercerizado.", care: "Lavar à máquina em ciclo delicado.", tags: ["essentials","mais-vendidos","office"] },
  { slug: "polo-premium-marinho", name: "Polo Premium — Marinho", collection: "polos", price: 499, images: [pPoloPreto], sizes: ["P","M","G","GG"], stock: {P:2,M:5,G:4,GG:2}, shortDescription: "Piquê premium, acabamento superior.", description: "Polo premium em piquê italiano, com gola estruturada e botões em madrepérola.", composition: "100% algodão mercerizado.", care: "Lavar à máquina em ciclo delicado.", tags: ["office","novidades"] },
  { slug: "polo-tricot-creme", name: "Polo Tricot — Creme", collection: "polos", price: 689, images: [pTricoCreme], sizes: ["P","M","G","GG"], stock: {P:1,M:3,G:3,GG:1}, shortDescription: "Polo em tricot fino de algodão.", description: "Polo confeccionada em tricot fino de algodão, com caimento estruturado e toque sofisticado.", composition: "100% algodão.", care: "Lavar à mão. Secar plano.", tags: ["weekend","casual-premium"] },
  { slug: "polo-texturizada-azul", name: "Polo Texturizada — Azul", collection: "polos", price: 469, images: [pPoloOliva], sizes: ["P","M","G","GG"], stock: {P:2,M:4,G:4,GG:2}, shortDescription: "Tecido texturizado, padronagem discreta.", description: "Polo com tecido texturizado em micro-padronagem. Acabamento sofisticado.", composition: "100% algodão.", care: "Lavar à máquina ciclo delicado.", tags: ["novidades","casual-premium"] },
  { slug: "polo-manga-longa-grafite", name: "Polo Manga Longa — Grafite", collection: "polos", price: 549, images: [pPoloPreto], sizes: ["P","M","G","GG"], stock: {P:2,M:4,G:3,GG:1}, shortDescription: "Manga longa, gramatura ideal para meia estação.", description: "Polo manga longa em piquê pesado. Versatilidade do casual ao smart casual.", composition: "100% algodão.", care: "Lavar à máquina ciclo delicado.", tags: ["inverno","office"] },

  { slug: "camisa-oxford-branca", name: "Camisa Oxford — Branca", collection: "camisas", price: 599, images: [pCamisaOxford], sizes: ["P","M","G","GG"], stock: {P:3,M:6,G:5,GG:2}, shortDescription: "Oxford clássico em algodão pesado.", description: "Camisa Oxford em algodão japonês de gramatura ideal. Modelagem clássica, gola button-down opcional.", composition: "100% algodão.", care: "Lavar à máquina. Passar levemente úmido.", tags: ["office","essentials","mais-vendidos"] },
  { slug: "camisa-linho-bege", name: "Camisa Linho — Bege", collection: "camisas", price: 689, images: [pCamisaOxford], sizes: ["P","M","G","GG"], stock: {P:2,M:4,G:3,GG:1}, shortDescription: "Linho puro irlandês, leveza absoluta.", description: "Camisa em linho puro irlandês de fibras longas. Caimento fluido e respirabilidade total.", composition: "100% linho.", care: "Lavar à mão. Passar úmido.", tags: ["verao","weekend","novidades"] },
  { slug: "camisa-social-premium", name: "Camisa Social Premium — Branca", collection: "camisas", price: 749, images: [pCamisaOxford], sizes: ["P","M","G","GG"], stock: {P:2,M:5,G:4,GG:2}, shortDescription: "Algodão fio 100, acabamento impecável.", description: "Camisa social em algodão fio 100, modelagem slim, costuras francesas e punhos duplos.", composition: "100% algodão fio 100.", care: "Lavar à máquina ciclo delicado.", tags: ["office"] },
  { slug: "camisa-casual-premium-azul", name: "Camisa Casual Premium — Azul", collection: "camisas", price: 569, images: [pCamisaOxford], sizes: ["P","M","G","GG"], stock: {P:3,M:5,G:4,GG:2}, shortDescription: "Casual com toque elevado.", description: "Camisa em algodão lavado, modelagem regular e tonalidade azul claro.", composition: "100% algodão.", care: "Lavar à máquina.", tags: ["casual-premium","weekend"] },

  { slug: "trico-creme", name: "Tricô Cashmere — Creme", collection: "tricots", price: 989, images: [pTricoCreme], sizes: ["P","M","G","GG"], stock: {P:2,M:4,G:3,GG:1}, shortDescription: "Cashmere puro mongol, gola careca.", description: "Tricô em cashmere puro de fibras finas, gola careca e canelado nos punhos e barra.", composition: "100% cashmere.", care: "Lavar à mão em água fria com sabão neutro. Secar plano.", tags: ["inverno","weekend","mais-vendidos","essentials"] },
  { slug: "trico-gola-careca-marinho", name: "Tricô Gola Careca — Marinho", collection: "tricots", price: 749, images: [pTricoCreme], sizes: ["P","M","G","GG"], stock: {P:2,M:4,G:3,GG:2}, shortDescription: "Lã merino, gola careca clássica.", description: "Tricô em lã merino extrafina. Gola careca clássica, canelado discreto.", composition: "100% lã merino.", care: "Lavar à mão. Secar plano.", tags: ["inverno","office"] },
  { slug: "trico-gola-alta-grafite", name: "Tricô Gola Alta — Grafite", collection: "tricots", price: 849, images: [pTricoCreme], sizes: ["P","M","G","GG"], stock: {P:1,M:3,G:3,GG:1}, shortDescription: "Gola alta, sofisticação old money.", description: "Tricô gola alta em lã merino, ponto cerrado. A peça-chave do guarda-roupa quiet luxury.", composition: "100% lã merino.", care: "Lavar à mão.", tags: ["inverno","weekend","mais-vendidos"] },
  { slug: "trico-premium-knit-preto", name: "Premium Knit — Preto", collection: "tricots", price: 1190, images: [pTricoCreme], sizes: ["P","M","G","GG"], stock: {P:1,M:2,G:2,GG:1}, shortDescription: "Mistura nobre de cashmere e seda.", description: "Premium knit em blend de cashmere com seda. Caimento fluido, brilho sutil.", composition: "70% cashmere, 30% seda.", care: "Apenas limpeza profissional.", tags: ["inverno","novidades"] },
  { slug: "cardigan-camelo", name: "Cardigan — Camelo", collection: "tricots", price: 989, images: [pTricoCreme], sizes: ["P","M","G","GG"], stock: {P:1,M:3,G:2,GG:1}, shortDescription: "Cardigan em lã merino, tom camelo.", description: "Cardigan com botões em corozo, lã merino italiana. Sobreposição refinada.", composition: "100% lã merino.", care: "Lavar à mão.", tags: ["inverno","weekend"] },

  { slug: "moletom-essential-cinza", name: "Moletom Essential — Cinza", collection: "moletons", price: 449, images: [pMoletom], sizes: ["P","M","G","GG"], stock: {P:3,M:5,G:4,GG:2}, shortDescription: "Moletom essencial, sem capuz.", description: "Moletom em algodão pesado, gola careca, modelagem reta.", composition: "100% algodão.", care: "Lavar à máquina.", tags: ["casual-premium","essentials","mais-vendidos"] },
  { slug: "moletom-premium-marinho", name: "Moletom Premium — Marinho", collection: "moletons", price: 589, images: [pMoletom], sizes: ["P","M","G","GG"], stock: {P:2,M:4,G:3,GG:2}, shortDescription: "Algodão peruano, gramatura pesada.", description: "Moletom premium em algodão peruano de alta gramatura. Toque interno aveludado.", composition: "100% algodão peruano.", care: "Lavar do avesso.", tags: ["inverno","casual-premium"] },
  { slug: "moletom-half-zip-preto", name: "Moletom Half Zip — Preto", collection: "moletons", price: 549, images: [pMoletom], sizes: ["P","M","G","GG"], stock: {P:2,M:4,G:4,GG:2}, shortDescription: "Half zip com gola alta.", description: "Moletom half zip com gola alta, zíper metálico discreto.", composition: "100% algodão.", care: "Lavar à máquina.", tags: ["weekend","novidades"] },
  { slug: "moletom-sem-capuz-grafite", name: "Moletom Sem Capuz — Grafite", collection: "moletons", price: 469, images: [pMoletom], sizes: ["P","M","G","GG"], stock: {P:3,M:5,G:4,GG:2}, shortDescription: "Modelagem clean, sem capuz.", description: "Moletom sem capuz, modelagem reta clássica.", composition: "100% algodão.", care: "Lavar do avesso.", tags: ["essentials","casual-premium"] },

  { slug: "jaqueta-bomber-oliva", name: "Jaqueta Bomber — Oliva", collection: "jaquetas", price: 1290, images: [pJaquetaOliva], sizes: ["P","M","G","GG"], stock: {P:1,M:3,G:2,GG:1}, shortDescription: "Bomber em camurça com forro de seda.", description: "Jaqueta bomber em camurça selecionada, gola e punhos em ribana. Forro interno em seda.", composition: "Exterior: 100% camurça. Forro: 100% seda.", care: "Apenas limpeza profissional especializada em camurça.", tags: ["inverno","novidades","weekend"] },
  { slug: "sobretudo-la-preto", name: "Sobretudo Lã — Preto", collection: "jaquetas", price: 2490, images: [pJaquetaPreta], sizes: ["P","M","G","GG"], stock: {P:0,M:2,G:2,GG:1}, shortDescription: "Lã pura italiana, modelagem oversized.", description: "Sobretudo longo em lã pura italiana, com lapelas estreitas e forro interno em viscose.", composition: "100% lã italiana. Forro: 100% viscose.", care: "Apenas limpeza a seco.", tags: ["inverno","office"] },
  { slug: "jaqueta-casual-preta", name: "Jaqueta Casual — Preta", collection: "jaquetas", price: 989, images: [pJaquetaPreta], sizes: ["P","M","G","GG"], stock: {P:2,M:4,G:3,GG:1}, shortDescription: "Casual versátil, algodão pesado.", description: "Jaqueta casual em algodão pesado, modelagem clean, bolsos discretos.", composition: "100% algodão.", care: "Lavar à máquina ciclo delicado.", tags: ["casual-premium","weekend"] },
  { slug: "jaqueta-premium-grafite", name: "Jaqueta Premium — Grafite", collection: "jaquetas", price: 1690, images: [pJaquetaPreta], sizes: ["P","M","G","GG"], stock: {P:1,M:3,G:2,GG:1}, shortDescription: "Construção alfaiataria, lã mista.", description: "Jaqueta premium com construção de alfaiataria, em lã mista.", composition: "70% lã, 30% poliéster.", care: "Apenas limpeza a seco.", tags: ["office","inverno"] },
  { slug: "jaqueta-suede-camelo", name: "Jaqueta Suede — Camelo", collection: "jaquetas", price: 1890, images: [pJaquetaOliva], sizes: ["P","M","G","GG"], stock: {P:1,M:2,G:2,GG:1}, shortDescription: "Suede italiano, tom camelo.", description: "Jaqueta em suede italiano, tom camelo, construção macia e estruturada.", composition: "100% suede.", care: "Limpeza profissional especializada.", tags: ["novidades","weekend","inverno"] },
  { slug: "corta-vento-preto", name: "Corta-Vento — Preto", collection: "jaquetas", price: 689, images: [pJaquetaPreta], sizes: ["P","M","G","GG"], stock: {P:3,M:5,G:4,GG:2}, shortDescription: "Tecido técnico, impermeável.", description: "Corta-vento em tecido técnico impermeável e respirável. Mínimo e funcional.", composition: "100% poliamida técnica.", care: "Lavar à máquina ciclo delicado.", tags: ["verao","weekend"] },

  { slug: "calca-alfaiataria-grafite", name: "Calça Alfaiataria — Grafite", collection: "calcas", price: 789, images: [pCalcaGrafite, pCalcaPreta], sizes: ["38","40","42","44","46"], stock: {"38":2,"40":4,"42":5,"44":3,"46":1}, shortDescription: "Lã italiana, cintura média, perna reta.", description: "Calça de alfaiataria em lã virgem italiana de toque fluido.", composition: "98% lã virgem, 2% elastano.", care: "Lavar a seco. Passar com vapor.", tags: ["office","inverno","mais-vendidos"] },
  { slug: "calca-chino-preta", name: "Calça Chino — Preta", collection: "calcas", price: 589, images: [pCalcaPreta, pCalcaGrafite], sizes: ["38","40","42","44","46"], stock: {"38":3,"40":5,"42":6,"44":4,"46":2}, shortDescription: "Sarja japonesa, modelagem reta clássica.", description: "Chino em sarja japonesa de algodão pesado. Modelagem reta, cintura média.", composition: "100% algodão.", care: "Lavar à máquina em água fria.", tags: ["essentials","casual-premium","weekend"] },
  { slug: "calca-sarja-bege", name: "Calça Sarja — Bege", collection: "calcas", price: 549, images: [pCalcaGrafite], sizes: ["38","40","42","44","46"], stock: {"38":2,"40":4,"42":4,"44":3,"46":1}, shortDescription: "Sarja de algodão, tom bege quente.", description: "Calça em sarja de algodão pesado, modelagem reta. Versátil e atemporal.", composition: "100% algodão.", care: "Lavar à máquina.", tags: ["casual-premium","essentials"] },
  { slug: "calca-jeans-premium", name: "Jeans Premium — Indigo", collection: "calcas", price: 729, images: [pCalcaPreta], sizes: ["38","40","42","44","46"], stock: {"38":2,"40":4,"42":5,"44":3,"46":2}, shortDescription: "Denim japonês selvedge.", description: "Jeans premium em denim japonês selvedge de 14 oz.", composition: "100% algodão.", care: "Lavar do avesso em água fria.", tags: ["mais-vendidos","novidades","weekend"] },
  { slug: "calca-linho-bege", name: "Calça Linho — Bege", collection: "calcas", price: 689, images: [pCalcaGrafite], sizes: ["38","40","42","44","46"], stock: {"38":2,"40":4,"42":3,"44":2,"46":1}, shortDescription: "Linho puro, caimento fluido.", description: "Calça em linho puro, cintura média, perna reta. Conforto absoluto para o verão.", composition: "100% linho.", care: "Lavar à mão ou ciclo delicado.", tags: ["verao","weekend"] },

  { slug: "bermuda-sarja-bege", name: "Bermuda Sarja — Bege", collection: "bermudas", price: 389, images: [pBermuda], sizes: ["38","40","42","44","46"], stock: {"38":3,"40":5,"42":4,"44":3,"46":2}, shortDescription: "Sarja leve, modelagem clássica.", description: "Bermuda em sarja leve, cintura média, comprimento clássico acima do joelho.", composition: "100% algodão.", care: "Lavar à máquina.", tags: ["verao","weekend"] },
  { slug: "bermuda-linho-creme", name: "Bermuda Linho — Creme", collection: "bermudas", price: 449, images: [pBermuda], sizes: ["38","40","42","44","46"], stock: {"38":2,"40":4,"42":4,"44":3,"46":1}, shortDescription: "Linho puro, leveza absoluta.", description: "Bermuda em linho puro, modelagem ampla e fluida.", composition: "100% linho.", care: "Lavar à mão.", tags: ["verao","novidades","mais-vendidos"] },
  { slug: "bermuda-casual-premium-preta", name: "Bermuda Casual Premium — Preta", collection: "bermudas", price: 429, images: [pBermuda], sizes: ["38","40","42","44","46"], stock: {"38":2,"40":4,"42":4,"44":2,"46":1}, shortDescription: "Casual premium em algodão pesado.", description: "Bermuda em algodão pesado, modelagem ajustada, acabamento premium.", composition: "100% algodão.", care: "Lavar à máquina.", tags: ["casual-premium","verao"] },

  { slug: "tenis-minimalista-branco", name: "Tênis Minimalista — Branco", collection: "calcados", price: 989, images: [pTenis], sizes: ["39","40","41","42","43","44"], stock: {"39":2,"40":3,"41":4,"42":4,"43":3,"44":2}, shortDescription: "Couro italiano, design clean.", description: "Tênis em couro italiano, solado branco e design minimalista. O sneaker definitivo do quiet luxury.", composition: "Couro bovino italiano.", care: "Limpar com pano úmido.", tags: ["mais-vendidos","essentials","novidades"] },
  { slug: "mocassim-couro-preto", name: "Mocassim Couro — Preto", collection: "calcados", price: 1290, images: [pTenis], sizes: ["39","40","41","42","43","44"], stock: {"39":1,"40":2,"41":3,"42":3,"43":2,"44":1}, shortDescription: "Mocassim italiano em couro preto.", description: "Mocassim em couro italiano, construção tradicional, solado em couro com base de borracha.", composition: "Couro bovino italiano.", care: "Polir regularmente.", tags: ["office","inverno"] },
  { slug: "casual-premium-camelo", name: "Sapato Casual Premium — Camelo", collection: "calcados", price: 1190, images: [pTenis], sizes: ["39","40","41","42","43","44"], stock: {"39":1,"40":2,"41":3,"42":3,"43":2,"44":1}, shortDescription: "Couro camurça, tom camelo.", description: "Sapato casual em camurça italiana tom camelo, construção goodyear welt.", composition: "Camurça italiana.", care: "Limpeza profissional.", tags: ["weekend","casual-premium"] },

  { slug: "carteira-couro-preta", name: "Carteira Couro — Preta", collection: "acessorios", price: 449, images: [pCinto], sizes: ["Único"], stock: {"Único":8}, shortDescription: "Couro italiano, design slim.", description: "Carteira slim em couro italiano, com compartimentos para cartões e cédulas.", composition: "Couro italiano.", care: "Limpar com pano seco.", tags: ["essentials","mais-vendidos"] },
  { slug: "cinto-couro-preto", name: "Cinto Couro — Preto", collection: "acessorios", price: 389, images: [pCinto], sizes: ["85","90","95","100","105"], stock: {"85":3,"90":5,"95":5,"100":4,"105":2}, shortDescription: "Couro italiano, fivela discreta.", description: "Cinto em couro italiano, fivela em metal acetinado.", composition: "Couro bovino italiano.", care: "Hidratar a cada 3 meses.", tags: ["office","essentials"] },
  { slug: "bone-essential-preto", name: "Boné Essential — Preto", collection: "acessorios", price: 229, images: [pCinto], sizes: ["Único"], stock: {"Único":12}, shortDescription: "Sarja pesada, sem estampa.", description: "Boné em sarja pesada, design minimalista sem estampas, fechamento ajustável.", composition: "100% algodão.", care: "Lavar à mão.", tags: ["casual-premium","weekend"] },
  { slug: "meias-premium-pack", name: "Meias Premium — Pack 3", collection: "acessorios", price: 199, images: [pCinto], sizes: ["39-42","43-46"], stock: {"39-42":10,"43-46":8}, shortDescription: "Algodão egípcio, pack com 3 pares.", description: "Meias em algodão egípcio mercerizado, pack com 3 pares em tons neutros.", composition: "98% algodão egípcio, 2% elastano.", care: "Lavar à máquina.", tags: ["essentials"] },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);

export const getProductsByCollection = (collectionSlug: string) =>
  products.filter((p) => p.collection === collectionSlug);

export const getProductsByTag = (tag: string) =>
  products.filter((p) => p.tags?.includes(tag));

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
