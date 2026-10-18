const CATS = { Todos:"Todos", "3D":"3D", Video:"Edición de video", Diseño:"Diseño gráfico", Foto:"Fotografía" };
const RELLENO = {
  "3D":"linear-gradient(135deg,#D1054F,#1a0010)",
  Video:"linear-gradient(135deg,#2a2a2a,#D1054F)",
  Diseño:"linear-gradient(45deg,#D1054F,#000)",
  Foto:"linear-gradient(160deg,#444,#0a0a0a 60%,#D1054F)"
};
const $ = id => document.getElementById(id);
const fondo = p => p.portada ? `url('${p.portada}')` : RELLENO[p.categoria];

/* ---------- GANCHO ---------- */
const hero = $("inicio");
const dest = PROYECTOS.filter(p => p.destacado);
let actual = 0, timer;
hero.innerHTML = dest.map((p,i) => `
  <div class="slide" data-i="${i}">
    ${p.preview ? `<video class="bg" src="${p.preview}" muted loop autoplay playsinline></video>`
                : `<div class="bg" style="background-image:${fondo(p)}"></div>`}
    <div class="txt">
      <div class="tag">${CATS[p.categoria]} — ${p.año}</div>
      <h1 class="display">${p.titulo}</h1>
      <button class="btn">Ver proyecto →</button>
    </div>
  </div>`).join("") +
  `<div class="hero-ui"><span id="num"></span>${dest.map((_,i)=>`<button data-d="${i}"></button>`).join("")}</div>`;

function mostrar(i){
  actual = (i + dest.length) % dest.length;
  hero.querySelectorAll(".slide").forEach((s,n)=>s.classList.toggle("on",n===actual));
  hero.querySelectorAll(".hero-ui button").forEach((b,n)=>b.classList.toggle("on",n===actual));
  $("num").textContent = String(actual+1).padStart(2,"0")+" / "+String(dest.length).padStart(2,"0");
}
function auto(){ clearInterval(timer); timer = setInterval(()=>mostrar(actual+1),5500); }
hero.addEventListener("click", e => {
  const d = e.target.closest("[data-d]");
  if (d){ mostrar(+d.dataset.d); auto(); return; }
  const s = e.target.closest(".slide");
  if (s) abrir(dest[+s.dataset.i]);
});
if (dest.length){ mostrar(0); auto(); }

/* ---------- FILTROS Y GRILLA ---------- */
$("filtros").innerHTML = Object.keys(CATS).map(k=>`<button data-c="${k}" class="${k==="Todos"?"on":""}">${CATS[k]}</button>`).join("");
function pintar(cat){
  const lista = cat==="Todos" ? PROYECTOS : PROYECTOS.filter(p=>p.categoria===cat);
  $("grid").innerHTML = lista.map(p=>`
    <article class="card" data-t="${PROYECTOS.indexOf(p)}" style="animation-delay:${lista.indexOf(p)*60}ms">
      <div class="img" style="background-image:${fondo(p)}"></div>
      <div class="info"><span>${CATS[p.categoria]}</span><h3>${p.titulo}</h3></div>
    </article>`).join("");
}
$("filtros").addEventListener("click", e=>{
  const b = e.target.closest("button"); if(!b) return;
  document.querySelectorAll("#filtros button").forEach(x=>x.classList.toggle("on",x===b));
  pintar(b.dataset.c);
});
$("grid").addEventListener("click", e=>{
  const c = e.target.closest(".card"); if(c) abrir(PROYECTOS[+c.dataset.t]);
});
pintar("Todos");

/* ---------- VENTANA DE PROYECTO ---------- */
function embed(url){
  let m = url.match(/(?:youtu\.be\/|v=)([\w-]{11})/);
  if (m) return `<iframe src="https://www.youtube.com/embed/${m[1]}?autoplay=1" allow="autoplay;fullscreen" allowfullscreen></iframe>`;
  m = url.match(/vimeo\.com\/(\d+)/);
  if (m) return `<iframe src="https://player.vimeo.com/video/${m[1]}?autoplay=1" allow="autoplay;fullscreen" allowfullscreen></iframe>`;
  return `<video src="${url}" controls autoplay playsinline></video>`;
}
function abrir(p){
  let medios = "";
  if (p.video) medios += embed(p.video);
  if (p.portada && !p.video) medios += `<img src="${p.portada}" alt="${p.titulo}">`;
  (p.galeria||[]).forEach(g => medios += `<img src="${g}" alt="${p.titulo}" loading="lazy">`);
  if (!medios) medios = `<div class="vacio" style="background:${RELLENO[p.categoria]}">${p.titulo}</div>`;
  $("caja").innerHTML = medios + `<div class="tag">${CATS[p.categoria]} — ${p.año}</div><h2 class="display">${p.titulo}</h2><p>${p.descripcion||""}</p>`;
  $("modal").classList.add("on");
  document.body.style.overflow = "hidden";
}
function cerrar(){
  $("modal").classList.remove("on");
  $("caja").innerHTML = "";           // detiene videos
  document.body.style.overflow = "";
}
$("cerrar").onclick = cerrar;
document.addEventListener("keydown", e => { if(e.key==="Escape") cerrar(); });

/* ---------- CONTACTO ---------- */
$("mail").href = "mailto:" + PERFIL.email;
$("mail").textContent = PERFIL.email;
$("redes").innerHTML = PERFIL.redes.map(r=>`<a href="${r.url}" target="_blank" rel="noopener">${r.nombre}</a>`).join("");
$("year").textContent = new Date().getFullYear();
