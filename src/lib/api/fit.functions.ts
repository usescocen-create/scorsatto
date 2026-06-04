import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ProfileSchema = z.object({
  height: z.number().min(100).max(230),
  weight: z.number().min(35).max(220),
  age: z.number().min(14).max(95),
  bodyType: z.enum(["magro", "atletico", "medio", "robusto"]),
  fitPreference: z.enum(["ajustado", "regular", "oversized"]),
  photoDataUrl: z.string().max(2_500_000).optional(),
});

const InputSchema = z.object({
  product: z.object({
    name: z.string().min(1).max(200),
    category: z.string().min(1).max(60),
    sizes: z.array(z.string().min(1).max(4)).min(1).max(8),
  }),
  profile: ProfileSchema,
});

export const recommendSize = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => InputSchema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) throw new Error("LOVABLE_API_KEY ausente.");

    const { product, profile } = data;

    const system = `Você é um consultor de modelagem da SCORSATTO, marca masculina de luxo discreto. Recomende o tamanho ideal (entre os disponíveis) considerando altura, peso, idade, biotipo, preferência de caimento e a categoria da peça (camisetas, polos, jaquetas, calças têm modelagens distintas). Retorne SEMPRE pela ferramenta size_recommendation.`;

    const userText = `Peça: ${product.name}\nCategoria: ${product.category}\nTamanhos disponíveis: ${product.sizes.join(", ")}\n\nCliente:\n- Altura: ${profile.height} cm\n- Peso: ${profile.weight} kg\n- Idade: ${profile.age}\n- Biotipo: ${profile.bodyType}\n- Caimento preferido: ${profile.fitPreference}\n\nRetorne o tamanho ideal, confiança (0-100) e como a peça vai vestir nos ombros, tórax, cintura e comprimento.`;

    const userContent: any[] = [{ type: "text", text: userText }];
    if (profile.photoDataUrl) {
      userContent.push({
        type: "image_url",
        image_url: { url: profile.photoDataUrl },
      });
      userContent.push({
        type: "text",
        text: "Analise as proporções corporais da foto para refinar a recomendação.",
      });
    }

    const body = {
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: system },
        { role: "user", content: userContent },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "size_recommendation",
            description: "Recomendação final de tamanho.",
            parameters: {
              type: "object",
              properties: {
                recommendedSize: {
                  type: "string",
                  enum: product.sizes,
                },
                confidence: { type: "number" },
                explanation: { type: "string" },
                fit: {
                  type: "object",
                  properties: {
                    shoulders: { type: "string", enum: ["justo", "perfeito", "folgado"] },
                    chest: { type: "string", enum: ["justo", "perfeito", "folgado"] },
                    waist: { type: "string", enum: ["justo", "perfeito", "folgado"] },
                    length: { type: "string", enum: ["curto", "perfeito", "longo"] },
                  },
                  required: ["shoulders", "chest", "waist", "length"],
                  additionalProperties: false,
                },
              },
              required: ["recommendedSize", "confidence", "explanation", "fit"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: {
        type: "function",
        function: { name: "size_recommendation" },
      },
    };

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.status === 429) throw new Error("Muitas solicitações. Tente novamente em instantes.");
    if (res.status === 402) throw new Error("Créditos de IA esgotados. Contate o administrador.");
    if (!res.ok) {
      const t = await res.text();
      console.error("AI gateway error", res.status, t);
      throw new Error("Falha na análise. Tente novamente.");
    }

    const json = await res.json();
    const call = json?.choices?.[0]?.message?.tool_calls?.[0];
    if (!call) throw new Error("Resposta inválida da IA.");
    const args = JSON.parse(call.function.arguments);
    return args as {
      recommendedSize: string;
      confidence: number;
      explanation: string;
      fit: {
        shoulders: "justo" | "perfeito" | "folgado";
        chest: "justo" | "perfeito" | "folgado";
        waist: "justo" | "perfeito" | "folgado";
        length: "curto" | "perfeito" | "longo";
      };
    };
  });