# Propuestas de animaciones (agente `animaciones`, octubre 2026)

Resultado del agente `animaciones` en **modo ideas** (ver `.claude/agents/animaciones.md`).
Sirve de plan para no tener que generar las ideas de nuevo. Los pesos son estimaciones
(min+gzip) sin medir; antes de implementar cada propuesta hay que medir.

Estado: **P1 implementada** (rama `feat/animaciones-p1`). El resto está pendiente de aprobación.

---

## Propuestas (de mayor a menor relación impacto/costo)

| # | Idea | Qué ve el visitante | Técnica | Costo | Estado |
|---|---|---|---|---|---|
| **P1** | Tarjeta que se convierte en la ventana | Al tocar una tarjeta (o "Ver proyecto" en el hero), su imagen vuela hasta la ventana y vuelve al cerrar. La galería aparece foto por foto | View Transitions API + `IntersectionObserver`. Respaldo: fundido CSS | Bajo, ~1,5 KB | ✅ Hecha |
| **P2** | Titulares que se revelan | "TRABAJOS." y "¿HACEMOS ALGO JUNTOS?" suben palabra por palabra como recortados; se dibuja una línea rosa | `overflow:hidden` + `translateY`; `animation-timeline: view()` en `@supports`, respaldo `IntersectionObserver` | Bajo, ~1 KB | Paquete 1 |
| **P3** | Intro del hero con profundidad | El título aparece con máscara en < 1 s, sin pantalla de carga. Al bajar, el fondo va más lento que el texto (parallax) | `@keyframes` + `animation-timeline: scroll()` en `@supports` | Bajo, ~1 KB | Paquete 1 |
| **P4** | Tarjetas con inclinación 3D (CSS) | En PC la tarjeta se inclina hacia el mouse (máx. ~8°), con reflejo de luz y el título flotando delante. En celular entra con un leve giro al aparecer. Aquí encaja el preview de video al pasar el mouse y el ícono ▶ | `perspective`, `rotateX/Y`, `translateZ`; un solo `requestAnimationFrame` por movimiento, solo con `(hover:hover) and (pointer:fine)` | Bajo-medio, ~1,5–2 KB | Paquete 1 |
| P5 | Filtro animado | Al cambiar de categoría las tarjetas se deslizan a su nuevo lugar sin que la página salte | View Transitions con un nombre por tarjeta; ocultar/mostrar en vez de reconstruir la grilla | Bajo, ~0,6 KB | Fase 2 |
| P6 | Cinta doble cruzada | Dos cintas en X (rosa y negra con texto en contorno) que aceleran con el scroll y se pausan fuera de pantalla | `@keyframes` + `IntersectionObserver` | Bajo, ~0,4 KB | Fase 2 |
| P7 | Cursor propio y botones magnéticos | Punto rosa que crece a "VER" o "▶" sobre tarjetas; botones que se acercan al mouse. Solo PC | Elemento fijo con `translate3d` en un rAF que se apaga al detenerse | Bajo-medio, ~1,2 KB | Sin decidir |
| P8 | Footer que se ensambla | Email gigante en una cinta lenta que se toca para copiar; redes que suben una por una | Reutiliza P2/P6/P7 | Bajo, ~0,3 KB | Sin decidir |
| **P9** | **Visor 3D (WebGL), efecto estrella** | En proyectos 3D, el modelo real (p. ej. los audífonos DT990) se gira con el dedo o el mouse, con luz de estudio | Three.js + GLTFLoader desde CDN con versión fija, cargado con `import()` **solo al abrir un proyecto con `modelo`**. Respaldo: la portada. Desactivado en equipos débiles o con ahorro de datos | 0 KB en la carga inicial; ~150–180 KB al abrir + el `.glb` | Fase 3 (necesita `.glb` del creador) |
| P10 | Galería con profundidad | Las fotos de la ventana en 2–3 columnas que se desplazan a distinta velocidad | `animation-timeline: scroll(nearest)` en `@supports` | Bajo, ~0,3 KB | Sin decidir |

Descartado: transición líquida WebGL entre slides del hero (vistosa, pero compite con el trabajo y empeora el LCP).

**Paquete 1 recomendado:** base de rendimiento + P1 (hecha) + P2 + P4 + P3. Total estimado ~4 KB JS + 2 KB CSS, sin librerías.

---

## Problemas de rendimiento y animación encontrados en el código

Base de rendimiento recomendada antes del resto del paquete 1. Las líneas se refieren al código
anterior a P1 y pueden haberse movido.

| # | Problema | Dónde | Estado |
|---|---|---|---|
| 1 | No había `prefers-reduced-motion` en ningún lado; `scroll-behavior:smooth` aplicado a todos | `style.css` | Parcial: P1 ya lo respeta. Falta el resto del sitio |
| 2 | La cinta corre siempre, aunque no esté en pantalla | `style.css` (`.marquee div`) | Pendiente |
| 3 | El hero avanza con `setInterval` aunque nadie lo vea (pestaña oculta o fuera de pantalla) | `script.js`, función `auto` | Parcial: P1 lo pausa con la ventana abierta. Falta `visibilitychange` e `IntersectionObserver` |
| 4 | El primer slide probablemente no anima al cargar (el `.on` se agrega en el mismo frame que el HTML) | `script.js`, hero | Pendiente de verificar |
| 5 | Todos los videos `preview` del hero se descargarían y reproducirían a la vez | `script.js`, hero | Pendiente |
| 6 | Imagen del hero y portadas como `background-image` generado por JS: se descubren tarde (peor LCP) y se descargan todas | `script.js` | Pendiente |
| 7 | Transiciones de "todo" (`transition:.2s`) | `style.css` | Pendiente |
| 8 | El hover de las tarjetas se queda pegado en celular (no está dentro de `@media(hover:hover)`) | `style.css` (`.card:hover`) | Pendiente |
| 9 | El filtro reconstruye toda la grilla con `innerHTML` | `script.js`, `pintar` | Pendiente (se resuelve con P5) |
| 10 | La ventana no tenía transición | `style.css` / `script.js` | ✅ Resuelto con P1 |
| 11 | Salto horizontal al abrir la ventana (desaparece la barra de scroll) | `style.css` | ✅ Resuelto con P1 (`scrollbar-gutter: stable`) |
| 12 | Las imágenes de la galería no reservan tamaño y el contenido salta al cargar | `script.js` | Pendiente |
| 13 | Anton con `display=swap`: los titulares gigantes cambian de tamaño al cargar la fuente (riesgo de CLS) | `index.html` | Pendiente |
| 14 | Accesibilidad de la ventana: el foco no entra al abrir ni vuelve a la tarjeta al cerrar | `script.js` | Pendiente |

**Problema más grande, que no es de código:** `assets/1.jpg` pesa 2,5 MB y mide 5400×5400 px.
Debe bajar a ~1920 px en WebP de menos de 500 KB. Sin eso, ninguna medición de Lighthouse es representativa.
