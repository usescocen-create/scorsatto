import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import {
  getProduct,
  getRelatedProducts,
  formatPrice,
} from "@/data/products";
import { useCart } from "@/stores/cart";
import { ProductCard } from "@/components/ProductCard";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product, related: getRelatedProducts(params.slug) };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return { meta: [{ title: "Produto — SCORSATTO" }] };
    return {
      meta: [
        { title: `${p.name} — SCORSATTO` },
        { name: "description", content: p.shortDescription },
        { property: "og:title", content: `${p.name} — SCORSATTO` },
        { property: "og:description", content: p.shortDescription },
        { property: "og:type", content: "product" },
        { property: "og:image", content: p.images[0] },
      ],
      links: [{ rel: "canonical", href: `/produto/${p.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: p.name,
            description: p.description,
            image: p.images,
            brand: { "@type": "Brand", name: "SCORSATTO" },
            offers: {
              "@type": "Offer",
              priceCurrency: "BRL",
              price: p.price.toFixed(2),
              availability: "https://schema.org/InStock",
            },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-serif text-4xl">Peça não encontrada.</h1>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <p className="text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product, related } = Route.useLoaderData();
  const addItem = useCart((s) => s.addItem);
  const [size, setSize] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<string | null>("composition");

  const handleAdd = () => {
    if (!size) return;
    addItem({
      slug: product.slug,
      name: product.name,
      size,
      price: product.price,
      image: product.images[0],
    });
  };

  return (
    <>
      <div className="pt-20 md:pt-24">
        <div className="mx-auto grid max-w-[1600px] gap-10 px-6 md:grid-cols-12 md:gap-12 md:px-10">
          {/* Gallery */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="grid gap-4">
              {product.images.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 1,
                    delay: i * 0.15,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="aspect-[4/5] overflow-hidden bg-bone"
                >
                  <img
                    src={img}
                    alt={`${product.name} — vista ${i + 1}`}
                    width={1200}
                    height={1500}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-28">
              <nav className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                <Link
                  to="/colecao/$slug"
                  params={{ slug: product.collection }}
                  className="link-underline"
                >
                  {product.collection}
                </Link>
              </nav>
              <h1 className="mt-4 font-serif text-3xl leading-tight md:text-4xl">
                {product.name}
              </h1>
              <p className="mt-4 text-xl tabular-nums">
                {formatPrice(product.price)}
              </p>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Sizes */}
              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <p className="eyebrow">Tamanho</p>
                  <button className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground">
                    Guia
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {product.sizes.map((s) => {
                    const stock = product.stock[s] ?? 0;
                    const disabled = stock === 0;
                    const selected = s === size;
                    return (
                      <button
                        key={s}
                        disabled={disabled}
                        onClick={() => setSize(s)}
                        className={`flex h-12 items-center justify-center border text-sm transition-all ${
                          selected
                            ? "border-foreground bg-foreground text-background"
                            : disabled
                            ? "border-border text-muted-foreground/40 line-through cursor-not-allowed"
                            : "border-border text-foreground hover:border-foreground"
                        }`}
                      >
                        {s}
                      </button>
                    );
                  })}
                </div>
                {size && (product.stock[size] ?? 0) > 0 && (product.stock[size] ?? 0) <= 3 && (
                  <p className="mt-3 text-xs text-olive">
                    Últimas peças disponíveis.
                  </p>
                )}
              </div>

              <button
                onClick={handleAdd}
                disabled={!size}
                className="mt-8 w-full bg-foreground py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
              >
                {size ? "Adicionar à sacola" : "Selecione um tamanho"}
              </button>

              <div className="mt-8 border-y border-border py-5">
                <p className="text-[11px] uppercase tracking-[0.22em] text-olive">
                  ✦ Selecionado pela curadoria SCORSATTO
                </p>
              </div>

              {/* Accordions */}
              <div className="mt-2">
                {[
                  { key: "composition", label: "Composição", value: product.composition },
                  { key: "care", label: "Cuidados", value: product.care },
                  {
                    key: "delivery",
                    label: "Entrega",
                    value: "Envio em até 48 horas úteis. Trocas gratuitas em até 30 dias.",
                  },
                ].map((s) => {
                  const open = openSection === s.key;
                  return (
                    <div key={s.key} className="border-b border-border">
                      <button
                        onClick={() => setOpenSection(open ? null : s.key)}
                        className="flex w-full items-center justify-between py-5 text-left"
                      >
                        <span className="text-[11px] uppercase tracking-[0.22em]">
                          {s.label}
                        </span>
                        <span className="text-lg">{open ? "−" : "+"}</span>
                      </button>
                      {open && (
                        <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                          {s.value}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-32 py-20">
          <div className="mx-auto max-w-[1600px] px-6 md:px-10">
            <FadeIn>
              <h2 className="font-serif text-2xl md:text-3xl">Combine com.</h2>
            </FadeIn>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
              {related.map((p, i) => (
                <FadeIn key={p.slug} delay={i * 0.05}>
                  <ProductCard product={p} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}