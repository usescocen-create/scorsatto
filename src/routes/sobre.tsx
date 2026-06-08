import { createFileRoute } from "@tanstack/react-router";
import { FadeIn } from "@/components/FadeIn";
import lifestyleImg from "@/assets/lifestyle.jpg";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — SCORSATTO" },
      { name: "description", content: "Menos excesso. Mais essência. Conheça a essência, missão e curadoria da SCORSATTO." },
      { property: "og:title", content: "Sobre — SCORSATTO" },
      { property: "og:description", content: "Menos excesso. Mais essência. Curadoria SCORSATTO." },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: SobrePage,
});

const valores = ["Qualidade", "Elegância", "Simplicidade", "Transparência", "Confiança", "Evolução"];
const curadoriaChecks = ["Qualidade do tecido", "Acabamento", "Caimento", "Conforto", "Durabilidade", "Versatilidade"];
const diferenciais = [
  { t: "Curadoria Premium", d: "Cada peça selecionada manualmente." },
  { t: "Atendimento Exclusivo", d: "Suporte direto, conversa real." },
  { t: "Produtos Selecionados", d: "Apenas o que merece ficar." },
  { t: "Compra Segura", d: "Pagamento protegido, dados criptografados." },
  { t: "Entrega para Todo o Brasil", d: "Logística cuidadosa, prazos cumpridos." },
  { t: "Qualidade Acima de Tendências", d: "Peças que atravessam estações." },
];

export default function SobrePage() {
  return (
    <div className="bg-offwhite">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <p className="eyebrow">Sobre nós</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h1 className="mt-8 font-serif text-5xl leading-[1.02] tracking-tight md:text-8xl">
              Menos excesso.
              <br />
              <em className="font-light italic">Mais essência.</em>
            </h1>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              A SCORSATTO nasceu da busca por peças que realmente valem a pena.
              Acreditamos que elegância não está no exagero, mas na escolha certa.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Imagem manifesto */}
      <section className="relative h-[60svh] overflow-hidden">
        <img src={heroImg} alt="Curadoria SCORSATTO" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-ink/30" />
      </section>

      {/* Texto longo */}
      <section className="py-32 md:py-40">
        <div className="mx-auto grid max-w-5xl gap-16 px-6 md:grid-cols-2">
          <FadeIn>
            <p className="eyebrow">Nossa essência</p>
            <h2 className="mt-4 font-serif text-4xl leading-tight md:text-5xl">
              O essencial, <em className="font-light italic">bem feito.</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Selecionamos roupas com foco em qualidade, conforto, versatilidade e
              durabilidade. Nosso objetivo é simplificar o guarda-roupa masculino
              através de uma curadoria inteligente, reunindo peças que permanecem
              relevantes independentemente das tendências.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Curadoria */}
      <section className="bg-ink py-32 text-background md:py-44">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="eyebrow text-background/60">Curadoria</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="mt-6 font-serif text-4xl leading-[1.05] md:text-6xl">
              Cada peça precisa <em className="font-light italic">merecer</em>
              <br /> estar aqui.
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-background/70 md:text-lg">
              Não escolhemos produtos apenas pela aparência. Cada peça é analisada
              considerando:
            </p>
          </FadeIn>
          <div className="mt-14 grid grid-cols-1 gap-px bg-background/10 md:grid-cols-3">
            {curadoriaChecks.map((c, i) => (
              <FadeIn key={c} delay={i * 0.05}>
                <div className="bg-ink p-8">
                  <p className="text-olive">✓</p>
                  <p className="mt-3 font-serif text-2xl">{c}</p>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.4}>
            <p className="mt-14 font-serif text-2xl italic text-olive md:text-3xl">
              "Vendemos apenas produtos que usaríamos em nosso próprio dia a dia."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Missão / Visão / Valores */}
      <section className="py-32 md:py-44">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 md:grid-cols-2">
            <FadeIn>
              <p className="eyebrow">Missão</p>
              <p className="mt-6 font-serif text-3xl leading-snug md:text-4xl">
                Elevar o vestuário masculino através de peças selecionadas que unem
                qualidade, simplicidade e sofisticação.
              </p>
            </FadeIn>
            <FadeIn delay={0.15}>
              <p className="eyebrow">Visão</p>
              <p className="mt-6 font-serif text-3xl leading-snug md:text-4xl">
                Ser referência nacional em curadoria de moda masculina premium.
              </p>
            </FadeIn>
          </div>

          <div className="mt-24 border-t border-border pt-16">
            <FadeIn>
              <p className="eyebrow">Valores</p>
            </FadeIn>
            <div className="mt-10 grid grid-cols-2 gap-y-6 md:grid-cols-3 md:gap-y-10">
              {valores.map((v, i) => (
                <FadeIn key={v} delay={i * 0.05}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-serif text-xl text-olive">0{i + 1}</span>
                    <span className="font-serif text-2xl md:text-3xl">{v}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="bg-bone py-32">
        <div className="mx-auto max-w-6xl px-6">
          <FadeIn>
            <p className="eyebrow">Diferenciais</p>
            <h2 className="mt-4 font-serif text-4xl md:text-6xl">
              Por que a SCORSATTO.
            </h2>
          </FadeIn>
          <div className="mt-16 grid gap-px bg-border md:grid-cols-3">
            {diferenciais.map((d, i) => (
              <FadeIn key={d.t} delay={i * 0.05}>
                <div className="bg-offwhite p-8 md:p-10 min-h-full">
                  <p className="text-olive">✓</p>
                  <h3 className="mt-4 font-serif text-2xl">{d.t}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Imagem encerramento */}
      <section className="relative h-[60svh] overflow-hidden">
        <img src={lifestyleImg} alt="Lifestyle SCORSATTO" loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 to-transparent">
          <div className="mx-auto w-full max-w-5xl px-6 pb-16 text-background md:pb-24">
            <FadeIn>
              <p className="font-serif text-3xl italic md:text-5xl">
                "Qualidade acima de tendências."
              </p>
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
