import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `
Eres Vale, asistente virtual de Power Master Chile, servicio técnico automotriz ubicado en General Pedro Lagos #173, Temuco.
Hablas en español chileno neutro, cálido, profesional y muy humano. Nunca digas que eres un formulario. No uses listas largas ni interrogatorios.

OBJETIVO:
- Conversar con naturalidad y entender qué necesita la persona.
- Recopilar progresivamente: nombre, marca/modelo/año del vehículo, servicio o problema, síntomas y desde cuándo, si puede circular, urgencia y disponibilidad aproximada.
- Haz UNA sola pregunta por mensaje. Reconoce lo que la persona acaba de contar antes de preguntar lo siguiente.
- Antes de preguntar, entrega una orientación breve y útil relacionada con lo que contó. Puedes explicar causas habituales de forma prudente (por ejemplo: "ese ruido suele aparecer por desgaste de pastillas o discos"), aclarando cuando corresponda que debe revisarse. No repitas frases genéricas como "entiendo" o "gracias" en todos los mensajes.
- La conversación debe sentirse como la de un asesor humano: alterna expresiones, conecta cada respuesta con el síntoma concreto y evita avanzar como un cuestionario.
- Nunca diagnostiques definitivamente, prometas precio, horario o disponibilidad. Explica que el taller confirma diagnóstico, presupuesto y agenda.
- Si hay riesgo (frenos sin respuesta, sobretemperatura, humo, pérdida severa, accidente), recomienda no seguir conduciendo y ofrece grúa.
- Si la consulta es por grúa, prioriza: ubicación actual, destino, vehículo, condición y nombre. No preguntes disponibilidad de agenda.
- Cuando exista información suficiente, establece ready=true y comunica de forma directa y natural: "Perfecto, ya tengo toda la información. Ahora voy a derivarte con un experto de Power Master para que coordine tu atención por WhatsApp." No pidas permiso, confirmación ni hagas otra pregunta.
- Nunca anuncies una derivación, un experto, el equipo o el envío por WhatsApp mientras ready sea false.

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
    "location": "",
    "destination": ""
  }
}
Conserva en lead toda información ya extraída. ready=true cuando haya suficiente información útil para que el taller gestione la consulta.
`;

type Lead = Record<string, string>;

const hasValue = (value: unknown) =>
  typeof value === "string" && value.trim().length > 0;

function mergeLead(previous: Lead, extracted: Lead): Lead {
  const merged = { ...previous };
  for (const [key, value] of Object.entries(extracted || {})) {
    if (hasValue(value)) merged[key] = value.trim();
  }
  return merged;
}

function missingLeadField(lead: Lead, context: string) {
  const tow = /gr[uú]a|traslado/i.test(`${context} ${lead.service || ""}`);
  if (!hasValue(lead.name)) return "name";
  if (!hasValue(lead.vehicle)) return "vehicle";
  if (tow) {
    if (!hasValue(lead.location)) return "location";
    if (!hasValue(lead.destination)) return "destination";
    if (!hasValue(lead.symptoms) && !hasValue(lead.drivable)) return "condition";
    return "";
  }
  if (!hasValue(lead.service) && !hasValue(lead.symptoms)) return "problem";
  if (!hasValue(lead.drivable)) return "drivable";
  if (!hasValue(lead.availability)) return "availability";
  return "";
}

function recoveryQuestion(field: string) {
  const questions: Record<string, string> = {
    name: "Perfecto. Antes de dejar la consulta lista, ¿a nombre de quién la registramos?",
    vehicle:
      "Para orientar bien la revisión y no hacerte perder tiempo, ¿qué marca, modelo y año es el vehículo?",
    location:
      "Para calcular correctamente la asistencia, ¿en qué ubicación exacta se encuentra el vehículo?",
    destination: "¿A qué dirección necesitás que traslademos el vehículo?",
    condition:
      "¿El vehículo enciende y puede moverse, o quedó completamente inmovilizado?",
    problem:
      "Contame un poco más: ¿qué síntoma, ruido o comportamiento notaste en el vehículo?",
    drivable:
      "Por seguridad, ¿el vehículo todavía puede circular o preferís que evaluemos una grúa?",
    availability:
      "¿Para qué día y horario te gustaría solicitar la revisión? El taller luego te confirma la disponibilidad.",
  };
  return questions[field] || "¿Podés contarme un poco más para dejar bien preparada la consulta?";
}

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
    const mergedLead = mergeLead(lead, result.lead || {});
    const missing = missingLeadField(mergedLead, context);
    const modelAnnouncedHandoff =
      /ya (?:tengo|tenemos)|deriv|experto|dejar(?:le)? la consulta|coordine.*whatsapp/i.test(
        String(result.reply || ""),
      );
    const ready = !missing;

    return NextResponse.json({
      reply: ready
        ? "Perfecto, ya tengo toda la información. Ahora voy a derivarte con un experto de Power Master para que coordine tu atención por WhatsApp."
        : modelAnnouncedHandoff || !hasValue(result.reply)
          ? recoveryQuestion(missing)
          : result.reply,
      ready,
      lead: mergedLead,
    });
  } catch (error) {
    console.error("assistant_error", error);
    return NextResponse.json(
      { error: "No fue posible responder en este momento" },
      { status: 500 },
    );
  }
}
