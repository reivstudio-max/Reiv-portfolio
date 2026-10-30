/* =====================================================================
   AQUÍ EDITAS TUS PROYECTOS — es el único archivo que necesitas tocar
   =====================================================================
   Cada proyecto es un bloque entre llaves { }. Para agregar uno, copia
   un bloque completo, pégalo debajo (no olvides la coma al final) y
   cambia los datos.

   categoria  -> debe ser exactamente: "3D", "Video", "Diseño" o "Foto"
   destacado  -> true = aparece en la portada de impacto (pon 3 a 5)
   portada    -> imagen de la tarjeta, ej: "assets/mi-proyecto.jpg"
                 (si la dejas vacía se ve un color de relleno)
   preview    -> (opcional) video corto en loop para la portada, ej: "assets/preview.mp4"
   video      -> (opcional) link de YouTube / Vimeo, o archivo "assets/video.mp4"
   galeria    -> (opcional) lista de imágenes extra, ej: ["assets/a.jpg","assets/b.jpg"]
*/

const PERFIL = {
  email: "tucorreo@ejemplo.com",
  redes: [
    { nombre: "Instagram", url: "https://instagram.com/tuusuario" },
    { nombre: "Behance",   url: "https://behance.net/tuusuario" },
    { nombre: "YouTube",   url: "https://youtube.com/@tuusuario" }
  ]
};

const PROYECTOS = [
  {
    titulo: "New Guitar Concept",
    categoria: "3D",
    año: 2026,
    descripcion: "giving a new look from stratocaster to something more heavy",
    portada: "assets/1.jpg",
    preview: "",
    video: "",
    galeria: [],
    destacado: true
  },
  {
    titulo: "Reel de edición",
    categoria: "Video",
    año: 2026,
    descripcion: "Pega en 'video' un link de YouTube o Vimeo y se reproducirá dentro de la página.",
    portada: "assets/1.jpg",
    video: "",
    galeria: [],
    destacado: true
  },
  {
    titulo: "Wild Child: Tributo a Alexi Laiho",
    categoria: "Diseño",
    año: 2025,
    descripcion: "Diseño gráfico y composición hecho en Photoshop",
    portada: "assets/flyer.jpg",
    galeria: [],
    destacado: true
  },
  {
    titulo: "Palmas",
    categoria: "Foto",
    año: 2025,
    descripcion: "Rodada en las Palmas",
    portada: "assets/d.jpg",
    galeria: ["assets/p(1).jpg","assets/p(2).jpg","assets/p(3).jpg","assets/p(4).jpg","assets/p(5).jpg","assets/p(6).jpg",
              "assets/p(7).jpg","assets/p(8).jpg","assets/p(9).jpg","assets/p(10).jpg","assets/p(11).jpg","assets/p(12).jpg",
              "assets/p(13).jpg","assets/p(14).jpg","assets/p(15).jpg","assets/p(16).jpg","assets/p(17).jpg","assets/p(18).jpg",
              "assets/p(19).jpg","assets/p(20).jpg"],
    destacado: true
  },
  {
   titulo: "Beyerdinamic DT990 3D Model", 
   categoria: "3D",     
   año: 2025,
   descripcion: "headsets 3d Modeling",
   portada: "assets/1IGRetocada.png",
   video: "assets/paig.mp4",
   galeria: ["assets/2IGRetocada.png"],
   destacado: true
  },
  { titulo: "Spot publicitario", categoria: "Video",  año: 2025, descripcion: "", portada: "", galeria: [], destacado: false },
  { titulo: "Poster concierto", categoria: "Diseño", año: 2024, descripcion: "", portada: "", galeria: [], destacado: false },
  { titulo: "Retratos",          categoria: "Foto",   año: 2024, descripcion: "", portada: "", galeria: [], destacado: false }
];
