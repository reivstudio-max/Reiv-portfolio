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

---

## Cómo trabajamos (equipo y flujo)

- **Equipo:** el creador del repo (diseñador gráfico, sube contenido) y colaboradores que programan
  (p. ej. JJDA1057), apoyados por asistentes de IA (Claude Code).
- **Ramas:** nunca se trabaja directo en `main`. Cada tarea va en su rama desde `main` actualizado:
  `fix/...` (arreglos), `feat/...` (funciones nuevas), `docs/...` (documentación).
- **PRs separados:** el equipo prefiere **un PR para código y otro para documentación**.
  Si el PR de docs describe un cambio de código, se mergea primero el de código.
- **Abrir PRs:** en la máquina actual no está instalado `gh`. Se hace push de la rama y se abre el PR
  con el link `https://github.com/reivstudio-max/Reiv-portfolio/pull/new/<rama>`.
  (Para abrirlos desde la terminal: `sudo pacman -S github-cli` y `gh auth login`.)
- **Probar en local:** `python3 -m http.server 8000 --bind 127.0.0.1` y abrir http://127.0.0.1:8000
  (recargar con Ctrl+Shift+R para evitar la caché). Para capturas automáticas se usa Chromium headless:
  `chromium --headless=new --window-size=1280,900 --screenshot=salida.png http://127.0.0.1:8000`.
- **Al terminar una tarea:** actualizar "Problemas conocidos" y "Estado y próximos pasos" de este README.

### Historial de PRs
| PR | Rama | Qué hizo |
|---|---|---|
| #1 | `docs/contexto-proyecto` | Documentación base: objetivo, reglas, estrategia de medios, problemas y estado. Creó `CLAUDE.md` |
| #2 | `fix/rutas-y-robustez` | Corrigió rutas rotas en `projects.js`; `script.js` limpia rutas (espacios, `assets/` faltante, vacíos) y usa el degradado de la categoría si una imagen no existe |
| #3 | `docs/estado-rutas` | Marcó las rutas rotas como resueltas en este README |
| (este) | `docs/agentes-y-guia` | Agente `animaciones`, sección de flujo de trabajo, historial y próximos pasos |

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

## Estado y próximos pasos

**Hecho**
- [x] Sitio base funcionando (hero, filtros, grilla, modal, contacto).
- [x] Estrategia de hosting y medios a costo cero definida (ver arriba).
- [x] Rutas corregidas y limpieza automática de datos en `script.js` (PR #2).
- [x] Flujo de trabajo documentado y agente `animaciones` creado.

**Siguiente (en este orden)**
- [ ] **Animaciones:** lanzar el agente `animaciones` en modo ideas para hero, grilla y modal;
      elegir propuestas y luego implementarlas (PR de código + PR de docs).
- [ ] Miniatura automática de YouTube cuando un proyecto tiene `video` de YouTube pero no `portada`
      (`https://img.youtube.com/vi/ID/maxresdefault.jpg`).
- [ ] Reproducir `preview` en las tarjetas de la grilla al pasar el mouse (y en celular al entrar en pantalla),
      cargando el clip solo cuando se va a mostrar (`preload="none"`, `muted`, `playsinline`).
- [ ] Ícono ▶ en tarjetas que tienen video.

**Pendiente del creador**
- [ ] Subir las imágenes faltantes a `assets/` (comprimidas y con nombres limpios).
- [ ] Subir videos largos a YouTube como no listados y pegar los links en `video:`.
- [ ] Poner su email y redes reales en `PERFIL`.
- [ ] Reemplazar o borrar los proyectos de relleno.

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
