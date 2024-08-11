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

  // /*********************************************************************************************************************************************************/

  // /**
  //  * Controlo en las conferencias agregado y eliminacion de revisores y realizo el contro tambien con las sesiones
  //  *  ya que si elimino un revisor de una conferencia también lo tiene que eliminar de una sesion
  //  * 1 - Elimino revisor de una conferencia
  //  * 2 - Controlo que los revisores en la sesion sean los mimos que en la conferencia
  //  * 3 - Elimino un revisor y me fijo en la sesion tambien se elimine
  //  */

  // //1
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

  // /*********************************************************************************************************************************************************/

  /**
   * Permite probar que lanze excepciones cuando no corresponda agregar mas articulos
   * 1 - Si se alcanzo el limite
   * 2 - Si quiero agregar un articulo poster en una sesion de tipo Regular
   * 3 - Si el estado de la sesion permite, es decir tiene que estar en estado Recepcion
   *
   *
   */
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
      requisitoRegular,
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
      requisitoPoster,
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
      requisitoRegular,
      "Resumen6"
    );

    // Intentar agregar el sexto artículo debe lanzar una excepción
    expect(() => sesionRegular.agregarArticulo(otroArticulo)).toThrow(
      "No se puede agregar el artículo. Se ha alcanzado el límite máximo, el tipo de artículo no es admitido, o el estado actual no permite agregar artículos."
    );
  });

  //*********************************************************************************************************************************************************/

  /**  CON METODO DE SELECCION MEJORES
      * Prueba con 5 Articulos y 4 Revisores probamos agregar aticulos y cambiar de estado de Recepcion a Bidding para agregar bids
      * cerramos etapa de Bidding y asignamos articulos a revisores, usamos el metodo de selecion Mejores y hacemos probamos seleccionar articulos 
        una vez que finalizo la etapa de Asignacion y Revision.

      * 1 - Prueba cambiando a estado Bidding y agrego un 13 Bids
      * 2 - Verifico que la cantidad de bids en la sesion se corresponda con 13
      * 3 - Cierro la etapa de Bidding y vefifico que el estado ahora sea Asignacion y revicion
      * 4 - Verifico que tenga seteada la sesion el estado.
      * 5 - Asigno revisores verifico que cada articulo tenga 3 revisores
        6 - Asigno validaciones para todos los articulos, es decir por cada articulo recorro sus revisores
            y agrego una revision de cada articulo, no puede haber mas de 3 revisiones por articulo.
     
    */

  test("Agregar Bids a una sesion", () => {
    sesionRegular.agregarArticulo(articuloRegular1);
    sesionRegular.agregarArticulo(articuloRegular2);
    sesionRegular.agregarArticulo(articuloRegular3);
    sesionRegular.agregarArticulo(articuloRegular4);
    sesionRegular.agregarArticulo(articuloRegular5);

    sesionRegular.cambiarEstado(new Bidding(sesionRegular));

    expect(sesionRegular.estado instanceof Bidding).toBe(true);

    sesionRegular.recibirBid(
      revisor1,
      articuloRegular1,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor1,
      articuloRegular2,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor1,
      articuloRegular3,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor1,
      articuloRegular4,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor2,
      articuloRegular1,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor2,
      articuloRegular2,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor2,
      articuloRegular3,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor2,
      articuloRegular4,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor3,
      articuloRegular1,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor3,
      articuloRegular2,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor3,
      articuloRegular3,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor3,
      articuloRegular4,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(revisor4, articuloRegular5, InteresRevisor.QUIZAS);

    expect(sesionRegular.bids).toHaveLength(13);

    sesionRegular.definirMetodoSeleccion(metodoSeleccionMejores);
    sesionRegular.estado.cerrarBidding();

    //3
    expect(sesionRegular.estado instanceof AsignacionYRevision).toBe(true);

    //4 Esto lo consulto porque el estado actual siempre tiene que tener asignada la Sesion actual
    expect(sesionRegular.estado.sesion instanceof Sesion).toBe(true);

    //5
    sesionRegular.asignarRevisores();
    // Verificar que cada artículo tenga 3 revisores asignados
    sesionRegular.articulos.forEach((articulo) => {
      expect(articulo.revisoresarticulo).toHaveLength(3);
    });

    sesionRegular.articulos.forEach((articulo) => {
      expect(articulo.revisionesArticulo).toHaveLength(0);
    });

    articuloRegular1.revisoresarticulo.forEach((revisor, index) => {
      // console.log(
      //   "El revisor para el Ariculo " +
      //     articuloRegular1.titulo +
      //     revisor.nombreCompleto
      // );
      const puntaje = Math.floor(Math.random() * (120 - 50 + 1)) + 50;
      //console.log("El puntaje que va a poner es" + puntaje);
      const textoRevision = "Texto de revision para Articulo 1" + puntaje;
      sesionRegular.asignarEvaluacion(
        articuloRegular1,
        revisor,
        puntaje,
        textoRevision
      );
    });

    articuloRegular2.revisoresarticulo.forEach((revisor, index) => {
      // console.log(
      //   "El revisor para el Ariculo" +
      //     articuloRegular2.titulo +
      //     revisor.nombreCompleto
      // );
      const puntaje = Math.floor(Math.random() * (120 - 50 + 1)) + 50;
      //  console.log("El puntaje que va a poner es" + puntaje);
      const textoRevision = "Texto de revision para Articulo 1" + puntaje;
      sesionRegular.asignarEvaluacion(
        articuloRegular2,
        revisor,
        puntaje,
        textoRevision
      );
    });

    articuloRegular3.revisoresarticulo.forEach((revisor, index) => {
      // console.log(
      //   "El revisor para el Ariculo" +
      //     articuloRegular3.titulo +
      //     revisor.nombreCompleto
      // );
      const puntaje = Math.floor(Math.random() * (120 - 50 + 1)) + 50;
      //    console.log("El puntaje que va a poner es" + puntaje);
      const textoRevision = "Texto de revision para Articulo 1" + puntaje;
      sesionRegular.asignarEvaluacion(
        articuloRegular3,
        revisor,
        puntaje,
        textoRevision
      );
    });

    articuloRegular4.revisoresarticulo.forEach((revisor, index) => {
      // console.log(
      //   "El revisor para el Ariculo" +
      //     articuloRegular4.titulo +
      //     revisor.nombreCompleto
      // );
      const puntaje = Math.floor(Math.random() * (120 - 50 + 1)) + 50;
      // console.log("El puntaje que va a poner es" + puntaje);
      const textoRevision = "Texto de revision para Articulo 1" + puntaje;
      sesionRegular.asignarEvaluacion(
        articuloRegular4,
        revisor,
        puntaje,
        textoRevision
      );
    });

    articuloRegular5.revisoresarticulo.forEach((revisor, index) => {
      // console.log(
      //   "El revisor para el Ariculo" +
      //     articuloRegular5.titulo +
      //     revisor.nombreCompleto
      // );
      const puntaje = Math.floor(Math.random() * (120 - 50 + 1)) + 50;
      //   console.log("El puntaje que va a poner es" + puntaje);
      const textoRevision = "Texto de revision para Articulo 1" + puntaje;
      sesionRegular.asignarEvaluacion(
        articuloRegular5,
        revisor,
        puntaje,
        textoRevision
      );
    });

    //6
    sesionRegular.articulos.forEach((articulo) => {
      expect(articulo.revisionesArticulo).toHaveLength(3);
    });

    sesionRegular.cambiarEstado(new Seleccion(sesionRegular));

    sesionRegular.seleccionarArticulos();

    // console.log(
    //   "Cantidad de artículos aceptados:",
    //   sesionRegular.articulosAceptados.length
    // );
    // sesionRegular.articulosAceptados.forEach((articulo, index) => {
    // console.log(
    //   `Artículo aceptado ${index + 1}: ${
    //     articulo.titulo
    //   }, Puntaje Promedio: ${articulo.calificacionPromedio()}`
    // );
    // });
  });

  //*********************************************************************************************************************************************************/

  /** CON MÉTODO DE SELECCIÓN CORTE FIJO ,EN ESTE CASO EL MÁXIMO DE ARTICULOS QUE SE ACEPTA ES 5 CON LO CUAL SI TENGO 4 ARTICULOS
   *   Y LE DOY AL CORTE FIJO UN PORCENTAJE DE 25 SOLO ME TENDRÍA QUE DEJAR ACEPTAR UN SOLO ARTICULO.
      * Prueba con 5 Articulos y 4 Revisores probamos agregar aticulos y cambiar de estado de Recepcion a Bidding para agregar bids
      * cerramos etapa de Bidding y asignamos articulos a revisores, usamos el metodo de selecion Corte Fijo y hacemos probamos seleccionar articulos 
        una vez que finalizo la etapa de Asignacion y Revision.

      * 1 - Prueba cambiando a estado Bidding y agrego un 13 Bids
      * 2 - Verifico que la cantidad de bids en la sesion se corresponda con 13
      * 3 - Cierro la etapa de Bidding y vefifico que el estado ahora sea Asignacion y revicion
      * 4 - Verifico que tenga seteada la sesion el estado.
      * 5 - Asigno revisores verifico que cada articulo tenga 3 revisores
        6 - Asigno validaciones para todos los articulos, es decir por cada articulo recorro sus revisores
            y agrego una revision de cada articulo, no puede haber mas de 3 revisiones por articulo.
     
    */

  test("Agregar Bids a una sesion", () => {
    sesionRegular.agregarArticulo(articuloRegular1);
    sesionRegular.agregarArticulo(articuloRegular2);
    sesionRegular.agregarArticulo(articuloRegular3);
    sesionRegular.agregarArticulo(articuloRegular4);
    sesionRegular.agregarArticulo(articuloRegular5);

    sesionRegular.cambiarEstado(new Bidding(sesionRegular));

    expect(sesionRegular.estado instanceof Bidding).toBe(true);

    sesionRegular.recibirBid(
      revisor1,
      articuloRegular1,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor1,
      articuloRegular2,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor1,
      articuloRegular3,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor1,
      articuloRegular4,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor2,
      articuloRegular1,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor2,
      articuloRegular2,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor2,
      articuloRegular3,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor2,
      articuloRegular4,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor3,
      articuloRegular1,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor3,
      articuloRegular2,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor3,
      articuloRegular3,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(
      revisor3,
      articuloRegular4,
      InteresRevisor.INTERESADO
    );

    sesionRegular.recibirBid(revisor4, articuloRegular5, InteresRevisor.QUIZAS);

    expect(sesionRegular.bids).toHaveLength(13);

    sesionRegular.definirMetodoSeleccion(metodoSeleccionCorteFijo);
    sesionRegular.estado.cerrarBidding();

    //3
    expect(sesionRegular.estado instanceof AsignacionYRevision).toBe(true);

    //4 Esto lo consulto porque el estado actual siempre tiene que tener asignada la Sesion actual
    expect(sesionRegular.estado.sesion instanceof Sesion).toBe(true);

    //5
    sesionRegular.asignarRevisores();
    // Verificar que cada artículo tenga 3 revisores asignados
    sesionRegular.articulos.forEach((articulo) => {
      expect(articulo.revisoresarticulo).toHaveLength(3);
    });

    sesionRegular.articulos.forEach((articulo) => {
      expect(articulo.revisionesArticulo).toHaveLength(0);
    });

    articuloRegular1.revisoresarticulo.forEach((revisor, index) => {
      // console.log(
      //   "El revisor para el Ariculo " +
      //     articuloRegular1.titulo +
      //     revisor.nombreCompleto
      // );
      const puntaje = Math.floor(Math.random() * (120 - 50 + 1)) + 50;
      //console.log("El puntaje que va a poner es" + puntaje);
      const textoRevision = "Texto de revision para Articulo 1" + puntaje;
      sesionRegular.asignarEvaluacion(
        articuloRegular1,
        revisor,
        puntaje,
        textoRevision
      );
    });

    articuloRegular2.revisoresarticulo.forEach((revisor, index) => {
      // console.log(
      //   "El revisor para el Ariculo" +
      //     articuloRegular2.titulo +
      //     revisor.nombreCompleto
      // );
      const puntaje = Math.floor(Math.random() * (120 - 50 + 1)) + 50;
      //  console.log("El puntaje que va a poner es" + puntaje);
      const textoRevision = "Texto de revision para Articulo 1" + puntaje;
      sesionRegular.asignarEvaluacion(
        articuloRegular2,
        revisor,
        puntaje,
        textoRevision
      );
    });

    articuloRegular3.revisoresarticulo.forEach((revisor, index) => {
      // console.log(
      //   "El revisor para el Ariculo" +
      //     articuloRegular3.titulo +
      //     revisor.nombreCompleto
      // );
      const puntaje = Math.floor(Math.random() * (120 - 50 + 1)) + 50;
      //   console.log("El puntaje que va a poner es" + puntaje);
      const textoRevision = "Texto de revision para Articulo 1" + puntaje;
      sesionRegular.asignarEvaluacion(
        articuloRegular3,
        revisor,
        puntaje,
        textoRevision
      );
    });

    articuloRegular4.revisoresarticulo.forEach((revisor, index) => {
      // console.log(
      //   "El revisor para el Ariculo" +
      //     articuloRegular4.titulo +
      //     revisor.nombreCompleto
      // );
      const puntaje = Math.floor(Math.random() * (120 - 50 + 1)) + 50;
      //  console.log("El puntaje que va a poner es" + puntaje);
      const textoRevision = "Texto de revision para Articulo 1" + puntaje;
      sesionRegular.asignarEvaluacion(
        articuloRegular4,
        revisor,
        puntaje,
        textoRevision
      );
    });

    articuloRegular5.revisoresarticulo.forEach((revisor, index) => {
      // console.log(
      //   "El revisor para el Ariculo" +
      //     articuloRegular5.titulo +
      //     revisor.nombreCompleto
      // );
      const puntaje = Math.floor(Math.random() * (120 - 50 + 1)) + 50;
      // console.log("El puntaje que va a poner es" + puntaje);
      const textoRevision = "Texto de revision para Articulo 1" + puntaje;
      sesionRegular.asignarEvaluacion(
        articuloRegular5,
        revisor,
        puntaje,
        textoRevision
      );
    });

    //6
    sesionRegular.articulos.forEach((articulo) => {
      expect(articulo.revisionesArticulo).toHaveLength(3);
    });

    sesionRegular.cambiarEstado(new Seleccion(sesionRegular));

    sesionRegular.seleccionarArticulos();

    // console.log(
    //   "Cantidad de artículos aceptados:",
    //   sesionRegular.articulosAceptados.length
    // );
    sesionRegular.articulosAceptados.forEach((articulo, index) => {
      console.log(
        `Artículo aceptado ${index + 1}: ${
          articulo.titulo
        }, Puntaje Promedio: ${articulo.calificacionPromedio()}`
      );
    });
  });
});
