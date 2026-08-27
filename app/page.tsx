"use client";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  Activity,
  ArrowRight,
  BatteryCharging,
  Car,
  Check,
  ChevronDown,
  CircleGauge,
  Clock3,
  MapPin,
  Mail,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  RotateCcw,
  Send,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Star,
  Truck,
  Wrench,
  X,
  Zap,
} from "lucide-react";
const WA_NUMBER = "56977997536";
const WA = `https://wa.me/${WA_NUMBER}`;
const EMAIL = "pmtemuco@gmail.com";
const MAPS_URL = "https://maps.app.goo.gl/BLeuZg8a1hnGCoYD6";
const TOW_PHONE = process.env.NEXT_PUBLIC_TOW_PHONE || "+56977997536";
const services = [
  {
    icon: Activity,
    image:
      "https://res.cloudinary.com/dvvuwigmy/image/upload/f_auto,q_auto,w_900/v1787805313/ChatGPT_Image_27_ago_2026_01_17_38_1_qsghjs.png",
    title: "Diagnóstico y escáner",
    intro:
      "Lectura e interpretación profesional de códigos, parámetros y testigos del tablero.",
    description:
      "Conectamos equipos de diagnóstico al vehículo y analizamos la información en contexto. Un código orienta la búsqueda, pero nuestro trabajo es encontrar la causa real antes de recomendar una reparación.",
    includes: [
      "Lectura y borrado de códigos de falla",
      "Revisión de datos en tiempo real",
      "Interpretación de testigos y síntomas",
      "Orientación sobre la reparación necesaria",
    ],
    ideal:
      "Cuando aparece un testigo, el motor pierde rendimiento, aumenta el consumo o existe una falla intermitente.",
  },
  {
    icon: Wrench,
    image:
      "https://res.cloudinary.com/dvvuwigmy/image/upload/f_auto,q_auto,w_900/v1787805316/ChatGPT_Image_27_ago_2026_01_17_38_2_mvzgxb.png",
    title: "Mecánica general",
    intro:
      "Diagnóstico y reparación integral para recuperar el rendimiento de tu vehículo.",
    description:
      "Atendemos fallas mecánicas y desgaste de componentes con una evaluación ordenada. Revisamos el sistema afectado, informamos el hallazgo y definimos la solución adecuada para cada vehículo.",
    includes: [
      "Revisión de motor y componentes",
      "Detección de ruidos y vibraciones",
      "Reparación de pérdidas y fallas",
      "Control final de funcionamiento",
    ],
    ideal:
      "Cuando notas ruidos, pérdida de potencia, vibraciones, fugas o un comportamiento diferente al habitual.",
  },
  {
    icon: ShieldCheck,
    image:
      "https://res.cloudinary.com/dvvuwigmy/image/upload/f_auto,q_auto,w_900/v1787805313/ChatGPT_Image_27_ago_2026_01_17_39_7_gxriqe.png",
    title: "Frenos y seguridad",
    intro:
      "Inspección, mantenimiento y reparación del sistema completo de frenos.",
    description:
      "El sistema de frenos requiere una revisión integral, no solamente el cambio de pastillas. Evaluamos desgaste, respuesta, pérdidas y estado de los componentes para conservar una frenada segura.",
    includes: [
      "Pastillas, discos, tambores y balatas",
      "Líquido y circuito hidráulico",
      "Diagnóstico de ruidos y vibración",
      "Inspección visual de seguridad",
    ],
    ideal:
      "Si el pedal cambia, el vehículo vibra o desvía al frenar, escuchas ruidos o se enciende un testigo.",
  },
  {
    icon: CircleGauge,
    image:
      "https://res.cloudinary.com/dvvuwigmy/image/upload/f_auto,q_auto,w_900/v1787805309/ChatGPT_Image_27_ago_2026_01_17_38_3_fyviak.png",
    title: "Mantención preventiva",
    intro:
      "Servicio por kilometraje, aceites, filtros y revisión de puntos críticos.",
    description:
      "Una mantención a tiempo reduce averías y conserva el rendimiento del vehículo. Adaptamos la revisión al kilometraje, uso y especificaciones del fabricante.",
    includes: [
      "Cambio de aceite y filtros",
      "Revisión de niveles y fluidos",
      "Inspección de puntos de seguridad",
      "Registro de observaciones",
    ],
    ideal:
      "Por kilometraje, antes de un viaje o cuando desconoces el historial reciente del vehículo.",
  },
  {
    icon: Car,
    image:
      "https://res.cloudinary.com/dvvuwigmy/image/upload/f_auto,q_auto,w_900/v1787805312/ChatGPT_Image_27_ago_2026_01_17_39_5_ffxscj.png",
    title: "Embrague y transmisión",
    intro:
      "Revisión y reemplazo de componentes con diagnóstico previo y transparente.",
    description:
      "Evaluamos el funcionamiento del embrague y la transmisión antes de desmontar. Identificamos desgaste, dificultad de accionamiento, ruidos o pérdidas para evitar intervenciones innecesarias.",
    includes: [
      "Prueba de funcionamiento",
      "Revisión de accionamiento y pérdidas",
      "Evaluación de kit de embrague",
      "Orientación y presupuesto previo",
    ],
    ideal:
      "Si cuesta ingresar cambios, el embrague patina, vibra, queda alto o aparecen ruidos al accionar.",
  },
  {
    icon: Snowflake,
    image:
      "https://res.cloudinary.com/dvvuwigmy/image/upload/f_auto,q_auto,w_900/v1787805310/ChatGPT_Image_27_ago_2026_01_17_39_4_idw91f.png",
    title: "Refrigeración",
    intro:
      "Control de temperatura, refrigerantes, fugas y funcionamiento del circuito.",
    description:
      "La temperatura correcta protege el motor. Revisamos el circuito de refrigeración y sus componentes para encontrar fugas, contaminación o problemas de circulación.",
    includes: [
      "Revisión de fugas y presión",
      "Estado del refrigerante",
      "Mangueras, radiador y depósito",
      "Control de temperatura y ventilación",
    ],
    ideal:
      "Ante recalentamiento, pérdida de refrigerante, olor extraño, manchas o variaciones de temperatura.",
  },
  {
    icon: BatteryCharging,
    image:
      "https://res.cloudinary.com/dvvuwigmy/image/upload/f_auto,q_auto,w_900/v1787805310/ChatGPT_Image_27_ago_2026_01_17_39_6_nn7s4m.png",
    title: "Sistema eléctrico",
    intro:
      "Batería, carga, arranque, sensores y resolución de fallas eléctricas.",
    description:
      "Medimos el sistema eléctrico para diferenciar una batería agotada de una falla de carga, arranque, conexión o sensor. La medición correcta evita reemplazar piezas por descarte.",
    includes: [
      "Prueba de batería y carga",
      "Control de alternador y arranque",
      "Revisión de conexiones principales",
      "Diagnóstico de sensores y consumos",
    ],
    ideal:
      "Cuando el vehículo demora en arrancar, baja la intensidad de luces, descarga la batería o muestra alertas.",
  },
  {
    icon: Truck,
    image:
      "https://res.cloudinary.com/dvvuwigmy/image/upload/f_auto,q_auto,w_900/v1787805316/ChatGPT_Image_27_ago_2026_01_17_39_8_vbduoj.png",
    title: "Grúa y traslados",
    intro:
      "Traslado seguro de tu vehículo cuando no puede llegar por sus propios medios.",
    description:
      "Coordinamos el traslado del vehículo de forma segura hasta el taller o el destino acordado. Centralizamos la asistencia y la recepción mecánica para simplificar todo el proceso.",
    includes: [
      "Coordinación directa por WhatsApp",
      "Traslado de vehículos inmovilizados",
      "Recepción en Power Master",
      "Información de ubicación y estado",
    ],
    ideal:
      "Ante una panne, choque, problema de arranque o cuando no es seguro continuar conduciendo.",
  },
];
const issues = [
  "Mantención / cambio de aceite",
  "Testigo encendido o falla",
  "Frenos o suspensión",
  "Embrague / transmisión",
  "Revisión precompra",
  "Grúa / vehículo detenido",
  "Otro problema",
];
function Diagnostic({ close }: { close: () => void }) {
  const [step, setStep] = useState(1),
    [issue, setIssue] = useState(""),
    [vehicle, setVehicle] = useState(""),
    [detail, setDetail] = useState("");
  const send = () => {
    const m = `Hola Power Master, quiero solicitar una evaluación.\n\nTipo de consulta: ${issue}\nVehículo: ${vehicle || "Por confirmar"}\nDetalle: ${detail || "Sin detalle adicional"}`;
    window.open(
      `${WA}?text=${encodeURIComponent(m)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };
  return (
    <div className="modal" role="dialog" aria-modal="true">
      <div className="diagnostic">
        <button className="close" onClick={close}>
          <X />
        </button>
        <div className="diag-top">
          <span>DIAGNÓSTICO EXPRESS</span>
          <b>0{step} / 03</b>
        </div>
        <div className="progress">
          <i style={{ width: `${step * 33.33}%` }} />
        </div>
        {step === 1 && (
          <>
            <h2>¿Qué necesita tu vehículo?</h2>
            <p>
              Selecciona la opción que más se acerque. Nuestro equipo confirmará
              el diagnóstico en el taller.
            </p>
            <div className="issue-grid">
              {issues.map((x) => (
                <button
                  className={issue === x ? "active" : ""}
                  onClick={() => setIssue(x)}
                  key={x}
                >
                  {x}
                  <span>{issue === x && <Check />}</span>
                </button>
              ))}
            </div>
            <button
              className="next"
              disabled={!issue}
              onClick={() => setStep(2)}
            >
              Continuar <ArrowRight />
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h2>Cuéntanos sobre el vehículo</h2>
            <p>Con estos datos podemos orientarte mejor antes de tu visita.</p>
            <label>
              MARCA, MODELO Y AÑO
              <input
                autoFocus
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                placeholder="Ej: Toyota Corolla 2019"
              />
            </label>
            <label>
              ¿QUÉ SÍNTOMAS PRESENTA?
              <textarea
                value={detail}
                onChange={(e) => setDetail(e.target.value)}
                placeholder="Describe ruidos, testigos, cuándo comenzó..."
              />
            </label>
            <button className="next" onClick={() => setStep(3)}>
              Revisar consulta <ArrowRight />
            </button>
          </>
        )}
        {step === 3 && (
          <>
            <div className="ready">
              <MessageCircle />
            </div>
            <h2>Tu consulta está lista</h2>
            <p>
              La enviaremos ordenada por WhatsApp para que Power Master pueda
              responderte más rápido.
            </p>
            <div className="summary">
              <span>Consulta</span>
              <b>{issue}</b>
              <span>Vehículo</span>
              <b>{vehicle || "Por confirmar"}</b>
            </div>
            <button className="next" onClick={send}>
              Enviar por WhatsApp <ArrowRight />
            </button>
            <small>El diagnóstico definitivo se realiza presencialmente.</small>
          </>
        )}
      </div>
    </div>
  );
}
function ServiceModal({
  service,
  close,
  consult,
}: {
  service: (typeof services)[number];
  close: () => void;
  consult: () => void;
}) {
  const Icon = service.icon;
  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-label={service.title}
    >
      <div className="service-modal">
        <button
          className="close"
          onClick={close}
          aria-label="Cerrar información"
        >
          <X />
        </button>
        <div className="service-modal-head">
          <span>
            <Icon />
          </span>
          <div>
            <small>SERVICIO POWER MASTER</small>
            <h2>{service.title}</h2>
          </div>
        </div>
        <p className="service-description">{service.description}</p>
        <div className="service-modal-body">
          <div>
            <small>¿QUÉ INCLUYE?</small>
            <ul>
              {service.includes.map((item) => (
                <li key={item}>
                  <Check />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <aside>
            <small>¿CUÁNDO SOLICITARLO?</small>
            <p>{service.ideal}</p>
          </aside>
        </div>
        <div className="service-modal-actions">
          <button onClick={consult}>
            Consultar por este servicio <MessageCircle />
          </button>
          <button className="ghost" onClick={close}>
            Seguir explorando
          </button>
        </div>
        <p className="service-disclaimer">
          La reparación y el presupuesto definitivo se confirman luego de la
          evaluación presencial.
        </p>
      </div>
    </div>
  );
}

type ChatMessage = { role: "user" | "assistant"; content: string };
type Lead = {
  name?: string;
  vehicle?: string;
  service?: string;
  symptoms?: string;
  drivable?: string;
  urgency?: string;
  availability?: string;
  location?: string;
  destination?: string;
};

function VirtualAssistant({
  close,
  initialContext,
}: {
  close: () => void;
  initialContext: string;
}) {
  const greeting =
    initialContext && initialContext !== "Consulta general"
      ? `Hola, soy Vale de Power Master 👋 Vi que estás consultando por **${initialContext}**. Contame, ¿qué está pasando con tu vehículo?`
      : "Hola, soy Vale de Power Master 👋 Estoy para orientarte y dejar tu consulta lista para el taller. ¿Qué está pasando con tu vehículo?";
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: greeting },
  ]);
  const [lead, setLead] = useState<Lead>(
    initialContext !== "Consulta general" ? { service: initialContext } : {},
  );
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(
    () => endRef.current?.scrollIntoView({ behavior: "smooth" }),
    [messages, loading],
  );

  const isGreetingOnly = (value: string) =>
    /^(?:hola+|buenas?(?:\s+(?:tardes|noches|d[ií]as))?|holi|hey|buen d[ií]a|c[oó]mo est[aá]n?|saludos)[!.¿?\s]*$/i.test(
      value.trim(),
    );

  const vibrate = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(12);
    }
  };

  const lastAssistantMessage =
    [...messages].reverse().find((message) => message.role === "assistant")
      ?.content || "";
  const quickReplies = (() => {
    if (loading || ready) return [];
    if (/qu[eé] problema|qu[eé] est[aá] pasando|s[ií]ntoma/i.test(lastAssistantMessage))
      return ["Hace un ruido", "No arranca", "Se encendió un testigo"];
    if (/puede circular|qued[oó] inmovilizado|evaluemos una gr[uú]a/i.test(lastAssistantMessage))
      return ["Puede circular", "Está inmovilizado", "Necesito grúa"];
    if (/desde cu[aá]ndo/i.test(lastAssistantMessage))
      return ["Desde hoy", "Hace unos días", "Hace varias semanas"];
    if (/d[ií]a y horario|para cu[aá]ndo|qu[eé] horario/i.test(lastAssistantMessage))
      return ["Hoy", "Mañana en la mañana", "Mañana en la tarde"];
    return [];
  })();

  const fallbackReply = (count: number, value: string) => {
    const lower = value.toLowerCase();
    if (count === 1) {
      if (/fren|chill|ruido|raspa/.test(lower))
        return "Ese ruido o pérdida de frenado suele relacionarse con desgaste de pastillas, discos o una falla hidráulica. Por seguridad conviene revisarlo cuanto antes. ¿Qué marca, modelo y año es el vehículo?";
      if (/calent|temperatura|refrigerante|humo/.test(lower))
        return "Una subida de temperatura puede aparecer por falta de refrigerante, una fuga o una falla en la circulación. Evitá seguir usándolo si vuelve a calentarse. ¿Qué marca, modelo y año es el vehículo?";
      if (/bater|arranca|parte|eléctric|electr/.test(lower))
        return "Cuando cuesta arrancar, la causa puede estar en la batería, el sistema de carga o el motor de partida; hay que medirlo para no cambiar piezas innecesariamente. ¿Qué marca, modelo y año es el vehículo?";
      return "Hay varias causas posibles y conviene revisarlo antes de reemplazar piezas. ¿Qué marca, modelo y año es el vehículo?";
    }
    if (count === 2)
      return "Perfecto, con ese dato ya podemos orientar mejor la revisión. ¿El vehículo puede circular con seguridad o quedó inmovilizado?";
    if (count === 3)
      return "Bien. ¿Desde cuándo ocurre y notaste algún testigo encendido, ruido o cambio adicional?";
    if (count === 4)
      return "Ya tenemos un panorama bastante claro. ¿Para qué día y horario te gustaría solicitar la revisión?";
    if (count === 5)
      return "Perfecto, el horario quedará sujeto a confirmación del taller. ¿A nombre de quién dejamos la consulta?";
    return "Perfecto, ya tengo toda la información. Ahora voy a derivarte con un experto de Power Master para que coordine tu atención por WhatsApp.";
  };

  async function sendMessage(value: string) {
    value = value.trim();
    if (!value || loading) return;
    vibrate();
    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: value },
    ];
    setMessages(nextMessages);
    setInput("");
    if (isGreetingOnly(value)) {
      setMessages([
        ...nextMessages,
        {
          role: "assistant",
          content:
            "¡Hola! Qué bueno que nos escribís. Contame, ¿qué problema o síntoma notaste en tu vehículo?",
        },
      ]);
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: nextMessages,
          context: initialContext,
          lead,
        }),
      });
      if (!response.ok) throw new Error("assistant unavailable");
      const data = await response.json();
      const reply = String(data.reply || "");
      const isReady =
        Boolean(data.ready) ||
        /ya tengo toda la informaci[oó]n|voy a derivarte con un experto/i.test(reply);
      setLead((currentLead) => ({ ...currentLead, ...(data.lead || {}) }));
      setReady(isReady);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: isReady
            ? "Perfecto, ya tengo toda la información. Ahora voy a derivarte con un experto de Power Master para que coordine tu atención por WhatsApp."
            : reply,
        },
      ]);
    } catch {
      const userCount = nextMessages.filter(
        (message) =>
          message.role === "user" && !isGreetingOnly(message.content),
      ).length;
      const shouldBeReady = userCount >= 6;
      setReady(shouldBeReady);
      setMessages((current) => [
        ...current,
        { role: "assistant", content: fallbackReply(userCount, value) },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    void sendMessage(input);
  }

  const sendWhatsApp = () => {
    vibrate();
    const transcript = messages
      .filter((message) => message.role === "user")
      .map((message) => `• ${message.content}`)
      .join("\n");
    const summary = [
      "Hola Power Master, conversé con el asistente virtual y quiero coordinar:",
      "",
      lead.name && `Nombre: ${lead.name}`,
      lead.service && `Servicio / motivo: ${lead.service}`,
      lead.vehicle && `Vehículo: ${lead.vehicle}`,
      lead.symptoms && `Síntomas: ${lead.symptoms}`,
      lead.drivable && `¿Puede circular?: ${lead.drivable}`,
      lead.urgency && `Urgencia: ${lead.urgency}`,
      lead.availability && `Disponibilidad: ${lead.availability}`,
      lead.location && `Ubicación: ${lead.location}`,
      lead.destination && `Destino del traslado: ${lead.destination}`,
      "",
      "Información adicional:",
      transcript,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(
      `${WA}?text=${encodeURIComponent(summary)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const reset = () => {
    vibrate();
    setMessages([{ role: "assistant", content: greeting }]);
    setLead(
      initialContext !== "Consulta general" ? { service: initialContext } : {},
    );
    setReady(false);
  };

  return (
    <div
      className="assistant-shell"
      role="dialog"
      aria-modal="true"
      aria-label="Asistente virtual Power Master"
    >
      <div className="assistant-head">
        <div className="assistant-avatar">
          <img src="/power-master-logo.png" alt="" />
          <i />
        </div>
        <div>
          <b>Vale · Power Master</b>
          <small>Asistente virtual · En línea</small>
        </div>
        <button onClick={reset} aria-label="Reiniciar conversación">
          <RotateCcw />
        </button>
        <button onClick={close} aria-label="Cerrar asistente">
          <X />
        </button>
      </div>
      <div className="assistant-context">
        <Sparkles /> Conversación personalizada para tu vehículo
      </div>
      <div className="assistant-messages">
        {messages.map((message, index) => (
          <div className={`chat-message ${message.role}`} key={index}>
            {message.content.replaceAll("**", "")}
          </div>
        ))}
        {loading && (
          <div className="chat-message assistant typing">
            <small>Analizando tu consulta</small>
            <span />
            <span />
            <span />
          </div>
        )}
        {quickReplies.length > 0 && (
          <div className="assistant-quick-replies" aria-label="Respuestas sugeridas">
            {quickReplies.map((reply) => (
              <button key={reply} onClick={() => void sendMessage(reply)}>
                {reply}
              </button>
            ))}
          </div>
        )}
        {ready && (
          <button className="assistant-whatsapp" onClick={sendWhatsApp}>
            <span>
              <b>Continuar ahora por WhatsApp</b>
              <small>Enviar todos los datos al taller</small>
            </span>
            <MessageCircle />
          </button>
        )}
        <div ref={endRef} />
      </div>
      {!ready && (
        <form className="assistant-input" onSubmit={submit}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Escribí tu mensaje..."
            autoFocus
          />
          <button disabled={!input.trim() || loading} aria-label="Enviar mensaje">
            <Send />
          </button>
        </form>
      )}
      <small className="assistant-legal">
        La evaluación definitiva y el horario se confirman con el taller.
      </small>
    </div>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false),
    [assistantOpen, setAssistantOpen] = useState(false),
    [assistantNudge, setAssistantNudge] = useState(false),
    [assistantContext, setAssistantContext] = useState("Consulta general"),
    [selected, setSelected] = useState<(typeof services)[number] | null>(null);
  useEffect(() => {
    const timer = window.setTimeout(() => setAssistantNudge(true), 45000);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".section-head, .service-grid article, .services-note, .tow-art, .tow-copy, .trust-visual, .trust-copy, .prepurchase > div, .prepurchase aside, .cta > div:last-child, .contact-copy, .contact-map, .footer-main > *",
      ),
    );
    document.documentElement.classList.add("reveal-enabled");
    elements.forEach((element, index) => {
      element.classList.add("reveal-item");
      if (
        element.matches(
          ".service-grid article, .trust-visual, .prepurchase aside, .contact-map",
        )
      ) {
        element.classList.add("reveal-scale");
      } else {
        element.classList.add(index % 2 === 0 ? "reveal-left" : "reveal-right");
      }
      element.style.setProperty("--reveal-delay", `${(index % 4) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );
    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("reveal-enabled");
    };
  }, []);
  const open = (context = "Consulta general") => {
    setAssistantNudge(false);
    setAssistantContext(context);
    setAssistantOpen(true);
  };
  const serviceConsult = () => {
    const context = selected?.title || "Consulta general";
    setSelected(null);
    open(context);
  };
  return (
    <main>
      <header className="nav">
        <a className="brand" href="#inicio">
          <img src="/power-master-logo.png" alt="Power Master Chile" />
          <span>
            <b>POWER MASTER</b>
            <small>SERVICIO TÉCNICO AUTOMOTRIZ</small>
          </span>
        </a>
        <nav className={menu ? "open" : ""}>
          <a href="#servicios">Servicios</a>
          <a href="#grua">Grúa</a>
          <a href="#confianza">Por qué elegirnos</a>
          <a href="#precompra">Precompra</a>
          <a href="#contacto">Contacto</a>
          <button className="nav-cta" onClick={() => open("Reserva de hora")}>
            Reservar hora <ArrowRight />
          </button>
        </nav>
        <button className="menu" onClick={() => setMenu(!menu)}>
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <section className="hero" id="inicio">
        <video
          className="hero-image"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          disablePictureInPicture
        >
          <source
            src="https://res.cloudinary.com/dvvuwigmy/video/upload/f_mp4,q_auto:good,vc_h264/v1787811551/copy_F49A7FF6-8EA8-4252-ACCE-724D9FC57779_uzio8y.mp4"
            type="video/mp4"
          />
          <source
            src="https://res.cloudinary.com/dvvuwigmy/video/upload/v1787811551/copy_F49A7FF6-8EA8-4252-ACCE-724D9FC57779_uzio8y.mov"
            type="video/quicktime"
          />
        </video>
        <div className="hero-grid" />
        <div className="hero-shade" />
        <div className="hero-content">
          <div className="eyebrow">
            <span /> SERVICIO TÉCNICO AUTOMOTRIZ · TEMUCO
          </div>
          <h1>
            Tu vehículo,
            <br />
            <em>en manos expertas.</em>
          </h1>
          <p>
            Diagnóstico preciso, soluciones transparentes y atención profesional
            para que vuelvas a la ruta con total confianza.
          </p>
          <div className="hero-actions">
            <button onClick={() => open("Diagnóstico del vehículo")}>
              Diagnóstico Express <Zap />
            </button>
            <a href="#servicios">
              Explorar servicios <ChevronDown />
            </a>
          </div>
          <div className="hero-proof">
            <div>
              <ShieldCheck />
              <span>
                <b>Calidad y confianza</b>
                <small>Servicio técnico integral</small>
              </span>
            </div>
            <div>
              <Clock3 />
              <span>
                <b>Atención eficiente</b>
                <small>Orientación directa</small>
              </span>
            </div>
            <a
              className="google-rating"
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="Ver el perfil de Power Master Chile en Google Maps"
            >
              <span className="google-mark">G</span>
              <span>
                <b>Opiniones en Google</b>
                <small className="google-stars" aria-label="Cinco estrellas">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} fill="currentColor" />
                  ))}
                </small>
              </span>
              <ArrowRight className="google-arrow" />
            </a>
          </div>
        </div>
        <div className="hero-side">
          <span>DESLIZA PARA CONOCER MÁS</span>
          <i />
        </div>
      </section>
      <section className="quickbar">
        <div>
          <MapPin />
          <span>
            <small>ENCUÉNTRANOS</small>
            <b>General Pedro Lagos #173, Temuco</b>
          </span>
        </div>
        <div>
          <MessageCircle />
          <span>
            <small>ATENCIÓN DIRECTA</small>
            <b>Agenda y consulta por WhatsApp</b>
          </span>
        </div>
        <button onClick={() => open("Evaluación del vehículo")}>
          Evaluar mi vehículo <ArrowRight />
        </button>
      </section>
      <section className="section" id="servicios">
        <div className="section-head">
          <div>
            <span className="kicker">SERVICIO 360°</span>
            <h2>
              Todo lo que tu vehículo necesita,
              <br />
              <em>en un solo lugar.</em>
            </h2>
          </div>
          <p>
            Desde una mantención preventiva hasta una falla compleja. Revisamos,
            explicamos y resolvemos con criterio técnico. Abre cada servicio
            para conocer su alcance.
          </p>
        </div>
        <div className="service-grid">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                onClick={() => setSelected(service)}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setSelected(service)}
              >
                <img
                  className="service-bg"
                  src={service.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
                <span className="number">0{i + 1}</span>
                <Icon />
                <h3>{service.title}</h3>
                <p>{service.intro}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelected(service);
                  }}
                  aria-label={`Ver información de ${service.title}`}
                >
                  <span>VER MÁS</span>
                  <ArrowRight />
                </button>
              </article>
            );
          })}
        </div>
        <div className="services-note">
          <Sparkles />
          <p>
            <b>¿No encuentras el servicio que buscas?</b> Trabajamos muchas más
            soluciones automotrices. Cuéntanos qué le pasa a tu vehículo.
          </p>
          <button onClick={() => open("Consulta sobre otro servicio")}>
            Realizar consulta
          </button>
        </div>
      </section>
      <section className="tow" id="grua">
        <div className="tow-art">
          <img
            className="tow-photo"
            src="https://res.cloudinary.com/dvvuwigmy/image/upload/f_auto,q_auto,w_1200/v1787810096/IMG_0866_dljosi.jpg"
            alt="Servicio de grúa de Power Master Chile"
            loading="lazy"
          />
          <div className="tow-road" />
          <span className="tow-badge">
            <b>ASISTENCIA</b>
            <small>TRASLADO SEGURO</small>
          </span>
        </div>
        <div className="tow-copy">
          <span className="kicker">SERVICIO DE GRÚA</span>
          <h2>
            Cuando tu vehículo no puede seguir,
            <br />
            <em>nosotros lo llevamos.</em>
          </h2>
          <p>
            Power Master cuenta con servicio de grúa para coordinar el traslado
            seguro de vehículos inmovilizados. Puedes solicitar asistencia ante
            una panne, un problema de arranque, un choque o cualquier situación
            en la que continuar conduciendo no sea seguro.
          </p>
          <div className="tow-features">
            <div>
              <Navigation />
              <span>
                <b>Coordinación directa</b>
                <small>Envíanos tu ubicación y destino por WhatsApp.</small>
              </span>
            </div>
            <div>
              <ShieldCheck />
              <span>
                <b>Traslado responsable</b>
                <small>Tu vehículo se moviliza de manera segura.</small>
              </span>
            </div>
            <div>
              <Wrench />
              <span>
                <b>Grúa + taller</b>
                <small>Podemos recibirlo y continuar con el diagnóstico.</small>
              </span>
            </div>
          </div>
          <div className="tow-actions">
            <a
              href={TOW_PHONE ? `tel:${TOW_PHONE}` : "tel:"}
              className={!TOW_PHONE ? "needs-phone" : ""}
              title={
                !TOW_PHONE
                  ? "Configurar NEXT_PUBLIC_TOW_PHONE en Vercel"
                  : "Llamar a la grúa"
              }
            >
              Llamar a la grúa <Phone />
            </a>
            <a
              className="tow-whatsapp"
              href={`${WA}?text=${encodeURIComponent("Hola Power Master, necesito solicitar el servicio de grúa. Mi ubicación actual es: ")}`}
              target="_blank"
            >
              Pedir por WhatsApp <MessageCircle />
            </a>
          </div>
          <small className="tow-note">
            Disponibilidad, cobertura y valor del traslado sujetos a
            confirmación.
          </small>
        </div>
      </section>
      <section className="trust" id="confianza">
        <div className="trust-visual">
          <img
            className="trust-image"
            src="https://res.cloudinary.com/dvvuwigmy/image/upload/f_auto,q_auto,w_1200/v1787809905/Captura_hnf5a4.png"
            alt="Trabajo técnico en Power Master Chile"
            loading="lazy"
          />
        </div>
        <div className="trust-copy">
          <span className="kicker">NUESTRO ESTÁNDAR</span>
          <h2>
            No adivinamos.
            <br />
            <em>Diagnosticamos.</em>
          </h2>
          <p className="lead">
            Cada reparación comienza entendiendo la causa. Así evitamos cambios
            innecesarios y te damos información clara para decidir.
          </p>
          <div className="trust-list">
            {[
              [
                "01",
                "Evaluación técnica",
                "Revisamos síntomas y antecedentes.",
              ],
              [
                "02",
                "Diagnóstico transparente",
                "Te explicamos qué encontramos y cómo resolverlo.",
              ],
              [
                "03",
                "Trabajo con respaldo",
                "Intervención profesional y revisión final.",
              ],
            ].map((x) => (
              <div key={x[0]}>
                <b>{x[0]}</b>
                <span>
                  <strong>{x[1]}</strong>
                  <small>{x[2]}</small>
                </span>
              </div>
            ))}
          </div>
          <button onClick={() => open("Diagnóstico del vehículo")}>
            Comenzar diagnóstico <ArrowRight />
          </button>
        </div>
      </section>
      <section className="prepurchase" id="precompra">
        <div>
          <span className="kicker">COMPRA CON SEGURIDAD</span>
          <h2>
            Antes de comprarlo,
            <br />
            <em>conócelo de verdad.</em>
          </h2>
          <p>
            Nuestra revisión precompra analiza el estado general del vehículo y
            sus sistemas clave para detectar señales que una prueba rápida puede
            ocultar.
          </p>
          <ul>
            <li>
              <Check /> Inspección visual y mecánica
            </li>
            <li>
              <Check /> Escáner y revisión de parámetros
            </li>
            <li>
              <Check /> Informe claro para tomar una decisión
            </li>
          </ul>
          <button onClick={() => open("Revisión precompra")}>
            Solicitar revisión precompra <ArrowRight />
          </button>
        </div>
        <aside>
          <img
            className="prepurchase-image"
            src="https://res.cloudinary.com/dvvuwigmy/image/upload/f_auto,q_auto,w_1000/v1787810181/IMG_0867_j6a7lx.jpg"
            alt="Revisión precompra 360 grados en Power Master Chile"
            loading="lazy"
          />
          <span>REVISIÓN</span>
          <strong>360°</strong>
          <p>
            Una pequeña revisión hoy puede evitar una gran reparación mañana.
          </p>
          <Car />
        </aside>
      </section>
      <section className="cta" id="contacto">
        <div className="cta-lines" />
        <div>
          <span className="kicker">POWER MASTER CHILE</span>
          <h2>
            Tu vehículo merece un diagnóstico correcto.
            <br />
            <em>No cambios por prueba y error.</em>
          </h2>
          <p>
            Cuéntanos qué está pasando y nuestro asistente organizará la
            consulta para que el equipo pueda ayudarte sin hacerte repetir toda
            la información.
          </p>
          <div>
            <button onClick={() => open("Consulta para agendar")}>
              Hablar con el asistente <Zap />
            </button>
            <a className="cta-secondary" href={`tel:${TOW_PHONE}`}>
              <Phone /> Llamar al taller
            </a>
            <button
              className="cta-secondary"
              onClick={() => open("Necesito una grúa")}
            >
              <Truck /> Solicitar grúa
            </button>
          </div>
        </div>
      </section>
      <section className="contact-section" aria-labelledby="contact-title">
        <div className="contact-copy">
          <span className="kicker">CONTACTO Y UBICACIÓN</span>
          <h2 id="contact-title">
            Estamos en Temuco.
            <br />
            <em>Ven a conocernos.</em>
          </h2>
          <p>
            Visítanos en General Pedro Lagos #173. También puedes escribirnos,
            llamarnos o iniciar una consulta con nuestro asistente virtual.
          </p>
          <div className="contact-links">
            <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer">
              <MessageCircle />
              <span><small>WHATSAPP</small><b>+56 9 7799 7536</b></span>
            </a>
            <a href={`mailto:${EMAIL}`}>
              <Mail />
              <span><small>CORREO</small><b>{EMAIL}</b></span>
            </a>
            <a href={MAPS_URL} target="_blank" rel="noreferrer">
              <MapPin />
              <span><small>DIRECCIÓN</small><b>General Pedro Lagos #173</b></span>
            </a>
          </div>
        </div>
        <div className="contact-map">
          <iframe
            src="https://www.google.com/maps?q=General%20Pedro%20Lagos%20173%2C%20Temuco%2C%20Chile&output=embed"
            title="Ubicación de Power Master Chile en Google Maps"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a href={MAPS_URL} target="_blank" rel="noreferrer">
            Abrir en Google Maps <ArrowRight />
          </a>
        </div>
      </section>
      <footer>
        <div className="footer-main">
          <div className="footer-brand">
            <img src="/power-master-logo.png" alt="Power Master Chile" />
            <p>
              Servicio técnico automotriz, productos y asistencia para llegar
              donde quieras llegar.
            </p>
          </div>
          <div>
            <span>VISÍTANOS</span>
            <a
              href={MAPS_URL}
              target="_blank"
            >
              General Pedro Lagos #173
              <br />
              Temuco, Chile
            </a>
          </div>
          <div>
            <span>CONECTA</span>
            <a href="https://instagram.com/powermasterchile" target="_blank">
              Instagram
            </a>
            <button
              className="footer-chat"
              onClick={() => open("Consulta por WhatsApp")}
            >
              Asistente virtual
            </button>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Power Master Chile</span>
          <span>Donde quieras llegar.</span>
        </div>
      </footer>
      {assistantNudge && !assistantOpen && (
        <div
          className="assistant-nudge"
          onClick={() => open("Consulta general")}
          role="button"
          tabIndex={0}
          onKeyDown={(event) =>
            event.key === "Enter" && open("Consulta general")
          }
        >
          <button
            className="assistant-nudge-close"
            onClick={(event) => {
              event.stopPropagation();
              setAssistantNudge(false);
            }}
            aria-label="Cerrar mensaje"
          >
            <X />
          </button>
          <span>El asistente está para ayudarte</span>
          <ArrowRight className="assistant-nudge-arrow" />
        </div>
      )}
      <button
        className="floating-wa"
        onClick={() => open("Consulta general")}
        aria-label="Abrir asistente virtual de Power Master"
      >
        <img src="/power-master-logo.png" alt="" />
        <i aria-hidden="true" />
      </button>
      {selected && (
        <ServiceModal
          service={selected}
          close={() => setSelected(null)}
          consult={serviceConsult}
        />
      )}{" "}
      {assistantOpen && (
        <VirtualAssistant
          key={assistantContext}
          initialContext={assistantContext}
          close={() => setAssistantOpen(false)}
        />
      )}
    </main>
  );
}
