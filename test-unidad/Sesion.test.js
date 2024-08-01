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

describe("Sesion", () => {
  let conferencia;
  let sesionRegular;
  let sesionWorkshop;
  let sesionPoster;
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

    articuloRegular1 = new ArticuloRegular(
      "Articulo Regular",
      "url1",
      [autor1],
      autor1,
      "Resumen1"
    );

    articuloRegular2 = new ArticuloRegular(
      "Articulo Regular",
      "url1",
      [autor2],
      autor2,
      "Resumen1"
    );

    articuloRegular3 = new ArticuloRegular(
      "Articulo Regular",
      "url1",
      [autor3],
      autor3,
      "Resumen1"
    );

    articuloRegular4 = new ArticuloRegular(
      "Articulo Regular",
      "url1",
      [autor4],
      autor4,
      "Resumen1"
    );

    articuloRegular5 = new ArticuloRegular(
      "Articulo Regular",
      "url1",
      [autor5],
      autor5,
      "Resumen1"
    );

    articuloPoster = new ArticuloPoster(
      "Articulo Poster",
      "url2",
      [autor2],
      autor2,
      "urlFuentes2"
    );

    conferencia.agregarAutor(autor1);
    conferencia.agregarAutor(autor2);
    conferencia.agregarAutor(autor3);
    conferencia.agregarAutor(autor4);
    conferencia.agregarAutor(autor5);
  });
  /*********************************************************************************************************************************************************/

  /**
   * Controlo agregar y eliminar  articulos en sesiones
   * 1 - Agrego y elimino articulos de una sesion
   */

  //1
  test("Agregar y remover artículos en sesiones", () => {
    sesionRegular.agregarArticulo(articuloRegular1);
    expect(sesionRegular.articulos).toContain(articuloRegular1);
    expect(sesionRegular.articulos).toHaveLength(1);

    sesionPoster.agregarArticulo(articuloPoster);
    expect(sesionPoster.articulos).toContain(articuloPoster);
    expect(sesionPoster.articulos).toHaveLength(1);

    sesionRegular.eliminarArticulo(articuloRegular1);
    expect(sesionRegular.articulos).not.toContain(articuloRegular1);
    expect(sesionRegular.articulos).toHaveLength(0);
  });

  /*********************************************************************************************************************************************************/

  /**
   * Controlo en las conferencias agregado y eliminacion de revisores y realizo el contro tambien con las sesiones
   *  ya que si elimino un revisor de una conferencia también lo tiene que eliminar de una sesion
   * 1 - Elimino revisor de una conferencia
   * 2 - Controlo que los revisores en la sesion sean los mimos que en la conferencia
   * 3 - Elimino un revisor y me fijo en la sesion tambien se elimine
   */

  //1
  test("Agregar y remover revisores en la conferencia", () => {
    expect(conferencia.comitePrograma).toHaveLength(4);

    conferencia.eliminarRevisor(revisor1);
    expect(conferencia.comitePrograma).toHaveLength(3);
    expect(conferencia.comitePrograma).not.toContain(revisor1);

    conferencia.eliminarRevisor(revisor2);
    expect(conferencia.comitePrograma).toHaveLength(2);
    expect(conferencia.comitePrograma).not.toContain(revisor2);
  });

  //2
  test("Controlo tambien numero de revisores en la Sesion", () => {
    expect(sesionRegular.revisoresSesion()).toHaveLength(4);
  });

  //3
  test("Despues de eliminar revisores en la conferencia, controlo que tambien se elimine en la sesion", () => {
    conferencia.eliminarRevisor(revisor1);
    expect(conferencia.comitePrograma).toHaveLength(3);
    expect(conferencia.comitePrograma).not.toContain(revisor1);
    expect(sesionRegular.revisoresSesion()).toHaveLength(3);
  });

  /*********************************************************************************************************************************************************/

  /**
   * Permite probar que lanze excepciones cuando no corresponda agregar mas articulos
   * 1 - Si se alcanzo el limite
   * 2 - Si quiero agregar un articulo poster en una sesion de tipo Regular
   * 3 - Si el estado de la sesion permite, es decir tiene que estar en estado Recepcion
   *
   *
   * */
  // 1
  test("Agregar 5 articulos a la sesion y lanzar excepción al intentar agregar otro artículo en estado Bidding", () => {
    sesionRegular.agregarArticulo(articuloRegular1);
    sesionRegular.agregarArticulo(articuloRegular2);
    sesionRegular.agregarArticulo(articuloRegular3);
    sesionRegular.agregarArticulo(articuloRegular4);
    sesionRegular.agregarArticulo(articuloRegular5);

    expect(sesionRegular.articulos).toHaveLength(5);

    // Crear otro artículo para intentar agregarlo
    const otroArticulo = new ArticuloRegular(
      "Otro Articulo Regular",
      "url6",
      [autor1],
      autor1,
      "Resumen6"
    );

    // Intentar agregar el sexto artículo debe lanzar una excepción
    expect(() => sesionRegular.agregarArticulo(otroArticulo)).toThrow(
      "No se puede agregar el artículo. Se ha alcanzado el límite máximo, el tipo de artículo no es admitido, o el estado actual no permite agregar artículos."
    );
  });

  //2
  test("Agregar un articulo Poster en una sesion de tipo Regular", () => {
    sesionRegular.agregarArticulo(articuloRegular1);
    sesionRegular.agregarArticulo(articuloRegular2);
    sesionRegular.agregarArticulo(articuloRegular3);

    // Crear otro artículo para intentar agregarlo
    const otroArticuloPoster = new ArticuloPoster(
      "Articulo Poster",
      "url2",
      [autor2],
      autor2,
      "urlFuentes2"
    );

    expect(() => sesionRegular.agregarArticulo(otroArticuloPoster)).toThrow(
      "No se puede agregar el artículo. Se ha alcanzado el límite máximo, el tipo de artículo no es admitido, o el estado actual no permite agregar artículos."
    );
  });

  //3

  test("Agregar un articulo que ya no permite agregar por su estado ya no es Recepcion y esta en Bidding", () => {
    sesionRegular.agregarArticulo(articuloRegular1);
    sesionRegular.agregarArticulo(articuloRegular2);
    sesionRegular.agregarArticulo(articuloRegular3);

    // Cambiar el estado a Bidding
    sesionRegular.cambiarEstado(new Bidding(sesionRegular));

    // Crear otro artículo para intentar agregarlo
    const otroArticulo = new ArticuloRegular(
      "Otro Articulo Regular",
      "url6",
      [autor1],
      autor1,
      "Resumen6"
    );

    // Intentar agregar el sexto artículo debe lanzar una excepción
    expect(() => sesionRegular.agregarArticulo(otroArticulo)).toThrow(
      "No se puede agregar el artículo. Se ha alcanzado el límite máximo, el tipo de artículo no es admitido, o el estado actual no permite agregar artículos."
    );
  });

  //*********************************************************************************************************************************************************/

  /**
   * Prueba con 5 Articulos y 4 Revisores probamos agregar aticulos y cambiar de estado de Recepcion a Bidding para agregar bids
   * 1 - Prueba cambiando a estado Bidding y agrego un Bid
   */

  //

  test("Agregar Bids a una sesion", () => {
    sesionRegular.agregarArticulo(articuloRegular1);
    sesionRegular.agregarArticulo(articuloRegular2);
    sesionRegular.agregarArticulo(articuloRegular3);
    sesionRegular.agregarArticulo(articuloRegular4);
    sesionRegular.agregarArticulo(articuloRegular5);

    sesionRegular.cambiarEstado(new Bidding(sesionRegular));

    expect(sesionRegular.estado instanceof Bidding).toBe(true);

    const bid1 = new Bid(revisor1, articuloRegular1, InteresRevisor.INTERESADO);

    sesionRegular.recibirBid(
      revisor1,
      articuloRegular1,
      InteresRevisor.INTERESADO
    );

    expect(sesionRegular.bids).toHaveLength(1);
    // expect(sesionRegular.bids[0]).toEqual(bid1);
  });

  /*
  test("Cambiar estado y recibir bids en sesiones", () => {
    sesionRegular.cambiarEstado(new Bidding(sesionRegular));
    expect(sesionRegular.estado instanceof Bidding).toBe(true);

    sesionRegular.recibirBid(
      revisor1,
      articuloRegular,
      InteresRevisor.INTERESADO
    );
    expect(sesionRegular.bids).toHaveLength(1);
    expect(sesionRegular.bids[0]).toEqual(
      new Bid(revisor1, articuloRegular, InteresRevisor.INTERESADO)
    );
  });

  test("Definir método de selección y seleccionar artículos en sesiones", () => {
    sesionRegular.definirMetodoSeleccion(new Mejores());
    expect(sesionRegular.metodoSeleccion).toBeInstanceOf(Mejores);

    const seleccionados = sesionRegular.seleccionarArticulos();
    expect(seleccionados).toEqual([]);
  });

  test("Asignar y remover evaluaciones en sesiones", () => {
    sesionRegular.agregarArticulo(articuloRegular);
    sesionRegular.agregarArticulo(articuloPoster);

    sesionRegular.asignarEvaluacion(
      revisor1,
      articuloRegular,
      5,
      "Buen trabajo"
    );
    expect(articuloRegular.revisionesArticulo).toHaveLength(1);
    expect(articuloRegular.revisionesArticulo[0]).toEqual(
      new Revision(revisor1, 5, "Buen trabajo")
    );

    sesionRegular.removerEvaluacion(revisor1, articuloRegular);
    expect(articuloRegular.revisionesArticulo).toHaveLength(0);
  }); */
});
