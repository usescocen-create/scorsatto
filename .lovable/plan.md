## Escopo desta fase

Construir a **vitrine** do SCORSATTO com qualidade editorial de marca premium internacional. Sem backend, sem admin, sem checkout real. Catálogo em arquivo local (mock) para que tudo navegue de verdade. Integração Shopify (catálogo real, Pix/cartão/boleto, admin) fica reservada para uma fase posterior.

Você disse "tenho fotos próprias" — vou usar placeholders editoriais neutros (tons grafite/oliva, sem rostos genéricos de banco de imagem) para não comprometer a estética. Você substitui depois sem mexer no layout.

## Direção visual (travada)

- Paleta: `#111111`, `#FFFFFF`, `#2B2B2B`, `#F5F5F2`, `#6A7052` — oliva é o único acento, usado com parcimônia.
- Tipografia: serif display para títulos (ex.: Cormorant Garamond), sans-serif neutra para corpo (ex.: Inter ou similar). Tracking generoso em headings, caixa-alta em micro-rótulos.
- Composição: muito respiro, imagens grandes ocupando dobras inteiras, grid assimétrico em pontos-chave, zero badges promocionais, zero gradientes coloridos, zero ícones decorativos espalhados.
- Movimento: fades suaves no scroll, reveal de imagens, hover discreto (translate sutil + mudança de opacidade). Nada de bounce, nada de carrossel auto-play barulhento.

Todos os valores vão como tokens em `src/styles.css` (`@theme` + `:root`) — nenhum hex direto em componentes.

## Estrutura de rotas

```
src/routes/
  __root.tsx              header minimal + footer editorial
  index.tsx               home (todas as seções abaixo)
  colecao.$slug.tsx       listagem de coleção (Essentials, Polos, etc.)
  produto.$slug.tsx       página de produto premium
  carrinho.tsx            carrinho minimal
```

Cada rota com `head()` próprio (title, description, og:*). Sem hash anchors entre seções principais.

## Home — seções

1. **Hero full-screen** — imagem editorial, wordmark "SCORSATTO.", tagline "O básico, elevado.", subcopy curta, dois CTAs (Explorar coleção / Novidades). Fade-in em cascata.
2. **Manifesto** — tipografia grande, centralizada, muito espaço. "Você não precisa de tudo."
3. **Coleções** — grid de 5 cards (Essentials, Polos, Camisetas, Jaquetas, Calças). Imagem + nome em serif, hover com zoom lento da imagem e linha oliva aparecendo embaixo do nome.
4. **Destaques** — grid de produtos (4–6). Foto grande, nome, preço em BRL, sem badges. Link para página de produto.
5. **Lifestyle** — imagem editorial full-bleed com copy sobreposta discreta.
6. **Curadoria** — bloco tipográfico, sem imagem, fundo off-white.
7. **Newsletter** — input + botão minimalistas, copy "Entre para o círculo SCORSATTO."
8. **Footer** — colunas enxutas (institucional, ajuda, social), wordmark grande embaixo.

## Página de produto

- Galeria à esquerda ocupando ~60% da viewport em desktop (vertical scroll de imagens), info sticky à direita.
- Info: nome em serif, preço, descrição curta, seletor de tamanho (chips quadrados minimalistas), estoque ("Últimas peças" quando baixo, sem alarme visual), botão "Adicionar à sacola" preto sólido.
- Selo tipográfico: "Selecionado pela curadoria SCORSATTO".
- Acordeões discretos: Composição, Cuidados, Entrega.
- Seção "Combine com" — 4 produtos relacionados em grid.
- Mobile: galeria swipe horizontal, info abaixo.

## Carrinho

- Drawer lateral (abre do header) + página dedicada `/carrinho`.
- Lista de itens com thumb, nome, tamanho, qtd (stepper minimal), preço.
- Subtotal, frete ("calculado no checkout"), CTA "Finalizar compra" (placeholder, sem checkout real nesta fase).
- Estado vazio elegante: tipografia + link "Explorar coleção".

## Dados e estado

- `src/data/products.ts` — catálogo mock (8–12 produtos com nome, slug, coleção, preço, imagens, tamanhos, estoque, descrição).
- `src/data/collections.ts` — coleções e copy.
- Carrinho via Zustand com persistência em `localStorage` (chave `scorsatto-cart`).

## Performance e SEO

- Imagens com `loading="lazy"` exceto LCP (hero), `fetchpriority="high"` + preload no `head()` da home.
- Fontes via `@import` no CSS com `display: swap`.
- Meta tags por rota, JSON-LD `Product` na página de produto, `Organization` no root.
- `robots.txt` e `sitemap.xml` com placeholders relativos.

## Detalhes técnicos

- TanStack Start + Tailwind v4 (já no template). Tokens em `src/styles.css` via `@theme`.
- Animações com `motion/react` (já compatível com o template) — variantes simples de fade/translate, sem layout animations complexas.
- Componentes shadcn existentes adaptados (button variant `premium` sólido preto, input ghost com underline). Nada de cards padrão arredondados — radius pequeno (`2px`) ou zero, condizente com Quiet Luxury.
- Mobile-first: hero, tipografia e grids escalam por breakpoint; testar em 390px.

## Fora desta fase (para depois)

- Shopify (catálogo real, checkout Pix/cartão/boleto, admin de produtos/pedidos/clientes).
- Autenticação de clientes / área "Minha conta".
- Integração com fornecedores.

Quando você quiser ativar a venda real, o próximo passo é habilitar o Shopify e migrar o catálogo mock para produtos reais — o layout não precisa mudar.