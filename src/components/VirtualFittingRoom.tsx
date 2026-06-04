import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useServerFn } from "@tanstack/react-start";
import { recommendSize } from "@/lib/api/fit.functions";
import { useCart } from "@/stores/cart";
import type { Product } from "@/data/products";

type Props = {
  product: Product;
  open: boolean;
  onClose: () => void;
};

type Result = Awaited<ReturnType<typeof recommendSize>>;

type BodyType = "magro" | "atletico" | "medio" | "robusto";
type FitPref = "ajustado" | "regular" | "oversized";

const bodyTypes: { value: BodyType; label: string }[] = [
  { value: "magro", label: "Magro" },
  { value: "atletico", label: "Atlético" },
  { value: "medio", label: "Médio" },
  { value: "robusto", label: "Robusto" },
];

const fitPrefs: { value: FitPref; label: string }[] = [
  { value: "ajustado", label: "Ajustado" },
  { value: "regular", label: "Regular" },
  { value: "oversized", label: "Oversized" },
];

function FitBar({ label, value }: { label: string; value: string }) {
  // Map to a 0-100 scale around "perfeito"
  const map: Record<string, number> = {
    justo: 25,
    curto: 25,
    perfeito: 50,
    folgado: 75,
    longo: 75,
  };
  const pos = map[value] ?? 50;
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {label}
        </span>
        <span className="text-[11px] uppercase tracking-[0.18em]">{value}</span>
      </div>
      <div className="relative mt-2 h-[2px] bg-border">
        <motion.div
          initial={{ left: "50%", opacity: 0 }}
          animate={{ left: `${pos}%`, opacity: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground"
        />
      </div>
    </div>
  );
}

export function VirtualFittingRoom({ product, open, onClose }: Props) {
  const call = useServerFn(recommendSize);
  const addItem = useCart((s) => s.addItem);

  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [bodyType, setBodyType] = useState<BodyType>("medio");
  const [fitPref, setFitPref] = useState<FitPref>("regular");
  const [photo, setPhoto] = useState<string | null>(null);
  const [photoAnalyzed, setPhotoAnalyzed] = useState(false);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      // reset on close (after exit anim)
      const t = setTimeout(() => {
        setResult(null);
        setError(null);
        setPhoto(null);
        setPhotoAnalyzed(false);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handlePhoto = (file: File) => {
    if (file.size > 4_000_000) {
      setError("Imagem muito grande. Máximo 4MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setPhoto(reader.result as string);
      setPhotoAnalyzed(true);
    };
    reader.readAsDataURL(file);
  };

  const valid =
    Number(height) >= 100 &&
    Number(height) <= 230 &&
    Number(weight) >= 35 &&
    Number(weight) <= 220 &&
    Number(age) >= 14 &&
    Number(age) <= 95;

  const submit = async () => {
    if (!valid || loading) return;
    setLoading(true);
    setError(null);
    try {
      const r = await call({
        data: {
          product: {
            name: product.name,
            category: product.collection,
            sizes: product.sizes,
          },
          profile: {
            height: Number(height),
            weight: Number(weight),
            age: Number(age),
            bodyType,
            fitPreference: fitPref,
            photoDataUrl: photo ?? undefined,
          },
        },
      });
      setResult(r);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro inesperado.");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = () => {
    if (!result) return;
    addItem({
      slug: product.slug,
      name: product.name,
      size: result.recommendedSize,
      price: product.price,
      image: product.images[0],
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] bg-background"
          role="dialog"
          aria-modal="true"
          aria-label="Provador Virtual"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-border px-6 py-5 md:px-10">
            <p className="text-[11px] uppercase tracking-[0.32em]">
              Provador Virtual
            </p>
            <button
              onClick={onClose}
              className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
              aria-label="Fechar"
            >
              Fechar ✕
            </button>
          </div>

          <div className="mx-auto h-[calc(100vh-64px)] max-w-[1100px] overflow-y-auto px-6 py-10 md:px-10 md:py-16">
            <AnimatePresence mode="wait">
              {!result ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="eyebrow">Análise SCORSATTO</p>
                  <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
                    Descubra seu caimento ideal.
                  </h2>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    Nossa inteligência cruza suas medidas com a modelagem desta peça
                    para indicar o tamanho com maior precisão.
                  </p>

                  <div className="mt-12 grid gap-10 md:grid-cols-2">
                    {/* Measurements */}
                    <div className="space-y-6">
                      <Field label="Altura (cm)">
                        <input
                          inputMode="numeric"
                          value={height}
                          onChange={(e) => setHeight(e.target.value.replace(/\D/g, "").slice(0, 3))}
                          placeholder="178"
                          className="w-full border-0 border-b border-border bg-transparent pb-3 font-serif text-3xl outline-none focus:border-foreground"
                        />
                      </Field>
                      <Field label="Peso (kg)">
                        <input
                          inputMode="numeric"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value.replace(/\D/g, "").slice(0, 3))}
                          placeholder="76"
                          className="w-full border-0 border-b border-border bg-transparent pb-3 font-serif text-3xl outline-none focus:border-foreground"
                        />
                      </Field>
                      <Field label="Idade">
                        <input
                          inputMode="numeric"
                          value={age}
                          onChange={(e) => setAge(e.target.value.replace(/\D/g, "").slice(0, 2))}
                          placeholder="32"
                          className="w-full border-0 border-b border-border bg-transparent pb-3 font-serif text-3xl outline-none focus:border-foreground"
                        />
                      </Field>
                    </div>

                    {/* Preferences */}
                    <div className="space-y-8">
                      <div>
                        <p className="eyebrow">Tipo físico</p>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                          {bodyTypes.map((b) => (
                            <ChipButton
                              key={b.value}
                              active={bodyType === b.value}
                              onClick={() => setBodyType(b.value)}
                            >
                              {b.label}
                            </ChipButton>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="eyebrow">Preferência de caimento</p>
                        <div className="mt-3 grid grid-cols-3 gap-2">
                          {fitPrefs.map((f) => (
                            <ChipButton
                              key={f.value}
                              active={fitPref === f.value}
                              onClick={() => setFitPref(f.value)}
                            >
                              {f.label}
                            </ChipButton>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="eyebrow">Foto (opcional)</p>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Para análise refinada de proporções.
                        </p>
                        <input
                          ref={fileRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) handlePhoto(f);
                          }}
                        />
                        <button
                          onClick={() => fileRef.current?.click()}
                          className="mt-3 w-full border border-border py-3 text-[11px] uppercase tracking-[0.22em] hover:border-foreground"
                        >
                          {photoAnalyzed ? "Análise concluída ✓" : "Enviar foto"}
                        </button>
                      </div>
                    </div>
                  </div>

                  {error && (
                    <p className="mt-8 text-xs text-olive">{error}</p>
                  )}

                  <button
                    disabled={!valid || loading}
                    onClick={submit}
                    className="mt-12 w-full bg-foreground py-5 text-[11px] font-medium uppercase tracking-[0.32em] text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30 md:w-auto md:px-16"
                  >
                    {loading ? "Analisando…" : "Calcular meu tamanho"}
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="eyebrow">Seu tamanho ideal foi encontrado</p>
                  <div className="mt-6 flex items-end gap-8">
                    <div className="font-serif text-[120px] leading-none md:text-[180px]">
                      {result.recommendedSize}
                    </div>
                    <div className="pb-4">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                        Confiança
                      </p>
                      <p className="mt-1 font-serif text-3xl">
                        {Math.round(result.confidence)}%
                      </p>
                    </div>
                  </div>

                  <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {result.explanation}
                  </p>

                  <div className="mt-12 border-t border-border pt-10">
                    <p className="eyebrow">Caimento estimado</p>
                    <div className="mt-6 grid gap-6 md:grid-cols-2 md:gap-x-12">
                      <FitBar label="Ombros" value={result.fit.shoulders} />
                      <FitBar label="Tórax" value={result.fit.chest} />
                      <FitBar label="Cintura" value={result.fit.waist} />
                      <FitBar label="Comprimento" value={result.fit.length} />
                    </div>
                  </div>

                  <div className="mt-14 flex flex-col gap-3 md:flex-row">
                    <button
                      onClick={addToCart}
                      className="bg-foreground px-12 py-5 text-[11px] font-medium uppercase tracking-[0.32em] text-background transition-opacity hover:opacity-90"
                    >
                      Adicionar ao carrinho
                    </button>
                    <button
                      onClick={() => {
                        setResult(null);
                      }}
                      className="border border-border px-12 py-5 text-[11px] uppercase tracking-[0.32em] hover:border-foreground"
                    >
                      Refazer análise
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
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

function ChipButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-12 border text-[11px] uppercase tracking-[0.22em] transition-all ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border hover:border-foreground"
      }`}
    >
      {children}
    </button>
  );
}