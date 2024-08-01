const Usuario = require("./Usuario");
const Rol = require("./Rol");
const RolesValidos = require("./RolesValidos");
const Conferencia = require("./Conferencia");
const Sesion = require("./Sesion");
const TipoRegular = require("./TipoRegular");
const TipoPoster = require("./TipoPoster");
const ArticuloRegular = require("./ArticuloRegular");
const ArticuloPoster = require("./ArticuloPoster");
const InteresRevisor = require("./InteresRevisor");
const Bid = require("./Bid");
const MetodoSeleccionMejores = require("./MetodoSeleccionMejores");
const MetodoSeleccionCorteFijo = require("./MetodoSeleccionCorteFijo");

// Crear usuarios
const usuario1 = new Usuario(
  "Ana Pérez",
  "UNLP",
  "ana@example.com",
  "pass123",
  [new Rol(RolesValidos.CHAIR)]
);
const usuario2 = new Usuario(
  "Luis Gómez",
  "UNLP",
  "luis@example.com",
  "pass456",
  [new Rol(RolesValidos.REVISOR)]
);
const usuario3 = new Usuario(
  "Marta López",
  "UNLP",
  "marta@example.com",
  "pass789",
  [new Rol(RolesValidos.AUTHOR, RolesValidos.REVISOR)]
);

// Crear conferencia
const conferencia = new Conferencia(
  "Conferencia Internacional de Tecnología",
  [usuario1],
  [usuario2, usuario3]
);

// Crear sesiones
const tipoRegular = new TipoRegular();
const tipoPoster = new TipoPoster();
const sesionRegular = new Sesion(
  "Sesión Regular",
  tipoRegular,
  "2024-01-01",
  "2024-01-10",
  5
);
const sesionPoster = new Sesion(
  "Sesión de Posters",
  tipoPoster,
  "2024-01-11",
  "2024-01-20",
  10
);

// Agregar sesiones a la conferencia
conferencia.agregarSesion(sesionRegular);
conferencia.agregarSesion(sesionPoster);

// Crear artículos
const articuloRegular = new ArticuloRegular(
  "Artículo sobre IA",
  "http://example.com/ia",
  [usuario3],
  usuario3,
  "Resumen del artículo sobre IA"
);
const articuloPoster = new ArticuloPoster(
  "Poster sobre Machine Learning",
  "http://example.com/ml",
  [usuario3],
  usuario3,
  "http://example.com/fuentes"
);

// Agregar artículos a las sesiones
sesionRegular.agregarArticulo(articuloRegular);
sesionPoster.agregarArticulo(articuloPoster);

// Proceso de bidding en la sesión regular
sesionRegular.cambiarEstado(new Bidding(sesionRegular));
sesionRegular.recibirBid(usuario2, articuloRegular, InteresRevisor.INTERESADO);

// Definir método de selección y cerrar bidding
const metodoSeleccionMejores = new MetodoSeleccionMejores();
sesionRegular.definirMetodoSeleccion(metodoSeleccionMejores);
sesionRegular.cerrarBidding();

// Seleccionar artículos
const articulosSeleccionados = sesionRegular.seleccionarArticulos();
console.log("Artículos seleccionados:", articulosSeleccionados);

// Asignar evaluaciones a los artículos
sesionRegular.asignarEvaluacion(usuario2, articuloRegular, 4, "Buena calidad");
sesionRegular.asignarEvaluacion(
  usuario3,
  articuloRegular,
  5,
  "Excelente artículo"
);

// Imprimir resultados finales
console.log("Artículos en la sesión regular:", sesionRegular.articulos);
console.log("Revisiones del artículo:", articuloRegular.revisiones);
