const ArticuloRegular = require("../ArticuloRegular");
const ArticuloPoster = require("../ArticuloPoster");
const { RequisitoRegular, RequisitoPoster } = require("../Requisitos");
const Usuario = require("../Usuario");
const Rol = require("../Rol");
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

  test("Debería crear un artículo correctamente", () => {
    expect(articuloRegular1.titulo).toBe("Articulo Regular 1");
    expect(articuloRegular1.urlArchivo).toBe("url1");
    expect(articuloRegular1.autorEncargado).toBe(autor1);
    expect(articuloRegular1.obtenerAutores()).toEqual([autor1, autor2]);
  });

  test("Debería agregar un autor correctamente", () => {
    articuloRegular1.agregarAutor(autor3);
    expect(articuloRegular1.obtenerAutores()).toContain(autor3);
  });

  test("Debería agregar una revisión correctamente", () => {
    const revision = { puntaje: 5 };
    articuloRegular1.agregarRevision(revision);
    expect(articuloRegular1.obtenerRevisiones()).toContain(revision);
  });

  test("Debería lanzar un error al agregar más de 3 revisiones", () => {
    articuloRegular1.agregarRevision({ puntaje: 5 });
    articuloRegular1.agregarRevision({ puntaje: 4 });
    articuloRegular1.agregarRevision({ puntaje: 3 });
    expect(() => articuloRegular1.agregarRevision({ puntaje: 2 })).toThrow(
      "El artículo ya tiene el máximo de 3 revisiones."
    );
  });

  test("Debería calcular la calificación promedio correctamente", () => {
    articuloRegular1.agregarRevision({ puntaje: 5 });
    articuloRegular1.agregarRevision({ puntaje: 4 });
    articuloRegular1.agregarRevision({ puntaje: 3 });
    expect(articuloRegular1.calificacionPromedio()).toBe(4);
  });

  test("Debería devolver 0 si no hay revisiones para calificación promedio", () => {
    expect(articuloRegular1.calificacionPromedio()).toBe(0);
  });

  test("Debería quitar una revisión correctamente", () => {
    const revision1 = { puntaje: 5 };
    const revision2 = { puntaje: 4 };
    articuloRegular1.agregarRevision(revision1);
    articuloRegular1.agregarRevision(revision2);
    articuloRegular1.quitarRevision(revision1);
    expect(articuloRegular1.obtenerRevisiones()).not.toContain(revision1);
    expect(articuloRegular1.obtenerRevisiones()).toContain(revision2);
  });

  test("Debería cumplir con los requisitos con un aritucolo regular", () => {
    articuloRegular1.resumen =
      "Este es un resumen de ejemplo que tiene menos de 300 palabras.";
    expect(articuloRegular1.cumpleRequisitos()).toBe(true);
  });

  test("No debería cumplir con los requisitos si el resumen tiene más de 300 palabras para articulo regular", () => {
    articuloRegular1.resumen = "Palabra ".repeat(301); // Crear un resumen con más de 300 palabras
    expect(articuloRegular1.cumpleRequisitos()).toBe(false);
  });

  test("Debería cumplir con los requisitos articulo poster", () => {
    expect(articuloPoster.cumpleRequisitos()).toBe(true);
  });

  test("No debería cumplir con los requisitos si el resumen tiene más de 300 palabras", () => {
    expect(articuloPosterNoCumple.cumpleRequisitos()).toBe(false);
  });
});
