import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useCart, selectCartSubtotal } from "@/stores/cart";
import { formatPrice } from "@/data/products";

export const Route = createFileRoute("/carrinho")({
  head: () => ({
    meta: [
      { title: "Sacola — SCORSATTO" },
      { name: "description", content: "Sua sacola SCORSATTO." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/carrinho" }],
  }),
  component: CartPage,
});

function CartPage() {
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCart(selectCartSubtotal);

  return (
    <section className="pt-28 pb-32 md:pt-36">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <p className="eyebrow">Sacola</p>
        <h1 className="mt-4 font-serif text-4xl md:text-6xl">Sua seleção.</h1>

        {items.length === 0 ? (
          <div className="mt-24 border-t border-border pt-24 text-center">
            <p className="font-serif text-3xl">Sua sacola está vazia.</p>
            <p className="mt-4 text-sm text-muted-foreground">
              Comece pela curadoria essencial.
            </p>
            <Link
              to="/colecao/$slug"
              params={{ slug: "essentials" }}
              className="mt-10 inline-block text-[11px] uppercase tracking-[0.22em] link-underline"
            >
              Explorar Essentials
            </Link>
          </div>
        ) : (
          <div className="mt-16 grid gap-16 md:grid-cols-3">
            <ul className="md:col-span-2 space-y-10 border-t border-border pt-10">
              {items.map((item) => (
                <li
                  key={`${item.slug}-${item.size}`}
                  className="grid grid-cols-[120px_1fr] gap-6 border-b border-border pb-10 md:grid-cols-[160px_1fr]"
                >
                  <Link
                    to="/produto/$slug"
                    params={{ slug: item.slug }}
                    className="block aspect-[4/5] overflow-hidden bg-bone"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </Link>
                  <div className="flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          to="/produto/$slug"
                          params={{ slug: item.slug }}
                          className="font-serif text-xl leading-tight link-underline"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Tamanho {item.size}
                        </p>
                      </div>
                      <p className="tabular-nums">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-6">
                      <div className="flex items-center border border-border">
                        <button
                          className="p-3"
                          onClick={() =>
                            updateQuantity(item.slug, item.size, item.quantity - 1)
                          }
                          aria-label="Diminuir"
                        >
                          <Minus className="h-3 w-3" strokeWidth={1.2} />
                        </button>
                        <span className="w-10 text-center text-sm tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          className="p-3"
                          onClick={() =>
                            updateQuantity(item.slug, item.size, item.quantity + 1)
                          }
                          aria-label="Aumentar"
                        >
                          <Plus className="h-3 w-3" strokeWidth={1.2} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.slug, item.size)}
                        className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="md:sticky md:top-28 self-start border-t border-border pt-10">
              <p className="eyebrow">Resumo</p>
              <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Frete</span>
                  <span>Calculado no checkout</span>
                </div>
              </div>
              <div className="mt-8 flex items-baseline justify-between border-t border-border pt-6">
                <span className="eyebrow">Total</span>
                <span className="font-serif text-2xl tabular-nums">
                  {formatPrice(subtotal)}
                </span>
              </div>
              <button className="mt-8 w-full bg-foreground py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-background transition-opacity hover:opacity-90">
                Finalizar compra
              </button>
              <p className="mt-4 text-center text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                Pix · Cartão · Boleto
              </p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}