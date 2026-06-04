import { createFileRoute, notFound } from "@tanstack/react-router";
import { getCollection, collections } from "@/data/collections";
import { getProductsByCollection, type Product } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/colecao/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    return { collection, products: getProductsByCollection(params.slug) };
  },
  head: ({ loaderData }) => {
    const name = loaderData?.collection.name ?? "Coleção";
    return {
      meta: [
        { title: `${name} — SCORSATTO` },
        {
          name: "description",
          content: `${name}. ${loaderData?.collection.tagline ?? ""} Curadoria SCORSATTO.`,
        },
        { property: "og:title", content: `${name} — SCORSATTO` },
        {
          property: "og:description",
          content: loaderData?.collection.tagline ?? "",
        },
        { property: "og:image", content: loaderData?.collection.image ?? "" },
      ],
      links: [
        { rel: "canonical", href: `/colecao/${loaderData?.collection.slug}` },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <div>
        <p className="eyebrow">404</p>
        <h1 className="mt-4 font-serif text-4xl">Coleção não encontrada.</h1>
      </div>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="flex min-h-screen items-center justify-center px-6 text-center">
      <p className="text-sm text-muted-foreground">{error.message}</p>
    </div>
  ),
  component: CollectionPage,
});

function CollectionPage() {
  const { collection, products } = Route.useLoaderData() as {
    collection: (typeof collections)[number];
    products: Product[];
  };

  return (
    <>
      {/* Header */}
      <section className="relative pt-32 md:pt-40">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <FadeIn>
            <nav className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              SCORSATTO · {collection.name}
            </nav>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="mt-6 font-serif text-5xl leading-none md:text-8xl">
              {collection.name}
            </h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="mt-6 max-w-md text-base text-muted-foreground">
              {collection.tagline}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Products */}
      <section className="pt-20 pb-32">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          {products.length === 0 ? (
            <p className="py-32 text-center text-sm text-muted-foreground">
              Nenhuma peça disponível nesta coleção no momento.
            </p>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-3 md:gap-x-8 md:gap-y-20">
              {products.map((p, i) => (
                <FadeIn key={p.slug} delay={i * 0.05}>
                  <ProductCard product={p} />
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Other collections */}
      <section className="border-t border-border bg-bone py-20">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          <p className="eyebrow">Outras coleções</p>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {collections
              .filter((c) => c.slug !== collection.slug)
              .map((c) => (
                <a
                  key={c.slug}
                  href={`/colecao/${c.slug}`}
                  className="font-serif text-2xl link-underline md:text-3xl"
                >
                  {c.name}
                </a>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}