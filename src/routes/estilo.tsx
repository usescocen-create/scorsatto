import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { AnimatePresence, motion } from "motion/react";
import { analyzeStyle } from "@/lib/api/style.functions";
import { getProduct, formatPrice } from "@/data/products";
import { useCart } from "@/stores/cart";

export const Route = createFileRoute("/estilo")({
  head: () => ({
    meta: [
      { title: "SCORSATTO AI — Descubra seu estilo." },
      {
        name: "description",
        content:
          "Inteligência artificial que identifica seu perfil de estilo e monta uma cápsula sob medida no universo SCORSATTO.",
      },
      { property: "og:title", content: "SCORSATTO AI — Descubra seu estilo." },
      {
        property: "og:description",
        content:
          "Identifique seu perfil de estilo e receba uma cápsula curada com inteligência SCORSATTO.",
      },
    ],
    links: [{ rel: "canonical", href: "/estilo" }],
  }),
  component: EstiloPage,
});

type Style = "classico" | "minimalista" | "casual-elevado" | "moderno" | "old-money";
type Budget = "essencial" | "intermediario" | "premium" | "ilimitado";
type Occasion = "trabalho" | "casual" | "encontro" | "viagem" | "evento";

type Result = Awaited<ReturnType<typeof analyzeStyle>>;

const styles: { v: Style; label: string }[] = [
  { v: "classico", label: "Clássico" },
  { v: "minimalista", label: "Minimalista" },
  { v: "casual-elevado", label: "Casual elevado" },
  { v: "moderno", label: "Moderno" },
  { v: "old-money", label: "Old Money" },
];

const budgets: { v: Budget; label: string }[] = [
  { v: "essencial", label: "Essencial" },
  { v: "intermediario", label: "Intermediário" },
  { v: "premium", label: "Premium" },
  { v: "ilimitado", label: "Sem limites" },
];

const occasions: { v: Occasion; label: string }[] = [
  { v: "trabalho", label: "Trabalho" },
  { v: "casual", label: "Casual" },
  { v: "encontro", label: "Encontro" },
  { v: "viagem", label: "Viagem" },
  { v: "evento", label: "Evento" },
];

function EstiloPage() {
  const run = useServerFn(analyzeStyle);
  const addItem = useCart((s) => s.addItem);

  const [age, setAge] = useState("");
  const [profession, setProfession] = useState("");
  const [style, setStyle] = useState<Style>("minimalista");
  const [budget, setBudget] = useState<Budget>("intermediario");
  const [occasion, setOccasion] = useState<Occasion>("trabalho");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<Result | null>(null);

  const valid =
    Number(age) >= 16 && Number(age) <= 95 && profession.trim().length >= 2;

  const submit = async () => {
    if (!valid || loading) return;
    setLoading(true);
    setError(null);
    try {
      const r = await run({
        data: {
          age: Number(age),
          profession: profession.trim().slice(0, 80),
          desiredStyle: style,
          budget,
          occasion,
        },
      });
      setResult(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const addCapsule = () => {
    if (!result) return;
    for (const item of result.capsule) {
      const p = getProduct(item.slug);
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

  return (
    <div className="min-h-screen bg-offwhite pt-24 md:pt-32">
      <div className="mx-auto max-w-[1200px] px-6 pb-24 md:px-10 md:pb-40">
        <p className="eyebrow">SCORSATTO AI</p>
        <h1 className="mt-4 font-serif text-4xl leading-[1.02] tracking-tight md:text-7xl">
          Descubra seu <em className="font-light italic">estilo.</em>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
          Cinco perguntas. Nossa inteligência traduz suas respostas em um perfil
          de estilo e uma cápsula curada do universo SCORSATTO.
        </p>

        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16 grid gap-12 md:grid-cols-2"
            >
              <div className="space-y-10">
                <Field label="Idade">
                  <input
                    inputMode="numeric"
                    value={age}
                    onChange={(e) =>
                      setAge(e.target.value.replace(/\D/g, "").slice(0, 2))
                    }
                    placeholder="32"
                    className="serif-input"
                  />
                </Field>
                <Field label="Profissão">
                  <input
                    type="text"
                    value={profession}
                    onChange={(e) =>
                      setProfession(e.target.value.slice(0, 80))
                    }
                    placeholder="Arquiteto, advogado, founder…"
                    className="serif-input"
                  />
                </Field>
              </div>

              <div className="space-y-10">
                <ChipGroup
                  label="Estilo desejado"
                  options={styles}
                  value={style}
                  onChange={setStyle}
                  cols={2}
                />
                <ChipGroup
                  label="Orçamento"
                  options={budgets}
                  value={budget}
                  onChange={setBudget}
                  cols={2}
                />
                <ChipGroup
                  label="Ocasião principal"
                  options={occasions}
                  value={occasion}
                  onChange={setOccasion}
                  cols={3}
                />
              </div>

              <div className="md:col-span-2">
                {error && (
                  <p className="mb-6 text-xs text-olive">{error}</p>
                )}
                <button
                  onClick={submit}
                  disabled={!valid || loading}
                  className="w-full bg-foreground py-5 text-[11px] font-medium uppercase tracking-[0.32em] text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30 md:w-auto md:px-16"
                >
                  {loading ? "Analisando…" : "Identificar meu estilo"}
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-16"
            >
              <p className="eyebrow">Seu estilo foi identificado</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight md:text-6xl">
                {result.styleName}
              </h2>
              <p className="mt-4 max-w-2xl font-serif text-lg italic text-olive md:text-2xl">
                "{result.tagline}"
              </p>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
                {result.description}
              </p>

              <div className="mt-16 border-t border-border pt-12">
                <p className="eyebrow">Sua cápsula curada</p>
                <div className="mt-10 grid gap-x-6 gap-y-14 md:grid-cols-3">
                  {result.capsule.map((item, i) => {
                    const p = getProduct(item.slug);
                    if (!p) return null;
                    return (
                      <motion.div
                        key={item.slug + i}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.8,
                          delay: i * 0.1,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <Link
                          to="/produto/$slug"
                          params={{ slug: p.slug }}
                          className="group block"
                        >
                          <div className="aspect-[4/5] overflow-hidden bg-bone">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-[1.04]"
                            />
                          </div>
                          <p className="mt-5 font-serif text-lg link-underline">
                            {p.name}
                          </p>
                          <p className="mt-1 text-sm tabular-nums text-muted-foreground">
                            {formatPrice(p.price)}
                          </p>
                        </Link>
                        <p className="mt-3 border-l border-olive pl-3 text-xs leading-relaxed text-muted-foreground">
                          {item.reason}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-16 flex flex-col gap-3 md:flex-row">
                <button
                  onClick={addCapsule}
                  className="bg-foreground px-12 py-5 text-[11px] font-medium uppercase tracking-[0.32em] text-background transition-opacity hover:opacity-90"
                >
                  Adicionar cápsula completa
                </button>
                <button
                  onClick={() => setResult(null)}
                  className="border border-border px-12 py-5 text-[11px] uppercase tracking-[0.32em] hover:border-foreground"
                >
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow">{label}</span>
      <div className="mt-3">{children}</div>
    </label>
  );
}

function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  cols,
}: {
  label: string;
  options: { v: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  cols: number;
}) {
  return (
    <div>
      <p className="eyebrow">{label}</p>
      <div
        className="mt-3 grid gap-2"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))` }}
      >
        {options.map((o) => {
          const active = o.v === value;
          return (
            <button
              key={o.v}
              onClick={() => onChange(o.v)}
              className={`h-12 border text-[11px] uppercase tracking-[0.22em] transition-all ${
                active
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}