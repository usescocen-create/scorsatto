import { createFileRoute, Link } from "@tanstack/react-router";
import { useWishlist } from "@/stores/wishlist";
import { products, getProduct } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { FadeIn } from "@/components/FadeIn";

export const Route = createFileRoute("/favoritos")({
  head: () => ({
    meta: [
      { title: "Lista de Desejos — SCORSATTO" },
      { name: "description", content: "Suas peças favoritas e produtos vistos recentemente." },
      { property: "og:title", content: "Lista de Desejos — SCORSATTO" },
      { property: "og:description", content: "Suas peças favoritas SCORSATTO." },
    ],
    links: [{ rel: "canonical", href: "/favoritos" }],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const favorites = useWishlist((s) => s.favorites);
  const viewed = useWishlist((s) => s.viewed);

  const favProducts = favorites.map((s) => getProduct(s)).filter(Boolean);
  const viewedProducts = viewed
    .filter((s) => !favorites.includes(s))
    .map((s) => getProduct(s))
    .filter(Boolean);
  const recommended = products
    .filter((p) => !favorites.includes(p.slug) && !viewed.includes(p.slug))
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-offwhite pt-28 md:pt-36">
      <div className="mx-auto max-w-[1600px] px-6 pb-32 md:px-10">
        <FadeIn>
          <p className="eyebrow">Lista de Desejos</p>
          <h1 className="mt-4 font-serif text-5xl leading-none md:text-8xl">
            Favoritos.
          </h1>
        </FadeIn>

        <section className="mt-20">
          {favProducts.length === 0 ? (
            <div className="border-y border-border py-20 text-center">
              <p className="font-serif text-2xl md:text-3xl">Sua lista ainda está vazia.</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Toque no símbolo ✦ em qualquer peça para guardá-la aqui.
              </p>
              <Link
                to="/colecao/$slug"
                params={{ slug: "essentials" }}
                className="mt-10 inline-block bg-foreground px-10 py-4 text-[11px] uppercase tracking-[0.22em] text-background"
              >
                Explorar curadoria
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-4 md:gap-x-8">
              {favProducts.map((p, i) => (
                <FadeIn key={p!.slug} delay={i * 0.05}>
                  <ProductCard product={p!} />
                </FadeIn>
              ))}
            </div>
          )}
        </section>

        {viewedProducts.length > 0 && (
          <section className="mt-32 border-t border-border pt-16">
            <p className="eyebrow">Vistos recentemente</p>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-4 md:gap-x-8">
              {viewedProducts.slice(0, 4).map((p, i) => (
                <FadeIn key={p!.slug} delay={i * 0.05}>
                  <ProductCard product={p!} />
                </FadeIn>
              ))}
            </div>
          </section>
        )}

        {recommended.length > 0 && (
          <section className="mt-32 border-t border-border pt-16">
            <p className="eyebrow">Recomendados para você</p>
            <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-4 md:gap-x-8">
              {recommended.map((p, i) => (
                <FadeIn key={p.slug} delay={i * 0.05}>
                  <ProductCard product={p} />
                </FadeIn>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
