# 🔐 ¿Ya caíste? — Detecta el Phishing

> App educativa e interactiva sobre ciberseguridad para la Feria de Ciberseguridad 2025

![Phishing Detector](https://img.shields.io/badge/Estado-Activo-green) ![Offline](https://img.shields.io/badge/Funciona-Offline-blue) ![Responsive](https://img.shields.io/badge/Mobile-100%25%20Responsive-purple)

## 🚀 Demo en vivo
Disponible en: `https://tu-sitio.netlify.app` *(configura después del despliegue)*

---

## 📱 Características

- ✅ **100% responsiva** — funciona perfectamente en móvil, tablet y desktop
- ✅ **Funciona offline** — no necesita internet para correr
- ✅ **8 preguntas interactivas** con casos reales de Venezuela
- ✅ **6 secciones de contenido** (Inicio, Intro, Quiz, Casos, Tips, Resultado)
- ✅ **Animaciones y efectos** de ciberseguridad (glitch, scan, pulse)
- ✅ **Diseño dark** con paleta profesional de ciberseguridad

---

## 🗂 Estructura del proyecto

```
phishing-app/
├── index.html          # App principal
├── css/
│   └── styles.css      # Todos los estilos
├── js/
│   ├── questions.js    # Banco de 8 preguntas
│   └── app.js          # Lógica de la app
└── README.md
```

---

## 🔧 Cómo correr localmente

### Opción 1: Abrir directo (sin servidor)
```bash
# Solo abre el archivo en tu navegador
open index.html
# o doble clic en index.html desde el explorador de archivos
```

### Opción 2: Con servidor local (recomendado)
```bash
# Python 3
python3 -m http.server 3000

# Node.js (si tienes npx)
npx serve .

# Luego abre: http://localhost:3000
```

---

## 🌐 Desplegar en Netlify (paso a paso)

### Método 1: Drag & Drop (más fácil)
1. Ve a [netlify.com](https://netlify.com) y crea una cuenta gratis
2. En el dashboard, arrastra la carpeta `phishing-app/` al área de deploy
3. ¡Listo! Netlify te da una URL automáticamente

### Método 2: Desde GitHub (recomendado)
1. Crea un repositorio nuevo en GitHub
2. Sube todos los archivos:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Phishing Detector App"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/phishing-app.git
   git push -u origin main
   ```
3. En Netlify → "New site from Git" → Selecciona tu repo
4. Build settings: déjalo todo en blanco (es HTML puro)
5. Deploy → obtén tu URL personalizable

### Personalizar URL en Netlify
- Ve a Site settings → Domain management
- Cambia a algo como: `phishing-detector-vzla.netlify.app`

---

## 📲 Usar en el evento con Wi-Fi

Si hay Wi-Fi en el evento:
1. Despliega en Netlify con anticipación
2. Genera un **código QR** con la URL de Netlify
3. Pon el QR en el cartel del stand
4. Los visitantes escanean y usan la app desde su teléfono

Si **no** hay internet:
1. La app funciona perfectamente abriendo `index.html` en el navegador del equipo
2. También puedes levantar un servidor local con Python y compartir la IP local

---

## 🎓 Contenido educativo

### Secciones de la app
| Sección | Contenido |
|---------|-----------|
| 🏠 Inicio | Hero impactante con estadísticas de phishing en Venezuela |
| 📖 Introducción | Qué es el phishing, cómo llega, casos venezolanos |
| 🧪 Test interactivo | 8 preguntas con casos reales, feedback inmediato |
| 🗃 Casos reales | Banco de Venezuela, Bicentenario, Mercantil, Wi-Fi, WhatsApp |
| 🛡 Tips | 6 medidas de protección + qué hacer si ya fuiste víctima |
| 🏆 Resultado | Puntuación con nivel de vulnerabilidad personalizado |

### Casos reales cubiertos
- Correo phishing del Banco de Venezuela
- Smishing (SMS falso) de bloqueo de cuenta
- Llamadas +592 de "empleados bancarios"
- Páginas web clonadas de bancos venezolanos
- Redes Wi-Fi públicas falsas (Evil Twin)
- Phishing por WhatsApp a través de contactos infectados
- Falsos sorteos y premios en redes sociales
- Diferencia HTTP vs HTTPS

---

## 🤝 Créditos

Desarrollado para la **Feria de Ciberseguridad 2025**  
Proyecto académico — Sección de Ciberseguridad

---

## 📜 Licencia

Libre para uso educativo.
