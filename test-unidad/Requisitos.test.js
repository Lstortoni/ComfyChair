const {
  Requisito,
  RequisitoRegular,
  RequisitoPoster,
} = require("../Requisitos");
const Usuario = require("../Usuario");
const Rol = require("../Rol");
const RolesValidos = require("../RolesValidos");
const ArticuloRegular = require("../ArticuloRegular");
const ArticuloPoster = require("../ArticuloPoster");

describe("Conferencia", () => {
  let requisitoPoster;
  let requisitoRegular;
  let articuloRegular1;
  let articuloPoster;
  let articuloRegular4Palabras;
  let autor1;
  let autor2;

  beforeEach(() => {
    autor1 = new Usuario("Autor1", "UNLP", "autor1@example.com", "pass123", [
      new Rol(RolesValidos.AUTHOR),
    ]);

    autor2 = new Usuario("Autor2", "UNLP", "autor2@example.com", "pass456", [
      new Rol(RolesValidos.AUTHOR),
    ]);

    requisitoRegular = new RequisitoRegular(3);
    requisitoPoster = new RequisitoPoster();

    articuloRegular1 = new ArticuloRegular(
      "Articulo Regular 1",
      "url1",
      [autor1],
      autor1,
      requisitoRegular,
      "Resumen1"
    );

    articuloRegular4Palabras = new ArticuloRegular(
      "Articulo Regular 1",
      "url1",
      [autor1],
      autor1,
      requisitoRegular,
      "Resumen que tiene mas de 4 palabras"
    );

    articuloPoster = new ArticuloPoster(
      "Articulo Poster",
      "url2",
      [autor2],
      autor2,
      requisitoPoster,
      "urlFuentes2"
    );
  });

  test("Requisito debería lanzar un error si se llama al método cumple en la clase base", () => {
    const requisito = new Requisito();

    expect(() => requisito.cumple(articuloRegular1)).toThrowError(
      "Este método debe ser implementado por subclases"
    );
  });

  test("RequisitoRegular debería retornar true si el artículo cumple con los requisitos", () => {
    expect(requisitoRegular.cumple(articuloRegular1)).toBe(true);
  });

  test("RequisitoRegular debería retornar false si el artículo no cumple con los requisitos", () => {
    expect(requisitoRegular.cumple(articuloRegular4Palabras)).toBe(false);
  });

  test("RequisitoPoster debería retornar true si el póster cumple con los requisitos", () => {
    expect(requisitoPoster.cumple(articuloPoster)).toBe(true);
  });

  //   test("RequisitoPoster debería retornar false si el póster no cumple con los requisitos", () => {
  //     const requisitoPoster = new RequisitoPoster();
  //     const articulo = {
  //       titulo: "",
  //       autores: ["Autor1", "Autor2"],
  //     };

  //     expect(requisitoPoster.cumple(articulo)).toBe(false);
  //   });
});
