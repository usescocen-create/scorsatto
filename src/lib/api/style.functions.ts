import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

// Keep in sync with src/data/products.ts (client-safe; no server-only imports).
const SLUGS = [
  "camiseta-essencial-preta",
  "camiseta-essencial-off-white",
  "polo-pique-oliva",
  "polo-pique-preta",
  "calca-alfaiataria-grafite",
  "calca-chino-preta",
  "jaqueta-bomber-oliva",
  "sobretudo-la-preto",
  "trico-creme",
] as const;

const CATALOG_BRIEF = [
  { slug: "camiseta-essencial-preta", name: "Camiseta Essencial Preta", category: "camisetas", price: 289 },
  { slug: "camiseta-essencial-off-white", name: "Camiseta Essencial Off White", category: "camisetas", price: 289 },
  { slug: "polo-pique-oliva", name: "Polo Piquê Oliva", category: "polos", price: 459 },
  { slug: "polo-pique-preta", name: "Polo Piquê Preta", category: "polos", price: 459 },
  { slug: "calca-alfaiataria-grafite", name: "Calça Alfaiataria Grafite (lã)", category: "calcas", price: 789 },
  { slug: "calca-chino-preta", name: "Calça Chino Preta", category: "calcas", price: 589 },
  { slug: "jaqueta-bomber-oliva", name: "Jaqueta Bomber Oliva (camurça)", category: "jaquetas", price: 1290 },
  { slug: "sobretudo-la-preto", name: "Sobretudo Lã Preto", category: "jaquetas", price: 2490 },
  { slug: "trico-creme", name: "Tricô Cashmere Creme", category: "essentials", price: 989 },
];

const apiUrl = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3-flash-preview";

async function callAI(body: unknown) {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) throw new Error("LOVABLE_API_KEY ausente.");
  const res = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  if (res.status === 429) throw new Error("Muitas solicitações. Aguarde um instante.");
  if (res.status === 402) throw new Error("Créditos de IA esgotados. Contate o administrador.");
  if (!res.ok) {
    const t = await res.text();
    console.error("AI gateway error", res.status, t);
    throw new Error("Falha na análise. Tente novamente.");
  }
  const json = await res.json();
  const call = json?.choices?.[0]?.message?.tool_calls?.[0];
  if (!call) throw new Error("Resposta inválida da IA.");
  return JSON.parse(call.function.arguments);
}

// ============ SCORSATTO AI — perfil de estilo ============

const ProfileSchema = z.object({
  age: z.number().min(16).max(95),
  profession: z.string().min(2).max(80),
  desiredStyle: z.enum(["classico", "minimalista", "casual-elevado", "moderno", "old-money"]),
  budget: z.enum(["essencial", "intermediario", "premium", "ilimitado"]),
  occasion: z.enum(["trabalho", "casual", "encontro", "viagem", "evento"]),
});

export const analyzeStyle = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ProfileSchema.parse(data))
  .handler(async ({ data }) => {
    const system = `Você é o SCORSATTO AI, consultor de estilo masculino de luxo discreto (quiet luxury). Recomende um perfil de estilo e uma cápsula de 4 a 6 peças do catálogo da SCORSATTO. Use o tom editorial — sofisticado, breve, atemporal. Retorne SEMPRE via ferramenta style_profile usando APENAS slugs do catálogo informado.`;

    const user = `Cliente:
- Idade: ${data.age}
- Profissão: ${data.profession}
- Estilo desejado: ${data.desiredStyle}
- Orçamento: ${data.budget}
- Ocasião principal: ${data.occasion}

Catálogo SCORSATTO disponível (use SOMENTE estes slugs):
${CATALOG_BRIEF.map((p) => `- ${p.slug} — ${p.name} (${p.category}, R$ ${p.price})`).join("\n")}

Monte uma cápsula coerente entre tops, bottoms e (se fizer sentido) outerwear. Justifique cada escolha em uma frase.`;

    return callAI({
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "style_profile",
            description: "Perfil de estilo e cápsula recomendada.",
            parameters: {
              type: "object",
              properties: {
                styleName: { type: "string", description: "Nome editorial do perfil. Ex: 'Quiet Luxury Moderno'." },
                tagline: { type: "string", description: "Frase curta resumindo o estilo." },
                description: { type: "string", description: "2-3 frases sobre o estilo identificado." },
                capsule: {
                  type: "array",
                  minItems: 3,
                  maxItems: 6,
                  items: {
                    type: "object",
                    properties: {
                      slug: { type: "string", enum: [...SLUGS] },
                      reason: { type: "string", description: "Por que esta peça compõe o estilo (uma frase)." },
                    },
                    required: ["slug", "reason"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["styleName", "tagline", "description", "capsule"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "style_profile" } },
    }) as Promise<{
      styleName: string;
      tagline: string;
      description: string;
      capsule: { slug: string; reason: string }[];
    }>;
  });

// ============ MONTAR LOOK — outfit por ocasião ============

const OutfitInput = z.object({
  occasion: z.enum(["trabalho", "casual", "encontro", "viagem", "evento"]),
  preference: z.enum(["sobrio", "neutro", "ousado"]).default("neutro"),
});

export const generateOutfit = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => OutfitInput.parse(data))
  .handler(async ({ data }) => {
    const system = `Você é o SCORSATTO AI. Monte um look completo (top + bottom + opcionalmente outerwear) com peças do catálogo. Tom editorial e direto. Sempre use a ferramenta outfit usando APENAS slugs do catálogo.`;

    const user = `Ocasião: ${data.occasion}. Tom: ${data.preference}.

Catálogo:
${CATALOG_BRIEF.map((p) => `- ${p.slug} — ${p.name} (${p.category})`).join("\n")}

Selecione de 2 a 4 peças que combinem entre si. Explique o look em uma frase curta editorial.`;

    return callAI({
      model: MODEL,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "outfit",
            description: "Look completo SCORSATTO.",
            parameters: {
              type: "object",
              properties: {
                name: { type: "string", description: "Nome editorial do look." },
                vibe: { type: "string", description: "Uma frase descrevendo a atmosfera." },
                pieces: {
                  type: "array",
                  minItems: 2,
                  maxItems: 4,
                  items: {
                    type: "object",
                    properties: {
                      slug: { type: "string", enum: [...SLUGS] },
                      role: { type: "string", enum: ["top", "bottom", "outerwear", "knit"] },
                    },
                    required: ["slug", "role"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["name", "vibe", "pieces"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "outfit" } },
    }) as Promise<{
      name: string;
      vibe: string;
      pieces: { slug: string; role: "top" | "bottom" | "outerwear" | "knit" }[];
    }>;
  });