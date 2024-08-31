const EstadoSesion = require("../EstadoSesion");
const Recepcion = require("../Recepcion");
const Bidding = require("../Bidding");
const Sesion = require("../Sesion");
const TipoRegular = require("../TipoRegular");
const TipoWorkshop = require("../TipoWorkshop");
const TipoPoster = require("../TipoPoster");
const ArticuloRegular = require("../ArticuloRegular");
const ArticuloPoster = require("../ArticuloPoster");
const Recepcion = require("../Recepcion");
const Bidding = require("../Bidding");
const Revision = require("../Revision");
const Usuario = require("../Usuario");
const Rol = require("../Rol");
const RolesValidos = require("../RolesValidos");
const InteresRevisor = require("../InteresRevisor");
const MetodoSeleccion = require("../MetodoSeleccion");
const Mejores = require("../Mejores");
const CorteFijo = require("../CorteFijo");
const Bid = require("../Bid");
const Conferencia = require("../Conferencia");
const Seleccion = require("../Seleccion");
const AsignacionYRevision = require("../AsignacionYRevision");
const { RequisitoRegular, RequisitoPoster } = require("../Requisitos");

describe("Sesion", () => {
  let conferencia;
  let sesionRegular;
  let sesionWorkshop;
  let sesionPoster;
  let requisitoRegular;
  let requisitoPoster;
  let articuloRegular1;
  let articuloRegular2;
  let articuloRegular3;
  let articuloRegular4;
  let articuloRegular5;
  let articuloPoster;
  let revisor1;
  let revisor2;
  let revisor3;
  let revisor4;
  let autor1;
  let autor2;
  let metodoSeleccionMejores;
  let metodoSeleccionCorteFijo;

  beforeEach(() => {
    conferencia = new Conferencia("Conferencia de Prueba");

    revisor1 = new Usuario(
      "Revisor1",
      "UNLP",
      "revisor1@example.com",
      "pass123",
      [new Rol(RolesValidos.REVISOR)]
    );

    revisor2 = new Usuario(
      "Revisor2",
      "UNLP",
      "revisor2@example.com",
      "pass456",
      [new Rol(RolesValidos.REVISOR)]
    );

    revisor3 = new Usuario(
      "Revisor3",
      "UNLP",
      "revisor3@example.com",
      "pass789",
      [new Rol(RolesValidos.REVISOR)]
    );

    revisor4 = new Usuario(
      "Revisor4",
      "UNLP",
      "revisor4@example.com",
      "pass101112",
      [new Rol(RolesValidos.REVISOR)]
    );

    conferencia.agregarRevisor(revisor1);
    conferencia.agregarRevisor(revisor2);
    conferencia.agregarRevisor(revisor3);
    conferencia.agregarRevisor(revisor4);

    sesionRegular = new Sesion(
      "Sesión Regular 1",
      new TipoRegular(),
      new Date(),
      new Date(),
      5,
      conferencia.comitePrograma
    );
    sesionRegular.cambiarEstado(new Recepcion(sesionRegular));

    sesionWorkshop = new Sesion(
      "Sesión Workshop 1",
      new TipoWorkshop(),
      new Date(),
      new Date(),
      5,
      conferencia.comitePrograma
    );
    sesionWorkshop.cambiarEstado(new Recepcion(sesionWorkshop));

    sesionPoster = new Sesion(
      "Sesión Poster 1",
      new TipoPoster(),
      new Date(),
      new Date(),
      5,
      conferencia.comitePrograma
    );
    sesionPoster.cambiarEstado(new Recepcion(sesionPoster));

    conferencia.agregarSesion(sesionRegular);
    conferencia.agregarSesion(sesionWorkshop);
    conferencia.agregarSesion(sesionPoster);

    autor1 = new Usuario("Autor1", "UNLP", "autor1@example.com", "pass123", [
      new Rol(RolesValidos.AUTHOR),
    ]);

    autor2 = new Usuario("Autor2", "UNLP", "autor2@example.com", "pass456", [
      new Rol(RolesValidos.AUTHOR),
    ]);

    autor3 = new Usuario("Autor3", "UNLP", "autor3@example.com", "pass456", [
      new Rol(RolesValidos.AUTHOR),
    ]);

    autor4 = new Usuario("Autor4", "UNLP", "autor4@example.com", "pass456", [
      new Rol(RolesValidos.AUTHOR),
    ]);

    autor5 = new Usuario("Autor5", "UNLP", "autor5@example.com", "pass456", [
      new Rol(RolesValidos.AUTHOR),
    ]);

    requisitoRegular = new RequisitoRegular(300);
    requisitoPoster = new RequisitoPoster();

    articuloRegular1 = new ArticuloRegular(
      "Articulo Regular 1",
      "url1",
      [autor1],
      autor1,
      requisitoRegular,
      "Resumen1"
    );

    articuloRegular2 = new ArticuloRegular(
      "Articulo Regular 2",
      "url1",
      [autor2],
      autor2,
      requisitoRegular,
      "Resumen1"
    );

    articuloRegular3 = new ArticuloRegular(
      "Articulo Regular 3",
      "url1",
      [autor3],
      autor3,
      requisitoRegular,
      "Resumen1"
    );

    articuloRegular4 = new ArticuloRegular(
      "Articulo Regular 4",
      "url1",
      [autor4],
      autor4,
      requisitoRegular,
      "Resumen1"
    );

    articuloRegular5 = new ArticuloRegular(
      "Articulo Regular 5",
      "url1",
      [autor5],
      autor5,
      requisitoRegular,
      "Resumen1"
    );

    articuloPoster = new ArticuloPoster(
      "Articulo Poster",
      "url2",
      [autor2],
      autor2,
      requisitoPoster,
      "urlFuentes2"
    );

    conferencia.agregarAutor(autor1);
    conferencia.agregarAutor(autor2);
    conferencia.agregarAutor(autor3);
    conferencia.agregarAutor(autor4);
    conferencia.agregarAutor(autor5);

    metodoSeleccionMejores = new Mejores(80);
    metodoSeleccionCorteFijo = new CorteFijo(25);
  });

  test("Recepcion permite agregar artículos", () => {
    const sesionMock = {};
    const estado = new Recepcion(sesionMock);

    expect(estado.permiteAgregarArticulo()).toBe(true);
  });
  test("EstadoSesion debe lanzar error si se llama a un método no implementado", () => {
    const sesionMock = {};
    const estado = new EstadoSesion(sesionMock);

    expect(() => estado.recibirBid()).toThrow(
      "Este método debe ser implementado por subclases"
    );

    expect(() => estado.cerrarBidding()).toThrow(
      "Este método debe ser implementado por subclases"
    );
    expect(() => estado.definirMetodoSeleccion()).toThrow(
      "Este método debe ser implementado por subclases"
    );

    expect(() => estado.seleccionarArticulos()).toThrow(
      "Este método debe ser implementado por subclases"
    );
    expect(() => estado.asignarEvaluacion()).toThrow(
      "Este método debe ser implementado por subclases"
    );
  });

  test("Bidding implementa recibirBid y cerrarBidding", () => {
    // Mock de sesión
    const sesionRegular = {
      articulos: [], // Lista de artículos en la sesión
      bids: [], // Lista de bids en la sesión
    };

    // Mock de artículo
    const articuloRegular1 = new ArticuloRegular(
      "Título del Artículo",
      "urlArchivo",
      ["Autor1", "Autor2"],
      "AutorEncargado",
      "TipoRequisito",
      "Resumen del Artículo"
    );

    // Mock de revisor
    const revisor1 = new Revisor("Nombre Revisor", "email@ejemplo.com");

    // Agregar el artículo a la sesión
    sesionRegular.articulos.push(articuloRegular1);

    // Instancia de Bidding
    const estado = new Bidding(sesionRegular);

    // Asegúrate de que recibirBid no lanza errores con parámetros válidos
    expect(() =>
      estado.recibirBid(revisor1, articuloRegular1, InteresRevisor.INTERESADO)
    ).not.toThrow();

    // Asegúrate de que cerrarBidding no lanza errores
    expect(() => estado.cerrarBidding()).not.toThrow();
  });

  test("AsignacionyRevision implementa asignarRevisores y asignarEvaluacion", () => {
    // Mock de sesión
    const sesionRegular = {
      // Configura los atributos necesarios para la sesión
    };

    // Instancia de AsignacionyRevision
    const estado = new AsignacionyRevision(sesionRegular);

    // Mock de revisor
    const revisor1 = new Revisor("Nombre Revisor", "email@algo.com");

    // Mock de artículo
    const articuloRegular1 = new ArticuloRegular(
      "Título del Artículo",
      "urlArchivo",
      ["Autor1", "Autor2"],
      "AutorEncargado",
      "TipoRequisito",
      "Resumen del Artículo"
    );

    // Agregar revisor y artículo a la sesión si es necesario
    // sesionRegular.revisores.push(revisor1);
    // sesionRegular.articulos.push(articuloRegular1);

    // Asegúrate de que asignarRevisores no lanza errores
    expect(() => estado.asignarRevisores()).not.toThrow();

    // Asegúrate de que asignarEvaluacion no lanza errores con parámetros válidos
    expect(() =>
      estado.asignarEvaluacion(
        articuloRegular1,
        revisor1,
        5,
        "Texto de Evaluación"
      )
    ).not.toThrow();
  });
});
