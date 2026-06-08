import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { products, getProduct, formatPrice } from "@/data/products";
import { useCart } from "@/stores/cart";

export const Route = createFileRoute("/consultor")({
  head: () => ({
    meta: [
      { title: "Consultor de Estilo — SCORSATTO" },
      { name: "description", content: "Descubra seu tamanho ideal e receba sugestões de combinações sob medida." },
      { property: "og:title", content: "Consultor de Estilo — SCORSATTO" },
      { property: "og:description", content: "Tamanho ideal e combinação certa para você." },
    ],
    links: [{ rel: "canonical", href: "/consultor" }],
  }),
  component: ConsultorPage,
});

type Occasion = "trabalho" | "casual" | "encontro" | "evento";

function recommendSize(h: number, w: number): { tops: string; bottoms: string } {
  const bmi = w / Math.pow(h / 100, 2);
  let tops = "M";
  if (bmi < 19) tops = "P";
  else if (bmi < 24) tops = "M";
  else if (bmi < 28) tops = "G";
  else tops = "GG";
  // bottoms — rough waist mapping by weight
  let bottoms = "42";
  if (w < 60) bottoms = "38";
  else if (w < 70) bottoms = "40";
  else if (w < 80) bottoms = "42";
  else if (w < 90) bottoms = "44";
  else bottoms = "46";
  return { tops, bottoms };
}

function recommendLook(occasion: Occasion): string[] {
  const map: Record<Occasion, string[]> = {
    trabalho: ["camisa-oxford-branca", "calca-alfaiataria-grafite", "mocassim-couro-preto", "cinto-couro-preto"],
    casual: ["camiseta-essencial-preta", "calca-chino-preta", "tenis-minimalista-branco"],
    encontro: ["polo-pique-preta", "calca-alfaiataria-grafite", "tenis-minimalista-branco"],
    evento: ["camisa-social-premium", "calca-alfaiataria-grafite", "mocassim-couro-preto", "cinto-couro-preto"],
  };
  return map[occasion];
}

function ConsultorPage() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [occasion, setOccasion] = useState<Occasion>("trabalho");
  const [submitted, setSubmitted] = useState(false);
  const addItem = useCart((s) => s.addItem);

  const valid =
    Number(height) >= 140 && Number(height) <= 220 &&
    Number(weight) >= 40 && Number(weight) <= 200 &&
    Number(age) >= 16 && Number(age) <= 95;

  const sizing = useMemo(
    () => valid ? recommendSize(Number(height), Number(weight)) : null,
    [height, weight, valid],
  );

  const lookSlugs = useMemo(() => recommendLook(occasion), [occasion]);
  const lookProducts = lookSlugs.map(getProduct).filter(Boolean);

  const addLook = () => {
    if (!sizing) return;
    for (const p of lookProducts) {
      if (!p) continue;
      const isTop = ["camisetas","polos","camisas","tricots","moletons","jaquetas"].includes(p.collection);
      const isBottom = ["calcas","bermudas"].includes(p.collection);
      const desired = isTop ? sizing.tops : isBottom ? sizing.bottoms : p.sizes[0];
      const size = p.sizes.includes(desired) && (p.stock[desired] ?? 0) > 0
        ? desired
        : p.sizes.find((s) => (p.stock[s] ?? 0) > 0) ?? p.sizes[0];
      addItem({
        slug: p.slug, name: p.name, size, price: p.price, image: p.images[0],
      });
    }
  };

  return (
    <div className="min-h-screen bg-offwhite pt-24 md:pt-32">
      <div className="mx-auto max-w-[1200px] px-6 pb-24 md:px-10 md:pb-40">
        <p className="eyebrow">Consultor de Estilo</p>
        <h1 className="mt-4 font-serif text-4xl leading-[1.02] tracking-tight md:text-7xl">
          Seu tamanho. <em className="font-light italic">Sua ocasião.</em>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Quatro perguntas. Nossa consultoria sugere o tamanho ideal e uma
          combinação pronta para você.
        </p>

        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-16 grid gap-12 md:grid-cols-2"
            >
              <div className="space-y-10">
                <label className="block">
                  <span className="eyebrow">Altura (cm)</span>
                  <input
                    inputMode="numeric"
                    value={height}
                    onChange={(e) => setHeight(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    placeholder="178"
                    className="serif-input mt-3"
                  />
                </label>
                <label className="block">
                  <span className="eyebrow">Peso (kg)</span>
                  <input
                    inputMode="numeric"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value.replace(/\D/g, "").slice(0, 3))}
                    placeholder="76"
                    className="serif-input mt-3"
                  />
                </label>
                <label className="block">
                  <span className="eyebrow">Idade</span>
                  <input
                    inputMode="numeric"
                    value={age}
                    onChange={(e) => setAge(e.target.value.replace(/\D/g, "").slice(0, 2))}
                    placeholder="32"
                    className="serif-input mt-3"
                  />
                </label>
              </div>

              <div>
                <p className="eyebrow">Ocasião</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {(["trabalho","casual","encontro","evento"] as Occasion[]).map((o) => {
                    const active = occasion === o;
                    return (
                      <button
                        key={o}
                        onClick={() => setOccasion(o)}
                        className={`h-14 border text-[11px] uppercase tracking-[0.22em] transition-all ${
                          active ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground"
                        }`}
                      >
                        {o}
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={!valid}
                  onClick={() => setSubmitted(true)}
                  className="mt-12 w-full bg-foreground py-5 text-[11px] uppercase tracking-[0.32em] text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  Receber recomendação
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="r"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-16"
            >
              <p className="eyebrow">Seu tamanho ideal foi encontrado</p>
              <div className="mt-8 grid gap-8 border-y border-border py-10 md:grid-cols-2">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Camisetas, polos, camisas, tricots, moletons, jaquetas</p>
                  <p className="mt-3 font-serif text-6xl">{sizing!.tops}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Calças e bermudas</p>
                  <p className="mt-3 font-serif text-6xl">{sizing!.bottoms}</p>
                </div>
              </div>

              <div className="mt-16">
                <p className="eyebrow">Combinação para {occasion}</p>
                <div className="mt-10 grid gap-x-6 gap-y-12 md:grid-cols-4">
                  {lookProducts.map((p, i) => p && (
                    <motion.div
                      key={p.slug}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7, delay: i * 0.1 }}
                    >
                      <Link to="/produto/$slug" params={{ slug: p.slug }} className="group block">
                        <div className="aspect-[4/5] overflow-hidden bg-bone">
                          <img src={p.images[0]} alt={p.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]" />
                        </div>
                        <p className="mt-4 font-serif text-base link-underline">{p.name}</p>
                        <p className="mt-1 text-sm tabular-nums text-muted-foreground">{formatPrice(p.price)}</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-16 flex flex-col gap-3 md:flex-row">
                <button onClick={addLook} className="bg-foreground px-12 py-5 text-[11px] uppercase tracking-[0.32em] text-background">
                  Adicionar ao Carrinho
                </button>
                <button onClick={() => setSubmitted(false)} className="border border-border px-12 py-5 text-[11px] uppercase tracking-[0.32em] hover:border-foreground">
                  Refazer análise
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
