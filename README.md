# RE!V Studio — Portafolio

Portafolio web del creador del repo (diseñador gráfico) para mostrar sus trabajos de
**3D, edición de video, diseño gráfico y fotografía**.

> ¿Eres una persona o IA nueva en el proyecto? Lee este archivo completo antes de tocar código.
> Las secciones "Problemas conocidos" y "Estado y próximos pasos" dicen en qué vamos.

---

## Objetivo y reglas del proyecto

1. **Costo cero.** No pagamos ningún servicio. Todo debe caber en planes gratuitos.
   (Único gasto opcional futuro: un dominio propio, ~10 USD/año.)
2. **El creador no es programador.** Solo debe editar `projects.js` (datos) y subir archivos a `assets/`.
   Cualquier función nueva debe configurarse desde `projects.js`, nunca obligarlo a tocar HTML/CSS/JS.
3. **Sitio estático.** HTML + CSS + JS puro, sin framework, sin build, sin backend ni base de datos.
   Se abre con doble clic en `index.html` y se publica tal cual.
4. **Liviano.** Mucho material visual → hay que cuidar el peso de imágenes y videos (ver estrategia de medios).

---

## Archivos

| Archivo | Qué es | ¿Quién lo toca? |
|---|---|---|
| `index.html` | Estructura: header, hero (slider), cinta de texto, grilla de trabajos, contacto, modal | Desarrolladores |
| `style.css` | Diseño. Colores en `:root` (rosa `#D1054F`, negros). Fuentes Anton + Space Grotesk (Google Fonts) | Desarrolladores |
| `projects.js` | **Datos**: `PERFIL` (email, redes) y `PROYECTOS` (lista de trabajos) | **El creador** |
| `script.js` | Lógica: slider del hero con proyectos `destacado:true`, filtros por categoría, grilla, modal con YouTube/Vimeo/mp4/galería, contacto | Desarrolladores |
| `assets/` | Imágenes y videos cortos | **El creador** |
| `CLAUDE.md` | Instrucciones para asistentes de IA | Desarrolladores |
| `.claude/agents/` | Agentes de IA del proyecto (ver "Agentes de IA") | Desarrolladores |
| `docs/` | Planes y propuestas detalladas (p. ej. `docs/propuestas-animaciones.md`) | Desarrolladores |

### Campos de cada proyecto (`projects.js`)

| Campo | Obligatorio | Descripción |
|---|---|---|
| `titulo` | sí | Nombre del proyecto |
| `categoria` | sí | Exactamente `"3D"`, `"Video"`, `"Diseño"` o `"Foto"` |
| `año` | sí | Número, ej. `2026` |
| `descripcion` | no | Texto que aparece en el modal |
| `portada` | no | Imagen de la tarjeta, ej. `"assets/mi-proyecto.webp"`. Vacía = degradado de color |
| `preview` | no | Clip corto en loop (mp4) para el fondo del hero |
| `video` | no | Link de YouTube/Vimeo o archivo `"assets/x.mp4"`. Se abre en el modal |
| `galeria` | no | Lista de imágenes extra para el modal |
| `destacado` | no | `true` = aparece en el slider de portada (recomendado 3 a 5) |

---

## Estrategia de hosting y medios (decidida)

| Qué | Dónde | Por qué |
|---|---|---|
| El sitio | **Vercel** (plan Hobby gratis) conectado a GitHub. Alternativa: **Cloudflare Pages** | Publica solo al hacer commit. Un portafolio personal entra en el uso permitido de Hobby (no comercial: sin tienda, cobros ni publicidad). Si eso cambia, migrar a Cloudflare Pages (sin esa restricción, tráfico ilimitado) |
| Fotos y portadas | `assets/` del repo | Comprimidas a **WebP < 500 KB** (Squoosh.app). Caben sin problema en los ~100 GB/mes de Vercel |
| Previews de video | `assets/` del repo | Clips de **5–8 s, 720p, sin audio, ~1–2 MB** (ver comando abajo) |
| Videos largos (reels, spots) | **YouTube como "no listado"** | Gratis e ilimitado. **Nunca** subir videos pesados al repo: GitHub rechaza archivos > 100 MB y consumen el tráfico de Vercel |
| Galerías enormes (si algún día pasa) | Cloudinary (plan gratis) | Optimiza imágenes automáticamente |

Descartados: **Supabase** (no necesitamos backend; el plan gratis pausa proyectos inactivos),
**Vimeo gratis** (muy limitado), **GIFs** (pesan 10× más que un mp4 equivalente).

### Crear un preview liviano de un video pesado
```bash
ffmpeg -ss 00:00:10 -t 6 -i reel.mp4 -vf "scale=-2:720,fps=24" -an -c:v libx264 -crf 28 -preset slow -movflags +faststart assets/reel-preview.mp4
```
(6 s desde el segundo 10, 720p, sin audio). Alternativa visual: HandBrake, 720p, sin audio, calidad RF 28–30.

### Reglas para archivos en `assets/`
- Nombres sin espacios, tildes ni paréntesis: `palmas-01.webp`, no `p(1).jpg` ni `Mi Foto.jpg`.
- Las rutas en `projects.js` empiezan con `assets/` y no llevan espacios al final.

---

## Problemas conocidos (a octubre 2026)

1. **Archivos faltantes en `assets/`.** Solo existe `assets/1.jpg`. `projects.js` referencia
   `d.jpg`, `p(1).jpg`…`p(20).jpg`, `1IGRetocada.png`, `2IGRetocada.png` y `paig.mp4`, que no están en el repo.
2. ~~Rutas mal escritas en `projects.js`~~ — **resuelto** (oct 2026). Además `script.js` ahora tolera estos errores
   solo: quita espacios sobrantes, agrega `assets/` si falta, ignora entradas vacías en `galeria`, y si una imagen
   no existe muestra el degradado de la categoría (tarjetas/hero) o la oculta (modal).
3. **Datos de contacto de ejemplo** en `PERFIL` (`tucorreo@ejemplo.com`, redes `tuusuario`).
4. **Proyectos de relleno** sin contenido ("Spot publicitario", "Poster concierto", "Retratos", "Identidad de marca").
5. Nombres con paréntesis (`p(1).jpg`) pueden romper `url('...')` en CSS. Renombrar.
6. `paig.mp4` está pensado para ir dentro del repo; según la estrategia, si es pesado debe ir a YouTube.
7. **`assets/1.jpg` pesa 2,5 MB y mide 5400×5400 px.** Se usa en el hero y en dos tarjetas: en celulares
   traba la página y las animaciones. Hay que bajarla a ~1920 px en WebP de menos de 500 KB.
8. **Problemas de rendimiento y animación del código** (hero con `setInterval` aunque no se vea, cinta que nunca
   se pausa, hover pegado en celular, etc.). Lista completa con su estado en `docs/propuestas-animaciones.md`.

---

## Cómo trabajamos (equipo y flujo)

- **Equipo:** el creador del repo (diseñador gráfico, sube contenido) y colaboradores que programan
  (p. ej. JJDA1057), apoyados por asistentes de IA (Claude Code).
- **Ramas:** nunca se trabaja directo en `main`. Cada tarea va en su rama desde `main` actualizado:
  `fix/...` (arreglos), `feat/...` (funciones nuevas), `docs/...` (documentación).
- **PRs separados:** el equipo prefiere **un PR para código y otro para documentación**.
  Si el PR de docs describe un cambio de código, se mergea primero el de código.
- **Nada se sube sin autorización:** no se hace push ni se crean PRs hasta que el colaborador (JJDA1057) lo
  autorice explícitamente. Se trabaja en local, él revisa en http://127.0.0.1:8000 y decide si va a GitHub.
  Los commits locales en la rama de trabajo sí están permitidos.
- **Abrir PRs:** en la máquina actual no está instalado `gh`. Se hace push de la rama y se abre el PR
  con el link `https://github.com/reivstudio-max/Reiv-portfolio/pull/new/<rama>`.
  (Para abrirlos desde la terminal: `sudo pacman -S github-cli` y `gh auth login`.)
- **Probar en local:** `python3 -m http.server 8000 --bind 127.0.0.1` y abrir http://127.0.0.1:8000
  (recargar con Ctrl+Shift+R para evitar la caché). Para capturas automáticas se usa Chromium headless:
  `chromium --headless=new --window-size=1280,900 --screenshot=salida.png http://127.0.0.1:8000`.
- **Probar animaciones de verdad:** una captura estática no muestra si una transición ocurre. Lo que se ha hecho
  es controlar Chromium por el protocolo de DevTools (CDP) con un script de Node (Node 26 trae `WebSocket`):
  `chromium --headless=new --remote-debugging-port=9333`, navegar, hacer clic por JS, tomar capturas a los
  ~170 ms (mitad de la animación), revisar errores de consola y emular `prefers-reduced-motion` y tamaños de
  pantalla (`Emulation.setEmulatedMedia`, `Emulation.setDeviceMetricsOverride`). Los scripts no están en el repo.
- **Al terminar una tarea:** actualizar "Problemas conocidos" y "Estado y próximos pasos" de este README.

### Historial de PRs
| PR | Rama | Qué hizo |
|---|---|---|
| #1 | `docs/contexto-proyecto` | Documentación base: objetivo, reglas, estrategia de medios, problemas y estado. Creó `CLAUDE.md` |
| #2 | `fix/rutas-y-robustez` | Corrigió rutas rotas en `projects.js`; `script.js` limpia rutas (espacios, `assets/` faltante, vacíos) y usa el degradado de la categoría si una imagen no existe |
| #3 | `docs/estado-rutas` | Marcó las rutas rotas como resueltas en este README |
| #4 | `docs/agentes-y-guia` | Agente `animaciones`, sección de flujo de trabajo, historial y próximos pasos |
| (pendiente) | `feat/animaciones-p1` | **Código** de la animación P1 (tarjeta → ventana). Se mergea antes que el de docs |
| (pendiente) | `docs/animaciones-p1-y-plan` | Esta actualización: P1, plan de animaciones en `docs/`, panel de administración propuesto |

---

## Agentes de IA del proyecto

Están en `.claude/agents/` y Claude Code los carga automáticamente al abrir el repo
(si no aparecen, reiniciar Claude Code o revisar `/agents`). Se invocan por nombre, p. ej.:
*"Usa el agente animaciones para proponer ideas para el hero"*.

| Agente | Archivo | Para qué |
|---|---|---|
| `animaciones` | `.claude/agents/animaciones.md` | Motion design con foco en rendimiento. **Modo ideas:** propone animaciones ordenadas por impacto/costo (qué se ve, técnica, peso, comportamiento en celular) y pide aprobación. **Modo implementación:** trabaja en rama `feat/animaciones-...`, mide con Lighthouse/Chromium antes y después y actualiza el README |

Reglas que sigue `animaciones`: CSS primero → scroll-driven/View Transitions → CSS 3D → JS (rAF) →
WebGL solo para un efecto estrella cargado de forma diferida y con respaldo estático. Anima solo
`transform`/`opacity`, pausa todo fuera de pantalla, respeta `prefers-reduced-motion`.
Presupuesto: < ~15 KB de JS extra en la carga inicial, Lighthouse móvil ≥ 90, 60 fps.

---

## Animaciones

Plan completo, propuestas P1–P10 y problemas de rendimiento: **`docs/propuestas-animaciones.md`**.

### P1 — la tarjeta se convierte en la ventana (hecha)
- **Qué se ve:** al tocar una tarjeta (o "Ver proyecto" en el hero), su imagen vuela y crece hasta la cabecera
  de la ventana del proyecto mientras el fondo se oscurece; al cerrar (✕ o Esc) vuelve a su lugar.
  Las fotos de la galería suben una tras otra al entrar en pantalla.
- **Cabecera ajustada a la pantalla:** la imagen principal es lo más grande posible sin salirse de la pantalla,
  en alto y ancho, sin recortes y centrada (`max-height: calc(100svh - 110px)`). Videos y degradados en 16:9.
  El texto y la galería siguen en una columna de máximo 1100 px. Verificado en 1920×1080, 1280×900,
  390×844 y 844×390 con imágenes cuadradas, anchas y verticales: siempre cabe entera.
- **Con video:** la portada queda de "póster" hasta que el reproductor carga, y luego hace fundido.
- **Técnica:** View Transitions API (`document.startViewTransition`), sin librerías, ~1,5 KB. El elemento que viaja
  recibe `view-transition-name: proyecto-img` (solo uno a la vez). Sin soporte: fundido CSS
  (`html:not(.vt)`). Con `prefers-reduced-motion`: solo fundido corto, sin vuelo.
- **Extras:** el hero no cambia de slide con la ventana abierta; `scrollbar-gutter: stable` evita el salto lateral.
- **Código:** `script.js` (sección "VENTANA DE PROYECTO": `transicion`, `nombrar`, `pintarModal`,
  `observarGaleria`, `abrir`, `cerrar`) y `style.css` (bloque "Cabecera de la ventana" y "P1").
- **No probado:** navegador sin View Transitions (solo el respaldo) ni celular real.
- El creador no tiene que hacer nada: funciona con los datos actuales.

---

## Propuesta pendiente: panel de administración para el creador

Hoy el creador tiene que editar `projects.js` y subir archivos a GitHub a mano. Se propuso un **CMS sobre Git**
(gratis, sin backend): un panel con login de GitHub donde edita proyectos con formularios y sube imágenes;
el panel hace el commit y Vercel republica solo.

- **Recomendado:** Pages CMS (`app.pagescms.org`, gratis y de código abierto; basta un archivo de configuración
  en el repo). Alternativas: Sveltia CMS o Decap CMS en `/admin` (necesitan un pequeño servicio de login
  gratis en Cloudflare Workers).
- **Seguridad:** el login es el de GitHub (con 2FA); solo quien tiene permiso en el repo puede editar.
  Un login hecho a mano en un sitio estático no es seguro (cualquiera puede saltarse una contraseña en JS).
- **Descartado:** Supabase/Firebase (habría que programar login, base de datos y permisos; el plan gratis
  de Supabase pausa proyectos inactivos).
- **Implica:** pasar los datos de `projects.js` a `proyectos.json` y que `script.js` lo lea; la página ya no se
  abriría con doble clic (hace falta el servidor local o el sitio publicado). Actualizar README y `CLAUDE.md`.
- **Estado:** sin decidir. Si se aprueba, conviene hacerlo **antes** del resto del paquete 1 de animaciones,
  porque los dos cambios tocan `script.js`.

---

## Estado y próximos pasos

**Hecho**
- [x] Sitio base funcionando (hero, filtros, grilla, modal, contacto).
- [x] Estrategia de hosting y medios a costo cero definida (ver arriba).
- [x] Rutas corregidas y limpieza automática de datos en `script.js` (PR #2).
- [x] Flujo de trabajo documentado y agente `animaciones` creado (PR #4).
- [x] Propuestas de animaciones del agente guardadas en `docs/propuestas-animaciones.md`.
- [x] **P1:** la tarjeta se convierte en la ventana, con cabecera ajustada a la pantalla (`feat/animaciones-p1`).

**Siguiente (en este orden)**
- [ ] Mergear el PR de código de P1 y después el de documentación.
- [ ] **Decidir el panel de administración** (ver "Propuesta pendiente"). Si va, hacerlo antes de seguir animando.
- [ ] **Resto del paquete 1 de animaciones**, en este orden: base de rendimiento (problemas 1–8 de
      `docs/propuestas-animaciones.md`), P2 (titulares), P4 (tarjetas 3D, junto con el preview de video y el ▶
      de abajo) y P3 (intro del hero). Una rama `feat/animaciones-...` por propuesta; mostrar en local antes de subir.
- [ ] Opcional: en celular acostado la cabecera usa el 72 % del alto por el margen del botón ✕; se puede reducir
      ese margen solo en pantallas bajas.
- [ ] Miniatura automática de YouTube cuando un proyecto tiene `video` de YouTube pero no `portada`
      (`https://img.youtube.com/vi/ID/maxresdefault.jpg`).
- [ ] Reproducir `preview` en las tarjetas de la grilla al pasar el mouse (y en celular al entrar en pantalla),
      cargando el clip solo cuando se va a mostrar (`preload="none"`, `muted`, `playsinline`).
- [ ] Ícono ▶ en tarjetas que tienen video.
- [ ] Fase 2: P5 (filtro animado) y P6 (cinta doble). Fase 3: P9 (visor 3D) cuando haya modelos `.glb`.

**Pendiente del creador**
- [ ] Subir las imágenes faltantes a `assets/` (comprimidas y con nombres limpios).
- [ ] Subir videos largos a YouTube como no listados y pegar los links en `video:`.
- [ ] Poner su email y redes reales en `PERFIL`.
- [ ] Reemplazar o borrar los proyectos de relleno.
- [ ] Optimizar `assets/1.jpg` (~1920 px, WebP, < 500 KB). Se le puede pedir a un colaborador que lo haga.
- [ ] (Para P9) Exportar los modelos 3D desde Blender en `.glb` comprimido de menos de 3 MB.

**Ideas a futuro (sin compromiso)**
- Navegación con flechas en la galería del modal.
- Sección "Sobre mí".
- Formulario de contacto con Web3Forms/Formspree (gratis).
- Estadísticas con Cloudflare Web Analytics (gratis).

---

## Guía para el creador

### Probar en tu computador
Haz doble clic en `index.html` y se abre en el navegador.

### Subir a internet con Vercel
1. Crea cuenta en github.com.
2. New repository → nombre: `reiv-portfolio` → Create.
3. "uploading an existing file" → arrastra TODO el contenido de esta carpeta → Commit changes.
4. Crea cuenta en vercel.com con "Continue with GitHub".
5. Add New → Project → Import `reiv-portfolio` → Deploy (sin cambiar nada).
6. Vercel te da un link tipo `reiv-portfolio.vercel.app`.

### Actualizar
Sube las imágenes nuevas a `assets/` y edita `projects.js` en GitHub (ícono de lápiz).
Vercel republica solo en ~30 segundos.
