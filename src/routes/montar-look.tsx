import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "motion/react";
import { generateOutfit } from "@/lib/api/style.functions";
import { getProduct, formatPrice } from "@/data/products";
import { useCart } from "@/stores/cart";

export const Route = createFileRoute("/montar-look")({
  head: () => ({
    meta: [
      { title: "Montar Look — SCORSATTO AI" },
      {
        name: "description",
        content:
          "Escolha a ocasião e a SCORSATTO AI monta um look completo. Compre tudo com um clique.",
      },
      { property: "og:title", content: "Montar Look — SCORSATTO AI" },
      {
        property: "og:description",
        content:
          "Da rotina ao evento: looks completos curados por inteligência artificial.",
      },
    ],
    links: [{ rel: "canonical", href: "/montar-look" }],
  }),
  component: MontarLookPage,
});

type Occasion = "trabalho" | "casual" | "encontro" | "viagem" | "evento";
type Pref = "sobrio" | "neutro" | "ousado";

type Result = Awaited<ReturnType<typeof generateOutfit>>;

const occasions: { v: Occasion; label: string; sub: string }[] = [
  { v: "trabalho", label: "Trabalho", sub: "Reuniões, escritório." },
  { v: "casual", label: "Casual", sub: "Dia a dia, fim de semana." },
  { v: "encontro", label: "Encontro", sub: "Jantar, conversa." },
  { v: "viagem", label: "Viagem", sub: "Conforto com presença." },
  { v: "evento", label: "Evento", sub: "Eventos sociais." },
];

const prefs: { v: Pref; label: string }[] = [
  { v: "sobrio", label: "Sóbrio" },
  { v: "neutro", label: "Neutro" },
  { v: "ousado", label: "Ousado" },
];

function MontarLookPage() {
  const run = useServerFn(generateOutfit);
  const addItem = useCart((s) => s.addItem);

  const [occasion, setOccasion] = useState<Occasion>("trabalho");
  const [pref, setPref] = useState<Pref>("neutro");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const submit = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);
    try {
      const r = await run({ data: { occasion, preference: pref } });
      setResult(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const addLook = () => {
    if (!result) return;
    for (const piece of result.pieces) {
      const p = getProduct(piece.slug);
      if (!p) continue;
      const firstSize = p.sizes.find((s) => (p.stock[s] ?? 0) > 0) ?? p.sizes[0];
      addItem({
        slug: p.slug,
        name: p.name,
        size: firstSize,
        price: p.price,
        image: p.images[0],
      });
    }
  };

  const total = result
    ? result.pieces.reduce(
        (acc, x) => acc + (getProduct(x.slug)?.price ?? 0),
        0,
      )
    : 0;

  return (
    <div className="min-h-screen bg-background pt-24 md:pt-32">
      <div className="mx-auto max-w-[1200px] px-6 pb-24 md:px-10 md:pb-40">
        <p className="eyebrow">Outfit Generator</p>
        <h1 className="mt-4 font-serif text-4xl leading-[1.02] tracking-tight md:text-7xl">
          Montar <em className="font-light italic">look.</em>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Escolha a ocasião. A SCORSATTO AI compõe o look completo —
          coerente, atemporal e pronto para a sacola.
        </p>

        <div className="mt-16">
          <p className="eyebrow">Ocasião</p>
          <div className="mt-4 grid gap-3 md:grid-cols-5">
            {occasions.map((o) => {
              const active = o.v === occasion;
              return (
                <button
                  key={o.v}
                  onClick={() => setOccasion(o.v)}
                  className={`group border p-5 text-left transition-all ${
                    active
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  <p className="font-serif text-xl">{o.label}</p>
                  <p
                    className={`mt-2 text-[11px] uppercase tracking-[0.18em] ${
                      active
                        ? "text-background/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {o.sub}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="mt-10">
            <p className="eyebrow">Tom</p>
            <div className="mt-3 grid max-w-md grid-cols-3 gap-2">
              {prefs.map((p) => {
                const active = p.v === pref;
                return (
                  <button
                    key={p.v}
                    onClick={() => setPref(p.v)}
                    className={`h-12 border text-[11px] uppercase tracking-[0.22em] transition-all ${
                      active
                        ? "border-foreground bg-foreground text-background"
                        : "border-border hover:border-foreground"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {error && <p className="mt-8 text-xs text-olive">{error}</p>}

          <button
            onClick={submit}
            disabled={loading}
            className="mt-12 w-full bg-foreground py-5 text-[11px] font-medium uppercase tracking-[0.32em] text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30 md:w-auto md:px-16"
          >
            {loading ? "Compondo…" : "Gerar look"}
          </button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-24 border-t border-border pt-16"
            >
              <p className="eyebrow">Look composto</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
                {result.name}
              </h2>
              <p className="mt-4 max-w-2xl font-serif italic text-olive md:text-xl">
                "{result.vibe}"
              </p>

              <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-4">
                {result.pieces.map((piece, i) => {
                  const p = getProduct(piece.slug);
                  if (!p) return null;
                  return (
                    <motion.div
                      key={piece.slug + i}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.7,
                        delay: i * 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link to="/produto/$slug" params={{ slug: p.slug }} className="group block">
                        <div className="aspect-[4/5] overflow-hidden bg-bone">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                          />
                        </div>
                        <p className="mt-4 text-[10px] uppercase tracking-[0.22em] text-olive">
                          {piece.role}
                        </p>
                        <p className="mt-2 font-serif text-base link-underline">
                          {p.name}
                        </p>
                        <p className="mt-1 text-sm tabular-nums text-muted-foreground">
                          {formatPrice(p.price)}
                        </p>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-14 flex flex-col items-start gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="eyebrow">Look completo</p>
                  <p className="mt-2 font-serif text-3xl tabular-nums">
                    {formatPrice(total)}
                  </p>
                </div>
                <div className="flex flex-col gap-3 md:flex-row">
                  <button
                    onClick={addLook}
                    className="bg-foreground px-12 py-5 text-[11px] font-medium uppercase tracking-[0.32em] text-background transition-opacity hover:opacity-90"
                  >
                    Comprar look completo
                  </button>
                  <button
                    onClick={submit}
                    disabled={loading}
                    className="border border-border px-12 py-5 text-[11px] uppercase tracking-[0.32em] hover:border-foreground disabled:opacity-30"
                  >
                    Gerar outro
                  </button>
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}