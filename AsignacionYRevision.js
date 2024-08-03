const EstadoSesion = require("./EstadoSesion");
const Revision = require("./Revision");

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

  asignarEvaluacion(articulo, revisor, puntaje, texto) {
    let revision = articulo.revisionesArticulo.find(
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
      if (
        !revisoresAsignados.includes(revisor) &&
        revisionesAsignadas.get(revisor) < limiteDeRevisionesPorRevisor
      ) {
        revisoresAsignados.push(revisor);
        revisionesAsignadas.set(revisor, revisionesAsignadas.get(revisor) + 1);
      }
    }
  }

  asignarRevisores() {
    const { articulos, revisores } = this.sesion;
    const interesadosPorArticulo = new Map();
    const quizasPorArticulo = new Map();
    const noInteresadosPorArticulo = new Map();
    const articulosPorOrdenDeInteresados = articulos;

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
      interesadosPorArticulo.set(articulo, []);
      quizasPorArticulo.set(articulo, []);
      noInteresadosPorArticulo.set(articulo, new Set(revisores));
    });

    // // Agrupar revisores por su interés para cada artículo y eliminar del conjunto de no interesados
    this.sesion.bids.forEach((bid) => {
      const { articulo, revisor, interes } = bid;

      if (interes === "Interesado") {
        interesadosPorArticulo.get(articulo).push(revisor);
      } else if (interes === "Quizas") {
        quizasPorArticulo.get(articulo).push(revisor);
      }

      noInteresadosPorArticulo.get(articulo).delete(revisor);
    });

    // Ordenar los artículos primero por cantidad de interesados, luego por cantidad de quizas

    // La idea es ordenarlos cosa que vaya analizando y asignando revisores analizando primero
    // los articulos que tienen mas interesados y más quizas.
    articulos.sort((a, b) => {
      const interesadosA = interesadosPorArticulo.get(a).length;
      const interesadosB = interesadosPorArticulo.get(b).length;
      const quizasA = quizasPorArticulo.get(a).length;
      const quizasB = quizasPorArticulo.get(b).length;

      if (interesadosA !== interesadosB) {
        return interesadosB - interesadosA; // Orden descendente por interesados
      }
      return quizasB - quizasA; // Orden descendente por quizas
    });

    //

    articulos.forEach((articulo) => {
      let revisoresAsignados = [];

      const interesados = interesadosPorArticulo.get(articulo);
      const quizas = quizasPorArticulo.get(articulo);
      const noInteresados = Array.from(noInteresadosPorArticulo.get(articulo));

      this.asignarDeLista(
        interesados,
        revisoresAsignados,
        revisionesAsignadas,
        limiteDeRevisionesPorRevisor
      );

      // Asignar quizas
      this.asignarDeLista(
        quizas,
        revisoresAsignados,
        revisionesAsignadas,
        limiteDeRevisionesPorRevisor
      );

      // Asignar no interesados
      this.asignarDeLista(
        noInteresados,
        revisoresAsignados,
        revisionesAsignadas,
        limiteDeRevisionesPorRevisor
      );

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

      articulo.revisoresarticulo = revisoresAsignados;
    });
  }
}

module.exports = AsignacionYRevision;
