import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import heroImg from "@/assets/hero.jpg";
import lifestyleImg from "@/assets/lifestyle.jpg";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SCORSATTO — O básico, elevado." },
      {
        name: "description",
        content:
          "Peças selecionadas para homens que valorizam qualidade, presença e simplicidade. Moda masculina premium SCORSATTO.",
      },
      { property: "og:title", content: "SCORSATTO — O básico, elevado." },
      {
        property: "og:description",
        content:
          "Peças selecionadas para homens que valorizam qualidade, presença e simplicidade.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [
      { rel: "canonical", href: "/" },
      {
        rel: "preload",
        as: "image",
        href: heroImg,
        fetchpriority: "high",
      } as never,
    ],
  }),
  component: Index,
});

function Index() {
  const featured = products.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-background">
        <motion.img
          src={heroImg}
          alt="Homem usando peças minimalistas SCORSATTO"
          width={1536}
          height={1920}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-90"
          initial={{ scale: 1.06, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.9 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-16 md:px-10 md:pb-24">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="eyebrow text-background/70"
          >
            Outono · Inverno
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 max-w-3xl font-serif text-[12vw] leading-[0.95] tracking-tight text-background md:text-[7vw]"
          >
            O básico,
            <br />
            <em className="font-light italic">elevado.</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="mt-6 max-w-md text-sm leading-relaxed text-background/80"
          >
            Peças selecionadas para homens que valorizam qualidade,
            presença e simplicidade.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-10 flex flex-wrap items-center gap-6"
          >
            <Link
              to="/colecao/$slug"
              params={{ slug: "essentials" }}
              className="bg-background px-8 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-foreground transition-opacity hover:opacity-90"
            >
              Explorar coleção
            </Link>
            <Link
              to="/colecao/$slug"
              params={{ slug: "jaquetas" }}
              className="link-underline text-[11px] font-medium uppercase tracking-[0.22em] text-background"
            >
              Novidades
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Manifesto */}
      <section className="bg-offwhite py-32 md:py-48">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <FadeIn>
            <p className="eyebrow">Manifesto</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="mt-8 font-serif text-4xl leading-[1.05] tracking-tight md:text-7xl">
              Você não precisa
              <br />
              <em className="font-light italic">de tudo.</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <p className="mx-auto mt-10 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              Precisa apenas do essencial. Na SCORSATTO, cada peça é escolhida
              para simplificar suas escolhas e elevar sua presença.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Coleções */}
      <section className="bg-offwhite pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <FadeIn>
            <div className="flex items-end justify-between border-b border-border pb-8">
              <div>
                <p className="eyebrow">Coleções</p>
                <h2 className="mt-3 font-serif text-3xl md:text-5xl">
                  Selecionado pela curadoria.
                </h2>
              </div>
              <Link
                to="/colecao/$slug"
                params={{ slug: "essentials" }}
                className="hidden md:inline-block text-[11px] font-medium uppercase tracking-[0.22em] link-underline"
              >
                Ver tudo
              </Link>
            </div>
          </FadeIn>

          <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-5 md:gap-x-6">
            {collections.map((c, i) => (
              <FadeIn key={c.slug} delay={i * 0.08}>
                <Link
                  to="/colecao/$slug"
                  params={{ slug: c.slug }}
                  className="group block"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-bone">
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-5 font-serif text-lg link-underline">
                    {c.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {c.tagline}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Destaques */}
      <section className="bg-background py-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <FadeIn>
            <div className="flex items-end justify-between border-b border-border pb-8">
              <div>
                <p className="eyebrow">Destaques</p>
                <h2 className="mt-3 font-serif text-3xl md:text-5xl">
                  Para esta estação.
                </h2>
              </div>
            </div>
          </FadeIn>

          <div className="mt-14 grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-3 md:gap-x-8 md:gap-y-20">
            {featured.map((p, i) => (
              <FadeIn key={p.slug} delay={i * 0.05}>
                <ProductCard product={p} />
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lifestyle */}
      <section className="relative h-[100svh] min-h-[600px] overflow-hidden">
        <img
          src={lifestyleImg}
          alt="Homem elegante usando peças SCORSATTO"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-ink/10 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] items-end px-6 pb-20 md:px-10 md:pb-32">
          <FadeIn>
            <div className="max-w-xl text-background">
              <p className="eyebrow text-background/70">Lifestyle</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
                Vista-se para qualquer ocasião.
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-background/80">
                Do trabalho ao final de semana.
                <br />
                Sem excessos. Sem esforço.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Curadoria */}
      <section className="bg-offwhite py-32 md:py-48">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn>
            <p className="eyebrow">Curadoria</p>
          </FadeIn>
          <FadeIn delay={0.15}>
            <h2 className="mt-8 font-serif text-4xl leading-[1.05] tracking-tight md:text-6xl">
              Selecionado pela <em className="font-light italic">SCORSATTO.</em>
            </h2>
          </FadeIn>
          <FadeIn delay={0.3}>
            <div className="mt-12 grid gap-12 md:grid-cols-2">
              <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                Cada peça passa por uma curadoria baseada em qualidade,
                modelagem, versatilidade e sofisticação.
              </p>
              <ul className="space-y-4 text-sm">
                <li className="flex items-baseline gap-4 border-b border-border pb-4">
                  <span className="font-serif text-xl text-olive">01</span>
                  <span>Qualidade dos materiais</span>
                </li>
                <li className="flex items-baseline gap-4 border-b border-border pb-4">
                  <span className="font-serif text-xl text-olive">02</span>
                  <span>Modelagem refinada</span>
                </li>
                <li className="flex items-baseline gap-4 border-b border-border pb-4">
                  <span className="font-serif text-xl text-olive">03</span>
                  <span>Versatilidade absoluta</span>
                </li>
                <li className="flex items-baseline gap-4">
                  <span className="font-serif text-xl text-olive">04</span>
                  <span>Sofisticação atemporal</span>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
