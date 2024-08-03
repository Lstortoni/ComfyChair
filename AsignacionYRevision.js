const EstadoSesion = require("./EstadoSesion");
const Seleccion = require("./Seleccion");

class AsignacionYRevision extends EstadoSesion {
  permiteAgregarArticulo() {
    return false; // No se permiten agregar artículos en el estado de Asignación y Revisión.
  }

  recibirBid(revisor, articulo, interes) {
    throw new Error(
      "No se pueden recibir bids en el estado de Asignación y Revisión"
    );
  }

  cerrarBidding() {
    throw new Error(
      "El bidding ya está cerrado en el estado de Asignación y Revisión"
    );
  }

  definirMetodoSeleccion(metodoSeleccion) {
    this.sesion.metodoSeleccion = metodoSeleccion;
  }

  seleccionarArticulos() {
    throw new Error(
      "No se pueden seleccionar artículos en el estado de Asignación y Revisión"
    );
  }

  asignarEvaluacion(revisor, articulo, puntaje, texto) {
    let revision = articulo.revisiones.find(
      (revision) => revision.revisor === revisor
    );
    if (!revision) {
      revision = new Revision(revisor, puntaje, texto);
      articulo.agregarRevision(revision);
    }
  }

  asignarDeLista(
    lista,
    revisoresAsignados,
    revisionesAsignadas,
    limiteDeRevisionesPorRevisor
  ) {
    while (revisoresAsignados.length < 3 && lista.length > 0) {
      let revisor = lista.pop();
      console.log(
        "Revisiones asignanadas para el revisor:" + revisor.nombreCompleto
      );
      console.log(
        "Nomero de revisiones para el revisor al inicio" +
          revisionesAsignadas.get(revisor)
      );
      if (
        !revisoresAsignados.includes(revisor) &&
        revisionesAsignadas.get(revisor) < limiteDeRevisionesPorRevisor
      ) {
        revisoresAsignados.push(revisor);
        revisionesAsignadas.set(revisor, revisionesAsignadas.get(revisor) + 1);

        console.log(
          "Nomero de revisiones para el revisor despues de sumar" +
            revisionesAsignadas.get(revisor)
        );
      }
    }
  }

  asignarRevisores() {
    const { articulos, revisores } = this.sesion;
    const interesadosPorArticulo = new Map();
    const quizasPorArticulo = new Map();
    const noInteresadosPorArticulo = new Map();

    // /**
    //  *  Calculo el limite de articulos, el de revisores y la cantidad de revisiones por revisor
    //  *  Esto se calcula numeroArticulos lo multiplico por 3 y el resultado lo divido por el numero de revisores
    //  *  si no da exacto calculo para arriba.
    //  * */

    const numArticulos = articulos.length;
    const numRevisores = revisores.length;
    const limiteDeRevisionesPorRevisor = Math.ceil(
      (numArticulos * 3) / numRevisores
    );

    const revisionesAsignadas = new Map(
      revisores.map((revisor) => [revisor, 0])
    );

    // // Inicializar mapas para cada artículo
    articulos.forEach((articulo) => {
      // console.log("se imprime " + articulo.titulo);
      interesadosPorArticulo.set(articulo, []);
      quizasPorArticulo.set(articulo, []);
      noInteresadosPorArticulo.set(articulo, new Set(revisores));
    });

    // // Agrupar revisores por su interés para cada artículo y eliminar del conjunto de no interesados
    this.sesion.bids.forEach((bid) => {
      const { articulo, revisor, interes } = bid;

      //console.log("El valor del vid es : " + bid.interes);
      // console.log("El revisor de este vid es " + revisor.nombreCompleto);
      if (interes === "Interesado") {
        interesadosPorArticulo.get(articulo).push(revisor);
      } else if (interes === "Quizas") {
        quizasPorArticulo.get(articulo).push(revisor);
      }

      noInteresadosPorArticulo.get(articulo).delete(revisor);
    });

    articulos.forEach((articulo) => {
      let revisoresAsignados = [];

      const interesados = interesadosPorArticulo.get(articulo);
      const quizas = quizasPorArticulo.get(articulo);
      const noInteresados = Array.from(noInteresadosPorArticulo.get(articulo));

      console.log("El articulo es : " + articulo.titulo);
      // console.log("los interesados son: " + interesados.length);
      // console.log("los quizas son: " + quizas.length);
      //console.log("los no interesados son: " + noInteresados.length);
      //   // Asignar interesados primero
      this.asignarDeLista(
        interesados,
        revisoresAsignados,
        revisionesAsignadas,
        limiteDeRevisionesPorRevisor
      );
      // console.log("los revisores asignados son: " + revisoresAsignados.length);

      // Asignar quizas
      this.asignarDeLista(
        quizas,
        revisoresAsignados,
        revisionesAsignadas,
        limiteDeRevisionesPorRevisor
      );
      //console.log("los revisores asignados son: " + revisoresAsignados.length);
      //   // Asignar no interesados
      this.asignarDeLista(
        noInteresados,
        revisoresAsignados,
        revisionesAsignadas,
        limiteDeRevisionesPorRevisor
      );
      // console.log("los revisores asignados son: " + revisoresAsignados.length);
      // Asignar random en caso de no completar los 3

      let revisoresTotales = revisores;
      while (revisoresAsignados.length < 3) {
        // let revisor = revisores[Math.floor(Math.random() * revisores.length)];

        let revisor = revisoresTotales.pop();
        if (
          !revisoresAsignados.includes(revisor) // &&
          // revisionesAsignadas.get(revisor) < limiteDeRevisionesPorRevisor
        ) {
          revisoresAsignados.push(revisor);
          revisionesAsignadas.set(
            revisor,
            revisionesAsignadas.get(revisor) + 1
          );
        }
      }
      console.log(
        "Asigna esta cantidad de revisores" + revisoresAsignados.length
      );
      articulo.revisoresarticulo = revisoresAsignados;
    });

    // // para estar seguro que todos los articulos tienen asignado 3 revisores.
    // articulos.forEach((articulo) => {
    //   while (articulo.revisores.length < 3) {
    //     let revisor = revisores[Math.floor(Math.random() * revisores.length)];
    //     if (!articulo.revisores.includes(revisor)) {
    //       articulo.revisores.push(revisor);
    //       revisionesAsignadas.set(
    //         revisor,
    //         revisionesAsignadas.get(revisor) + 1
    //       );
    //     }
    //   }
    // });
    this.sesion.cambiarEstado(new Seleccion(this.sesion));
  }
}

module.exports = AsignacionYRevision;
