const Sesion = require("../Sesion");
const TipoRegular = require("../TipoRegular");
const TipoPoster = require("../TipoPoster");
const TipoWorkshop = require("../TipoWorkshop");
const ArticuloRegular = require("../ArticuloRegular");
const ArticuloPoster = require("../ArticuloPoster");
const { RequisitoRegular, RequisitoPoster } = require("../Requisitos");
const Usuario = require("../Usuario");
const Rol = require("../Rol");
const Conferencia = require("../Conferencia");
const Recepcion = require("../Recepcion");
const RolesValidos = require("../RolesValidos");

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
  });

  test("Debería aceptar solo artículos regulares en una sesión regular", () => {
    sesionRegular.agregarArticulo(articuloRegular1);
    expect(sesionRegular.articulos).toContain(articuloRegular1);

    expect(() => {
      sesionRegular.agregarArticulo(articuloPoster);
    }).toThrow(
      "No se puede agregar el artículo. Se ha alcanzado el límite máximo, el tipo de artículo no es admitido, o el estado actual no permite agregar artículos."
    );
  });

  test("Debería aceptar solo pósters en una sesión de pósters", () => {
    sesionPoster.agregarArticulo(articuloPoster);
    expect(sesionPoster.articulos).toContain(articuloPoster);

    expect(() => {
      sesionPoster.agregarArticulo(articuloRegular1);
    }).toThrow(
      "No se puede agregar el artículo. Se ha alcanzado el límite máximo, el tipo de artículo no es admitido, o el estado actual no permite agregar artículos."
    );
  });

  test("Debería aceptar ambos tipos de artículos en una sesión de workshop", () => {
    sesionWorkshop.agregarArticulo(articuloRegular1);
    sesionWorkshop.agregarArticulo(articuloPoster);

    expect(sesionWorkshop.articulos).toContain(articuloRegular1);
    expect(sesionWorkshop.articulos).toContain(articuloPoster);
  });
});
