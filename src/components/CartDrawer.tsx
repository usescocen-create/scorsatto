import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { X, Minus, Plus } from "lucide-react";
import {
  useCart,
  selectCartSubtotal,
} from "@/stores/cart";
import { formatPrice } from "@/data/products";

export function CartDrawer() {
  const isOpen = useCart((s) => s.isOpen);
  const close = useCart((s) => s.close);
  const items = useCart((s) => s.items);
  const updateQuantity = useCart((s) => s.updateQuantity);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = useCart(selectCartSubtotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={close}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-background"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <p className="eyebrow">Sacola</p>
              <button
                onClick={close}
                aria-label="Fechar sacola"
                className="-mr-2 p-2"
              >
                <X className="h-4 w-4" strokeWidth={1.2} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <p className="font-serif text-2xl">Sua sacola está vazia.</p>
                <p className="mt-3 text-sm text-muted-foreground">
                  Comece pelas peças essenciais.
                </p>
                <Link
                  to="/colecao/$slug"
                  params={{ slug: "essentials" }}
                  onClick={close}
                  className="mt-8 text-[11px] font-medium uppercase tracking-[0.22em] link-underline"
                >
                  Explorar Essentials
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <ul className="space-y-6">
                    {items.map((item) => (
                      <li
                        key={`${item.slug}-${item.size}`}
                        className="flex gap-4"
                      >
                        <div className="aspect-[4/5] w-24 shrink-0 overflow-hidden bg-bone">
                          <img
                            src={item.image}
                            alt={item.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-serif text-base leading-tight">
                                {item.name}
                              </p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                Tamanho {item.size}
                              </p>
                            </div>
                            <p className="text-sm tabular-nums">
                              {formatPrice(item.price * item.quantity)}
                            </p>
                          </div>
                          <div className="mt-auto flex items-center justify-between pt-3">
                            <div className="flex items-center border border-border">
                              <button
                                className="p-2"
                                onClick={() =>
                                  updateQuantity(
                                    item.slug,
                                    item.size,
                                    item.quantity - 1,
                                  )
                                }
                                aria-label="Diminuir"
                              >
                                <Minus className="h-3 w-3" strokeWidth={1.2} />
                              </button>
                              <span className="w-8 text-center text-xs tabular-nums">
                                {item.quantity}
                              </span>
                              <button
                                className="p-2"
                                onClick={() =>
                                  updateQuantity(
                                    item.slug,
                                    item.size,
                                    item.quantity + 1,
                                  )
                                }
                                aria-label="Aumentar"
                              >
                                <Plus className="h-3 w-3" strokeWidth={1.2} />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.slug, item.size)}
                              className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground hover:text-foreground"
                            >
                              Remover
                            </button>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border-t border-border px-6 py-6">
                  <div className="flex items-baseline justify-between">
                    <p className="eyebrow">Subtotal</p>
                    <p className="font-serif text-xl tabular-nums">
                      {formatPrice(subtotal)}
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Frete calculado no checkout.
                  </p>
                  <button className="mt-6 w-full bg-foreground py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-background transition-opacity hover:opacity-90">
                    Finalizar compra
                  </button>
                  <Link
                    to="/carrinho"
                    onClick={close}
                    className="mt-3 block text-center text-[11px] uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground"
                  >
                    Ver sacola completa
                  </Link>
                </div>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}