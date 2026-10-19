# Instrucciones para asistentes de IA

Lee `README.md` completo antes de trabajar: ahí están el objetivo, las reglas, la estrategia de medios,
los problemas conocidos y el estado actual del proyecto.

Reglas clave:
- Costo cero: no proponer servicios de pago.
- Sitio estático (HTML/CSS/JS puro), sin frameworks, build ni backend.
- El creador solo edita `projects.js` y `assets/`; toda función nueva debe configurarse desde `projects.js`.
- Comunicación y comentarios de código en español.
- Al terminar una tarea, actualiza "Problemas conocidos" y "Estado y próximos pasos" en `README.md`.
- Trabaja en una rama desde `main` y separa los PRs: uno de código y otro de documentación.
- **No hagas push ni crees PRs sin autorización explícita del usuario.** Implementa en local, deja que lo revise
  en http://127.0.0.1:8000 y espera su orden. Los commits locales sí están permitidos.
- Comunícate siempre en español, también al resumir resultados de agentes o herramientas.
- Para animaciones usa el agente `animaciones` (`.claude/agents/animaciones.md`). Ver "Agentes de IA" en `README.md`.
  Sus propuestas ya están en `docs/propuestas-animaciones.md`: no las generes de nuevo, parte de ahí.
