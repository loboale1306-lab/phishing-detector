// ════════════════════════════════════════════════════
//   PHISHING DETECTOR — APP LOGIC
// ════════════════════════════════════════════════════

// ─── MÓDULO SCARE SCREEN ─────────────────────────────
// Fase 1: Alerta visual (3s) → Fase 2: Revelación educativa

let scareDone = false;
let audioCtx  = null;

function runScareScreen() {
  startMatrixRain();

  // Barra de progreso que llena en 3 segundos
  const barFill = document.getElementById('scare-bar-fill');
  let pct = 0;
  const barInterval = setInterval(() => {
    pct = Math.min(pct + 2.2, 100);
    if (barFill) barFill.style.width = pct + '%';
    if (pct >= 100) clearInterval(barInterval);
  }, 66);

  // Vibración corta e impactante (3 pulsos)
  if (navigator.vibrate) {
    navigator.vibrate([200, 80, 200, 80, 400]);
  }

  // Sonido de alerta al inicio
  playAlertSound();

  // A los 3s → mostrar revelación
  setTimeout(showReveal, 3000);
}

function showReveal() {
  const phaseAlert  = document.getElementById('phase-alert');
  const phaseReveal = document.getElementById('phase-reveal');
  const flashEl     = document.getElementById('scare-flash');

  if (flashEl) {
    flashEl.style.animation = 'none';
    flashEl.style.opacity   = '0';
  }

  // Vibración suave de alivio
  if (navigator.vibrate) navigator.vibrate([60, 60, 60]);

  if (phaseAlert)  phaseAlert.classList.add('hidden');
  if (phaseReveal) phaseReveal.classList.remove('hidden');
}

function endScareScreen() {
  if (scareDone) return;
  scareDone = true;

  const scare = document.getElementById('scare-screen');
  if (scare) {
    scare.classList.add('done');
    setTimeout(() => {
      scare.style.display = 'none';
      setTimeout(runAttackSequence, 300);
    }, 450);
  }
}

// ─── SONIDO (Web Audio API — sin archivos externos) ──
function getAudioCtx() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch(e) { return null; }
  }
  return audioCtx;
}

function playAlertSound() {
  const ctx = getAudioCtx();
  if (!ctx) return;

  // Dos pitidos cortos y secos
  [0, 0.35].forEach(t => {
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'square';
    osc.frequency.value = 740;
    gain.gain.setValueAtTime(0.07, ctx.currentTime + t);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + t + 0.25);
    osc.start(ctx.currentTime + t);
    osc.stop(ctx.currentTime  + t + 0.25);
  });
}

// ─── MATRIX RAIN (Canvas) ────────────────────────────
function startMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  const ctx     = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const fontSize = 14;
  const cols     = Math.floor(canvas.width / fontSize);
  const drops    = Array(cols).fill(1);
  const chars    = '01アイウエオカキクアクセスデータ';

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.07)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px monospace';
    drops.forEach((y, i) => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillStyle = i % 3 === 0 ? '#ff6688' : '#ff0022';
      ctx.fillText(char, i * fontSize, y * fontSize);
      if (y * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }

  const id = setInterval(draw, 42);
  setTimeout(() => clearInterval(id), 4200);
}


// ─── Secuencia de terminal (Hero) ────────────────────
const ATTACK_SCRIPT = [
  { text: "$ conectando a Wi-Fi: \"Evento_CiberSeguridad_Free\"...", type: "prompt",  pause: 500 },
  { text: "✓ Conexión establecida. IP asignada: 192.168.4.117",    type: "success", pause: 600 },
  { text: "",                                                        type: "info",    pause: 200 },
  { text: "$ víctima abre: bancodevenezuela-verificacion.net",      type: "prompt",  pause: 700 },
  { text: "→ Cargando portal de inicio de sesión falso...",         type: "info",    pause: 500 },
  { text: "→ Logo institucional clonado ✓",                         type: "info",    pause: 400 },
  { text: "→ Formulario de cédula y clave listo ✓",                 type: "info",    pause: 400 },
  { text: "",                                                        type: "info",    pause: 200 },
  { text: "$ víctima ingresa sus datos...",                         type: "warn",    pause: 700 },
  { text: "  cédula:    V-2█████4█5",                               type: "warn",    pause: 350 },
  { text: "  clave:     ●●●●●●●●",                                  type: "warn",    pause: 350 },
  { text: "  [ENVIAR] →",                                           type: "warn",    pause: 600 },
  { text: "",                                                        type: "info",    pause: 200 },
  { text: "⚡ CAPTURANDO CREDENCIALES...",                          type: "danger",  pause: 800 },
  { text: "✓ Datos enviados a servidor remoto",                     type: "danger",  pause: 500 },
  { text: "✓ Acceso a cuenta bancaria: CONCEDIDO",                  type: "danger",  pause: 600 },
  { text: "",                                                        type: "info",    pause: 300 },
  { text: "La víctima nunca lo supo.",                              type: "danger",  pause: 900 },
];

let attackIndex   = 0;
let attackSkipped = false;

function runAttackSequence() {
  const body     = document.getElementById('terminal-body');
  const meter    = document.getElementById('attack-meter-bar');
  const pctLabel = document.getElementById('attack-meter-pct');

  if (!body || attackSkipped) return;

  if (attackIndex >= ATTACK_SCRIPT.length) {
    setTimeout(revealHero, 600);
    return;
  }

  const step = ATTACK_SCRIPT[attackIndex];
  const line = document.createElement('div');
  line.className = `term-line term-${step.type}`;
  line.textContent = step.text;
  body.appendChild(line);
  body.scrollTop = body.scrollHeight;

  const pct = Math.round(((attackIndex + 1) / ATTACK_SCRIPT.length) * 100);
  if (meter)    meter.style.width    = pct + '%';
  if (pctLabel) pctLabel.textContent = pct + '%';

  attackIndex++;
  setTimeout(runAttackSequence, step.pause);
}

function skipAttackSequence() {
  attackSkipped = true;
  revealHero();
}

function revealHero() {
  const seq    = document.getElementById('attack-sequence');
  const reveal = document.getElementById('hero-reveal');
  if (seq)    seq.classList.add('hidden');
  if (reveal) reveal.classList.remove('hidden');
}


// ─── Screen Navigation ───────────────────────────────
let currentScreen = 'screen-hero';
let currentQuestion = 0;
let score           = 0;
let answered        = false;
let quizStarted     = false;

function goToScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (!target) return;
  target.classList.add('active');
  currentScreen = id;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  document.querySelectorAll('.nav-item').forEach(n => {
    n.classList.toggle('active', n.dataset.screen === id);
  });

  if (id === 'screen-result') showResult();
}

function navTo(id) {
  if (id === 'screen-quiz' && !quizStarted) {
    goToScreen('screen-intro');
    return;
  }
  goToScreen(id);
}


// ─── Quiz Logic ───────────────────────────────────────
function startQuiz() {
  currentQuestion = 0;
  score           = 0;
  answered        = false;
  quizStarted     = true;
  goToScreen('screen-quiz');
  renderQuestion();
}

function renderQuestion() {
  const q = QUESTIONS[currentQuestion];
  if (!q) { goToScreen('screen-cases'); return; }

  answered = false;

  document.getElementById('question-counter').textContent =
    `Pregunta ${currentQuestion + 1} de ${QUESTIONS.length}`;
  document.getElementById('score-display').textContent = `⚡ ${score} pts`;

  const pct = (currentQuestion / QUESTIONS.length) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';

  document.getElementById('feedback-panel').classList.add('hidden');

  const scanEl = document.getElementById('scanning-effect');
  scanEl.classList.remove('hidden');

  setTimeout(() => {
    scanEl.classList.add('hidden');
    renderQuestionContent(q);
  }, 700);
}

function renderQuestionContent(q) {
  const contentEl = document.getElementById('question-content');
  const optionsEl = document.getElementById('answer-options');

  let previewHTML = '';
  if (q.preview) {
    if (q.preview.type === 'email') {
      previewHTML = `
        <div class="q-preview">
          <div class="from">De: <span>${q.preview.from}</span></div>
          <div class="subject">${q.preview.subject}</div>
          <div class="body">${q.preview.body}</div>
          <div class="url-line">🔗 ${q.preview.url}</div>
        </div>`;
    } else if (q.preview.type === 'sms') {
      previewHTML = `
        <div class="q-sms">
          <div class="sms-bubble">${q.preview.body}</div>
        </div>`;
    } else if (q.preview.type === 'wifi') {
      previewHTML = `
        <div class="q-preview">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;">
            <span style="color:var(--green);font-size:18px;">📶</span>
            <span style="font-family:var(--font-mono);color:var(--green);">${q.preview.ssid}</span>
          </div>
          <div style="color:var(--red);font-size:13px;">⚠ ${q.preview.request}</div>
        </div>`;
    }
  }

  contentEl.innerHTML = `
    <div class="question-type-tag">${q.tag}</div>
    <p class="question-text">${q.question}</p>
    ${previewHTML}
  `;

  if (q.type === 'url') {
    optionsEl.innerHTML = q.options.map((opt, i) => `
      <button class="answer-btn" onclick="handleURLAnswer(${i}, ${opt.safe})">
        <span class="answer-letter">${String.fromCharCode(65 + i)}</span>
        <span style="font-family:var(--font-mono);font-size:13px;word-break:break-all;">${opt.text}</span>
      </button>
    `).join('');
  } else {
    optionsEl.innerHTML = q.options.map((opt, i) => `
      <button class="answer-btn" onclick="handleAnswer(${i})">
        <span class="answer-letter">${String.fromCharCode(65 + i)}</span>
        <span>${opt}</span>
      </button>
    `).join('');
  }
}

function handleAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q    = QUESTIONS[currentQuestion];
  const btns = document.querySelectorAll('.answer-btn');
  const isCorrect = selectedIndex === q.correct;

  btns.forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === q.correct) btn.classList.add('correct');
    else if (i === selectedIndex && !isCorrect) btn.classList.add('wrong');
  });

  if (isCorrect) score++;
  showFeedback(isCorrect, q);
}

function handleURLAnswer(selectedIndex) {
  if (answered) return;
  answered = true;

  const q    = QUESTIONS[currentQuestion];
  const btns = document.querySelectorAll('.answer-btn');
  const isCorrect = selectedIndex === q.correct;

  btns.forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === q.correct) btn.classList.add('correct');
    else if (i === selectedIndex && !isCorrect) btn.classList.add('wrong');
  });

  if (isCorrect) score++;
  showFeedback(isCorrect, q);
}

function showFeedback(isCorrect, q) {
  const panel   = document.getElementById('feedback-panel');
  const iconEl  = document.getElementById('feedback-icon');
  const titleEl = document.getElementById('feedback-title');
  const expEl   = document.getElementById('feedback-explanation');
  const tipsEl  = document.getElementById('feedback-tips');
  const nextBtn = document.getElementById('next-btn');

  iconEl.textContent  = isCorrect ? '✅' : '❌';
  titleEl.textContent = isCorrect ? '¡Correcto! Buen ojo.' : 'No era esa. Esto es lo que debes saber:';
  titleEl.style.color = isCorrect ? 'var(--green)' : 'var(--red)';

  expEl.textContent = q.explanation;

  tipsEl.innerHTML = q.tips.map(tip => `<li>${tip}</li>`).join('');

  const isLast = currentQuestion === QUESTIONS.length - 1;
  nextBtn.textContent = isLast ? 'Ver casos reales →' : 'Siguiente →';
  nextBtn.onclick = isLast
    ? () => goToScreen('screen-cases')
    : () => nextQuestion();

  panel.classList.remove('hidden');
  setTimeout(() => {
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 100);
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= QUESTIONS.length) {
    goToScreen('screen-cases');
    return;
  }
  renderQuestion();
  document.getElementById('quiz-card').scrollIntoView({ behavior: 'smooth' });
}


// ─── Result Screen ────────────────────────────────────
function showResult() {
  const total = QUESTIONS.length;
  let badge, title, subtitle, message, borderColor;

  if (score === 4) {
    badge       = '🏆';
    title       = '¡Imposible de engañar!';
    subtitle    = 'Puntuación perfecta: 4 de 4';
    message     = 'Detectaste los 4 ataques sin fallar. Eres exactamente el tipo de usuario que los ciberatacantes evitan. Enséñales esto a tu familia — ellos también lo necesitan.';
    borderColor = 'var(--green)';
  } else if (score === 3) {
    badge       = '🛡️';
    title       = '¡Casi perfecto!';
    subtitle    = 'Puntuación: 3 de 4';
    message     = 'Detectaste casi todos los ataques. Solo uno te pasó por alto — revisa los casos reales para identificar cuál fue tu punto débil y ya serás imparable.';
    borderColor = 'var(--green)';
  } else if (score === 2) {
    badge       = '⚠️';
    title       = 'Vulnerable a la mitad';
    subtitle    = 'Puntuación: 2 de 4';
    message     = 'Tienes algo de instinto, pero la mitad de los ataques te habrían funcionado. Justo esos son los que más usan en Venezuela ahora mismo. Revisa los casos reales.';
    borderColor = 'var(--yellow)';
  } else {
    badge       = '🎣';
    title       = 'Te habrían atrapado';
    subtitle    = `Puntuación: ${score} de 4`;
    message     = 'No te preocupes — ahora ya sabes lo que no sabías. Para eso existe esta app. Revisa los casos reales y los tips: la próxima vez, nadie te engaña.';
    borderColor = 'var(--red)';
  }

  document.getElementById('result-badge').textContent    = badge;
  document.getElementById('result-title').textContent    = title;
  document.getElementById('result-subtitle').textContent = subtitle;
  document.getElementById('result-message').textContent  = message;
  document.getElementById('final-score').textContent     = score;

  const circle = document.getElementById('score-circle');
  circle.style.borderColor = borderColor;
  circle.style.boxShadow   = `0 0 40px ${borderColor}44`;
}


// ─── Restart ──────────────────────────────────────────
function restartApp() {
  currentQuestion = 0;
  score           = 0;
  answered        = false;
  quizStarted     = false;
  scareDone       = false;
  attackIndex     = 0;
  attackSkipped   = false;
  goToScreen('screen-hero');

  const body     = document.getElementById('terminal-body');
  const meter    = document.getElementById('attack-meter-bar');
  const pctLabel = document.getElementById('attack-meter-pct');
  const seq      = document.getElementById('attack-sequence');
  const reveal   = document.getElementById('hero-reveal');
  if (body)     body.innerHTML        = '';
  if (meter)    meter.style.width     = '0%';
  if (pctLabel) pctLabel.textContent  = '0%';
  if (seq)      seq.classList.remove('hidden');
  if (reveal)   reveal.classList.add('hidden');

  setTimeout(runAttackSequence, 400);
}


// ─── Init ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  goToScreen('screen-hero');
  runScareScreen();
});
