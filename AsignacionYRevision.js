const EstadoSesion = require("./EstadoSesion");

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
    const { articulos, comitePrograma } = this.sesion;
    const interesadosPorArticulo = new Map();
    const quizasPorArticulo = new Map();
    const noInteresadosPorArticulo = new Map();

    /**
     *  Calculo el limite de articulos, el de revisores y la cantidad de revisiones por revisor
     *  Esto se calcula numeroArticulos lo multiplico por 3 y el resultado lo divido por el numero de revisores
     *  si no da exacto calculo para arriba.
     * */

    const numArticulos = articulos.length;
    const numRevisores = comitePrograma.length;
    const limiteDeRevisionesPorRevisor = Math.ceil(
      (numArticulos * 3) / numRevisores
    );

    // Inicializar revisiones asignadas por revisor
    const revisionesAsignadas = new Map(
      comitePrograma.map((revisor) => [revisor, 0])
    );

    // Inicializar mapas para cada artículo
    articulos.forEach((articulo) => {
      interesadosPorArticulo.set(articulo, []);
      quizasPorArticulo.set(articulo, []);
      noInteresadosPorArticulo.set(articulo, new Set(comitePrograma));
    });

    // Agrupar revisores por su interés para cada artículo y eliminar del conjunto de no interesados
    this.sesion.bids.forEach((bid) => {
      const { articulo, revisor, interes } = bid;

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

      // Asignar interesados primero
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
      while (revisoresAsignados.length < 3) {
        let revisor =
          comitePrograma[Math.floor(Math.random() * comitePrograma.length)];
        if (
          !revisoresAsignados.includes(revisor) &&
          revisionesAsignadas.get(revisor) < limiteDeRevisionesPorRevisor
        ) {
          revisoresAsignados.push(revisor);
          revisionesAsignadas.set(
            revisor,
            revisionesAsignadas.get(revisor) + 1
          );
        }
      }

      articulo.revisores = revisoresAsignados;
    });

    // para estar seguro que todos los articulos tienen asignado 3 revisores.
    articulos.forEach((articulo) => {
      while (articulo.revisores.length < 3) {
        let revisor =
          comitePrograma[Math.floor(Math.random() * comitePrograma.length)];
        if (!articulo.revisores.includes(revisor)) {
          articulo.revisores.push(revisor);
          revisionesAsignadas.set(
            revisor,
            revisionesAsignadas.get(revisor) + 1
          );
        }
      }
    });
    this.sesion.cambiarEstado(new Seleccion(this.sesion));
  }
}

module.exports = AsignacionYRevision;
