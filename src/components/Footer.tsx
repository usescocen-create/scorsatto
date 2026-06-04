import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-ink text-background mt-32">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-24">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="eyebrow text-background/60">Newsletter</p>
            <h3 className="mt-4 font-serif text-3xl md:text-4xl text-background">
              Entre para o círculo SCORSATTO.
            </h3>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-background/60">
              Receba lançamentos, reposições e acesso antecipado às coleções.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="mt-8 flex max-w-md items-center border-b border-background/30"
            >
              <input
                type="email"
                required
                placeholder="Seu e-mail"
                className="flex-1 bg-transparent py-3 text-sm text-background outline-none placeholder:text-background/40"
              />
              <button
                type="submit"
                className="ml-4 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-background hover:text-olive transition-colors"
              >
                Inscrever
              </button>
            </form>
          </div>

          <div>
            <p className="eyebrow text-background/60">Institucional</p>
            <ul className="mt-4 space-y-3 text-sm text-background/80">
              <li><a className="hover:text-background" href="#">Sobre</a></li>
              <li><a className="hover:text-background" href="#">Curadoria</a></li>
              <li><a className="hover:text-background" href="#">Sustentabilidade</a></li>
              <li><a className="hover:text-background" href="#">Contato</a></li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-background/60">Ajuda</p>
            <ul className="mt-4 space-y-3 text-sm text-background/80">
              <li><a className="hover:text-background" href="#">Envio e prazos</a></li>
              <li><a className="hover:text-background" href="#">Trocas e devoluções</a></li>
              <li><a className="hover:text-background" href="#">Guia de tamanhos</a></li>
              <li>
                <Link to="/carrinho" className="hover:text-background">
                  Sacola
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 border-t border-background/10 pt-10">
          <p className="font-serif text-[14vw] leading-none tracking-[0.18em] text-background/[0.06] md:text-[10vw]">
            SCORSATTO
          </p>
          <div className="mt-10 flex flex-col gap-4 text-[11px] uppercase tracking-[0.18em] text-background/40 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} SCORSATTO. Todos os direitos reservados.</p>
            <p>O básico, elevado.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}