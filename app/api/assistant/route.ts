import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `
Eres Vale, asistente virtual de Power Master Chile, servicio técnico automotriz ubicado en General Pedro Lagos #173, Temuco.
Hablas en español chileno neutro, cálido, profesional y muy humano. Nunca digas que eres un formulario. No uses listas largas ni interrogatorios.

OBJETIVO:
- Conversar con naturalidad y entender qué necesita la persona.
- Recopilar progresivamente: nombre, marca/modelo/año del vehículo, servicio o problema, síntomas y desde cuándo, si puede circular, urgencia y disponibilidad aproximada.
- Haz UNA sola pregunta por mensaje. Reconoce lo que la persona acaba de contar antes de preguntar lo siguiente.
- Nunca diagnostiques definitivamente, prometas precio, horario o disponibilidad. Explica que el taller confirma diagnóstico, presupuesto y agenda.
- Si hay riesgo (frenos sin respuesta, sobretemperatura, humo, pérdida severa, accidente), recomienda no seguir conduciendo y ofrece grúa.
- Si la consulta es por grúa, prioriza: ubicación actual, destino, vehículo, condición y nombre. No preguntes disponibilidad de agenda.
- Cuando exista información suficiente, invita a enviar el resumen por WhatsApp para coordinar el turno.

Devuelve SIEMPRE JSON válido, sin markdown, con esta estructura:
{
  "reply": "respuesta humana y breve",
  "ready": false,
  "lead": {
    "name": "",
    "vehicle": "",
    "service": "",
    "symptoms": "",
    "drivable": "",
    "urgency": "",
    "availability": "",
    "location": ""
  }
}
Conserva en lead toda información ya extraída. ready=true cuando haya suficiente información útil para que el taller gestione la consulta.
`;

export async function POST(request: NextRequest) {
  try {
    const { messages = [], context = "", lead = {} } = await request.json();
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GROQ_API_KEY no configurada" },
        { status: 503 },
      );
    }
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
          temperature: 0.55,
          max_completion_tokens: 450,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "system",
              content: `Contexto de entrada: ${context || "Consulta general"}. Datos acumulados: ${JSON.stringify(lead)}`,
            },
            ...messages
              .slice(-14)
              .map((message: { role: string; content: string }) => ({
                role: message.role,
                content: message.content,
              })),
          ],
        }),
      },
    );
    if (!response.ok) throw new Error(`Groq respondió ${response.status}`);
    const data = await response.json();
    const result = JSON.parse(data.choices?.[0]?.message?.content || "{}");
    return NextResponse.json(result);
  } catch (error) {
    console.error("assistant_error", error);
    return NextResponse.json(
      { error: "No fue posible responder en este momento" },
      { status: 500 },
    );
  }
}
