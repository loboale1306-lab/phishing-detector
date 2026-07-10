// ════════════════════════════════════════════════════
//   PREGUNTAS DEL QUIZ — 4 casos seleccionados
//   Criterio: máximo impacto, mínimo tiempo, variedad
// ════════════════════════════════════════════════════

const QUESTIONS = [

  // ─── PREGUNTA 1: CORREO FALSO ────────────────────
  {
    id: 1,
    type: "opciones",
    tag: "📧 Correo sospechoso",
    question: "Recibes este correo a las 2am. ¿Qué haces?",
    preview: {
      type: "email",
      from: "seguridad@banco-de-venezuela.com.info",
      subject: "⚠ URGENTE: Tu cuenta será bloqueada en 24 horas",
      body: "Detectamos actividad inusual. Verifica tus datos AHORA o perderás acceso permanente:",
      url: "http://bdv-verificacion-cliente.net/acceder"
    },
    options: [
      "🖱️ Hago clic rápido para que no bloqueen mi cuenta",
      "🗑️ Lo ignoro y lo elimino — ese dominio es claramente falso",
      "📋 Copio el link y lo abro en otro navegador, más seguro así",
      "📨 Le reenvío el correo al banco para avisarles"
    ],
    correct: 1,
    explanation: "El dominio real del BDV es @bancodevenezuela.com — el '.info' al final lo delata como falso. La urgencia artificial ('24 horas') es la táctica favorita del phishing: que no tengas tiempo de pensar.",
    tips: [
      "Los bancos NUNCA amenazan con bloqueos por correo",
      "Ante la duda, llama directamente al número oficial del banco",
      "Un dominio legítimo no tiene palabras extra: '.com.info' siempre es señal de fraude"
    ]
  },

  // ─── PREGUNTA 2: LLAMADA TELEFÓNICA ─────────────
  {
    id: 2,
    type: "opciones",
    tag: "📞 Llamada recibida",
    question: "Suena tu teléfono. Una voz profesional dice: \"Buenos días, soy Carlos Pérez del Banco Bicentenario. Detectamos un cargo no autorizado de Bs. 4.800 en su cuenta. Para cancelarlo necesito verificar su cédula, fecha de nacimiento y su clave de 4 dígitos...\" ¿Qué haces?",
    options: [
      "📝 Le doy la cédula y fecha, pero NO la clave — eso está bien",
      "📵 Cuelgo de inmediato — ningún banco pide la clave por teléfono",
      "🔒 Le doy todos los datos, suena muy profesional y conoce mi banco",
      "📧 Le pido que me envíe primero un correo para verificar"
    ],
    correct: 1,
    explanation: "NINGÚN banco pide tu clave, PIN ni contraseña por teléfono. Jamás. Que suene profesional no garantiza nada — los atacantes ensayan estos guiones. Cuelga y llama tú al número oficial impreso en tu tarjeta.",
    tips: [
      "Si te piden la clave por cualquier medio, es fraude — 100% de las veces",
      "El banco YA tiene tus datos; no necesita que tú se los des",
      "Reporta estas llamadas a tu banco y a CONATEL"
    ]
  },

  // ─── PREGUNTA 3: IDENTIFICAR URL REAL ───────────
  {
    id: 3,
    type: "url",
    tag: "🔗 ¿Cuál es la URL real?",
    question: "Vas a pagar con tu tarjeta online. ¿Cuál de estas URLs es la del Banco Mercantil legítimo?",
    options: [
      { text: "http://mercantilbanco.com.ve-login.net/acceder", safe: false },
      { text: "https://www.mercantilbanco.com", safe: true },
      { text: "https://mercantil-banco-seguro.com/inicio", safe: false },
      { text: "http://www.mercantilbanco.com.seguro.info", safe: false }
    ],
    correct: 1,
    explanation: "Solo 'https://www.mercantilbanco.com' es el dominio oficial. Los demás añaden palabras extra, guiones o dominios adicionales para confundirte. El truco: lo que importa es lo que está ANTES del primer slash.",
    tips: [
      "Guarda los sitios de tu banco como favoritos y úsalos siempre desde ahí",
      "El HTTPS (candado) ayuda pero no es suficiente — los sitios falsos también lo tienen",
      "Cualquier guion, punto extra o palabra adicional en el dominio es señal de alerta"
    ]
  },

  // ─── PREGUNTA 4: WI-FI PÚBLICA ───────────────────
  {
    id: 4,
    type: "opciones",
    tag: "📶 Wi-Fi pública — ¡como la de hoy!",
    question: "Estás en este evento. Ves una red llamada \"Evento_CiberSeg_Free\". Al conectarte te pide tu usuario y contraseña de Instagram para acceder. ¿Qué haces?",
    preview: {
      type: "wifi",
      ssid: "Evento_CiberSeg_Free",
      request: "Inicia sesión con Instagram para conectarte a internet"
    },
    options: [
      "📱 Pongo mi Instagram — necesito el internet para algo rápido",
      "🤫 Pongo una cuenta falsa para poder conectarme igual",
      "❌ Cierro eso — ninguna red legítima pide tus redes sociales",
      "🤷 Pregunto a alguien del evento si esa red es la oficial"
    ],
    correct: 2,
    explanation: "Esto se llama ataque 'Evil Twin' — una red Wi-Fi falsa diseñada para robar credenciales. Los portales legítimos solo piden aceptar condiciones de uso, NUNCA la contraseña de tus redes sociales. Con una cuenta falsa igual te pueden instalar malware.",
    tips: [
      "Ninguna red pública legítima pide contraseñas de redes sociales",
      "Usa tus datos móviles para operaciones importantes, no el Wi-Fi público",
      "Si usas Wi-Fi pública, activa una VPN para cifrar tu conexión"
    ]
  }

];
