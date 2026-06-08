import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/scorsatto-logo.asset.json";

export function Footer() {
  return (
    <footer className="bg-ink text-background mt-32">
      <div className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-24">
        {/* Newsletter */}
        <div className="border-b border-background/10 pb-16 md:pb-20">
          <div className="grid gap-10 md:grid-cols-2 md:gap-16 md:items-end">
            <div>
              <p className="eyebrow text-background/60">Newsletter</p>
              <h3 className="mt-4 font-serif text-4xl leading-tight md:text-6xl">
                Entre para o <em className="font-light italic">círculo</em> SCORSATTO.
              </h3>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-background/60">
                Receba novidades, reposições e lançamentos selecionados.
              </p>
            </div>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex w-full items-center border-b border-background/30"
            >
              <input
                type="email"
                required
                placeholder="Digite seu e-mail"
                className="flex-1 bg-transparent py-4 text-sm text-background outline-none placeholder:text-background/40"
              />
              <button
                type="submit"
                className="ml-4 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-background hover:text-olive transition-colors"
              >
                Quero Receber
              </button>
            </form>
          </div>
        </div>

        {/* 4 columns */}
        <div className="grid gap-12 pt-16 md:grid-cols-4 md:pt-20">
          <div>
            <p className="eyebrow text-background/60">SCORSATTO</p>
            <ul className="mt-6 space-y-3 text-sm text-background/80">
              <li><Link to="/sobre" className="hover:text-background">Sobre Nós</Link></li>
              <li><Link to="/sobre" className="hover:text-background">Curadoria</Link></li>
              <li><Link to="/sobre" className="hover:text-background">Nossa Essência</Link></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-background/60">Atendimento</p>
            <ul className="mt-6 space-y-3 text-sm text-background/80">
              <li><a className="hover:text-background" href="#">Fale Conosco</a></li>
              <li><a className="hover:text-background" href="#">WhatsApp</a></li>
              <li><a className="hover:text-background" href="#">Trocas e Devoluções</a></li>
              <li><a className="hover:text-background" href="#">Perguntas Frequentes</a></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-background/60">Informações</p>
            <ul className="mt-6 space-y-3 text-sm text-background/80">
              <li><a className="hover:text-background" href="#">Política de Privacidade</a></li>
              <li><a className="hover:text-background" href="#">Termos de Uso</a></li>
              <li><a className="hover:text-background" href="#">Envios e Entregas</a></li>
              <li><a className="hover:text-background" href="#">Guia de Tamanhos</a></li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-background/60">Contato</p>
            <ul className="mt-6 space-y-3 text-sm text-background/80">
              <li><a className="hover:text-background" href="https://instagram.com/scorsatto.co" target="_blank" rel="noreferrer">Instagram @scorsatto.co</a></li>
              <li><a className="hover:text-background" href="#">WhatsApp</a></li>
              <li><a className="hover:text-background" href="mailto:atendimento@scorsatto.co">atendimento@scorsatto.co</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-24 border-t border-background/10 pt-10">
          <img src={logoAsset.url} alt="SCORSATTO" className="h-8 w-auto opacity-60 brightness-0 invert" />
          <div className="mt-10 flex flex-col gap-4 text-[11px] uppercase tracking-[0.18em] text-background/40 md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} SCORSATTO. Todos os direitos reservados.</p>
            <p>O essencial, bem feito.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
