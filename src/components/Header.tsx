import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ShoppingBag, Menu, X, Heart } from "lucide-react";
import { useCart, selectCartCount } from "@/stores/cart";
import { categoryCollections, editorialCollections } from "@/data/collections";
import logoAsset from "@/assets/scorsatto-logo.asset.json";

export function Header() {
  const open = useCart((s) => s.open);
  const count = useCart(selectCartCount);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-offwhite/90 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6 md:h-20 md:px-10">
        <button className="md:hidden -ml-2 p-2 text-foreground" onClick={() => setMenuOpen(true)} aria-label="Abrir menu">
          <Menu className="h-5 w-5" strokeWidth={1.2} />
        </button>

        <nav className="hidden md:flex items-center gap-8 text-[11px] font-medium tracking-[0.18em] uppercase">
          {categoryCollections.slice(0, 5).map((c) => (
            <Link key={c.slug} to="/colecao/$slug" params={{ slug: c.slug }} className="link-underline text-foreground/80 hover:text-foreground transition-colors" activeProps={{ className: "text-foreground" }}>
              {c.name}
            </Link>
          ))}
          <Link to="/estilo" className="link-underline text-olive hover:text-foreground transition-colors">
            SCORSATTO AI
          </Link>
        </nav>

        <Link to="/" className="shrink-0">
          <img src={logoAsset.url} alt="SCORSATTO" className="h-6 w-auto md:h-7" />
        </Link>

        <div className="flex items-center gap-1">
          <Link to="/favoritos" className="p-2 text-foreground hover:text-olive transition-colors" aria-label="Favoritos">
            <Heart className="h-5 w-5" strokeWidth={1.2} />
          </Link>
          <button onClick={open} className="relative flex items-center gap-2 p-2 -mr-2 text-foreground" aria-label="Abrir sacola">
            <ShoppingBag className="h-5 w-5" strokeWidth={1.2} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-offwhite md:hidden">
          <div className="flex h-16 items-center justify-between px-6">
            <img src={logoAsset.url} alt="SCORSATTO" className="h-6 w-auto" />
            <button onClick={() => setMenuOpen(false)} className="-mr-2 p-2" aria-label="Fechar menu">
              <X className="h-5 w-5" strokeWidth={1.2} />
            </button>
          </div>
          <nav className="flex flex-col gap-4 px-6 pt-8 pb-16">
            <p className="eyebrow">Categorias</p>
            {categoryCollections.map((c) => (
              <Link key={c.slug} to="/colecao/$slug" params={{ slug: c.slug }} onClick={() => setMenuOpen(false)} className="font-serif text-3xl text-foreground">
                {c.name}
              </Link>
            ))}
            <p className="eyebrow mt-8">Coleções</p>
            {editorialCollections.map((c) => (
              <Link key={c.slug} to="/colecao/$slug" params={{ slug: c.slug }} onClick={() => setMenuOpen(false)} className="font-serif text-2xl text-muted-foreground">
                {c.name}
              </Link>
            ))}
            <p className="eyebrow mt-8">SCORSATTO AI</p>
            <Link to="/estilo" onClick={() => setMenuOpen(false)} className="font-serif text-2xl text-olive">Descobrir meu estilo</Link>
            <Link to="/consultor" onClick={() => setMenuOpen(false)} className="font-serif text-2xl text-olive">Consultor de Estilo</Link>
            <Link to="/montar-look" onClick={() => setMenuOpen(false)} className="font-serif text-2xl text-olive">Montar Look</Link>
            <Link to="/favoritos" onClick={() => setMenuOpen(false)} className="font-serif text-2xl">Favoritos</Link>
            <Link to="/sobre" onClick={() => setMenuOpen(false)} className="font-serif text-2xl">Sobre</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
