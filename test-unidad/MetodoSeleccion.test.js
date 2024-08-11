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
describe("Articulo", () => {
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
      [autor1, autor2],
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

    articuloPosterNoCumple = new ArticuloPoster(
      "Articulo Poster",
      "url2",
      [],
      autor2,
      requisitoPoster,
      "urlFuentes2"
    );
  });

  test("Seleccionar artículos con método CorteFijo", () => {
    // Asignar revisiones y calificaciones a los artículos
    articuloRegular1.agregarRevision({ puntaje: 8 });
    articuloRegular1.agregarRevision({ puntaje: 7 });
    articuloRegular1.agregarRevision({ puntaje: 9 });

    articuloRegular2.agregarRevision({ puntaje: 6 });
    articuloRegular2.agregarRevision({ puntaje: 7 });
    articuloRegular2.agregarRevision({ puntaje: 7 });

    articuloRegular3.agregarRevision({ puntaje: 5 });
    articuloRegular3.agregarRevision({ puntaje: 6 });
    articuloRegular3.agregarRevision({ puntaje: 5 });

    articuloRegular4.agregarRevision({ puntaje: 9 });
    articuloRegular4.agregarRevision({ puntaje: 9 });
    articuloRegular4.agregarRevision({ puntaje: 10 });

    //   // Agregar artículos a la sesión
    sesionRegular.agregarArticulo(articuloRegular1);
    sesionRegular.agregarArticulo(articuloRegular2);
    sesionRegular.agregarArticulo(articuloRegular3);
    sesionRegular.agregarArticulo(articuloRegular4);

    // Cambiar el estado a Bidding
    sesionRegular.cambiarEstado(new Bidding(sesionRegular));

    // Aplicar el método CorteFijo con 50% de aceptación
    const corteFijo = new CorteFijo(50);
    sesionRegular.definirMetodoSeleccion(corteFijo);

    sesionRegular.cambiarEstado(new Seleccion(sesionRegular));

    sesionRegular.seleccionarArticulos();

    // Verificar que solo se seleccionaron los mejores artículos hasta el límite permitido
    expect(sesionRegular.articulosAceptados).toHaveLength(2);
    expect(sesionRegular.articulosAceptados).toContain(articuloRegular4);
    expect(sesionRegular.articulosAceptados).toContain(articuloRegular1);
  });

  test("Seleccionar artículos con método Mejores", () => {
    // Asignar revisiones y calificaciones a los artículos
    articuloRegular1.agregarRevision({ puntaje: 8 });
    articuloRegular1.agregarRevision({ puntaje: 7 });
    articuloRegular1.agregarRevision({ puntaje: 9 });

    articuloRegular2.agregarRevision({ puntaje: 6 });
    articuloRegular2.agregarRevision({ puntaje: 7 });
    articuloRegular2.agregarRevision({ puntaje: 7 });

    articuloRegular3.agregarRevision({ puntaje: 5 });
    articuloRegular3.agregarRevision({ puntaje: 6 });
    articuloRegular3.agregarRevision({ puntaje: 5 });

    articuloRegular4.agregarRevision({ puntaje: 9 });
    articuloRegular4.agregarRevision({ puntaje: 9 });
    articuloRegular4.agregarRevision({ puntaje: 10 });

    //   // Agregar artículos a la sesión
    sesionRegular.agregarArticulo(articuloRegular1);
    sesionRegular.agregarArticulo(articuloRegular2);
    sesionRegular.agregarArticulo(articuloRegular3);
    sesionRegular.agregarArticulo(articuloRegular4);

    // Cambiar el estado a Bidding
    sesionRegular.cambiarEstado(new Bidding(sesionRegular));

    //Aplicar el método Mejores con un puntaje mínimo de 7
    const mejores = new Mejores(7);
    sesionRegular.definirMetodoSeleccion(mejores);

    sesionRegular.cambiarEstado(new Seleccion(sesionRegular));

    sesionRegular.seleccionarArticulos();

    // Verificar que solo se seleccionaron los mejores artículos hasta el límite permitido
    expect(sesionRegular.articulosAceptados).toHaveLength(2);
    expect(sesionRegular.articulosAceptados).toContain(articuloRegular1);
    expect(sesionRegular.articulosAceptados).toContain(articuloRegular4);

    // Asignar revisiones y calificaciones a los artículos
    //   articulo1.agregarRevision({ puntaje: 8 });
    //   articulo1.agregarRevision({ puntaje: 7 });
    //   articulo1.agregarRevision({ puntaje: 9 });

    //   articulo2.agregarRevision({ puntaje: 6 });
    //   articulo2.agregarRevision({ puntaje: 7 });
    //   articulo2.agregarRevision({ puntaje: 7 });

    //   articulo3.agregarRevision({ puntaje: 5 });
    //   articulo3.agregarRevision({ puntaje: 6 });
    //   articulo3.agregarRevision({ puntaje: 5 });

    //   articulo4.agregarRevision({ puntaje: 9 });
    //   articulo4.agregarRevision({ puntaje: 9 });
    //   articulo4.agregarRevision({ puntaje: 10 });

    //   // Agregar artículos a la sesión
    //   sesion.agregarArticulo(articulo1);
    //   sesion.agregarArticulo(articulo2);
    //   sesion.agregarArticulo(articulo3);
    //   sesion.agregarArticulo(articulo4);

    //   // Aplicar el método Mejores con un puntaje mínimo de 7
    //   const mejores = new Mejores(7);
    //   mejores.seleccionarArticulos(sesion);

    //   // Verificar que solo se seleccionaron los artículos que cumplen con el puntaje mínimo
    //   expect(sesion.articulosAceptados).toHaveLength(3);
    //   expect(sesion.articulosAceptados).toContain(articulo1);
    //   expect(sesion.articulosAceptados).toContain(articulo2);
    //   expect(sesion.articulosAceptados).toContain(articulo4);
  });
});
