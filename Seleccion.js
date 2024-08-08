const EstadoSesion = require("./EstadoSesion");

class Seleccion extends EstadoSesion {
  permiteAgregarArticulo() {
    return false; // No se permiten agregar artículos en el estado de Selección.
  }

  recibirBid(revisor, articulo, interes) {
    throw new Error("No se pueden recibir bids en el estado de Selección");
  }

  cerrarBidding() {
    throw new Error("El bidding ya está cerrado en el estado de Selección");
  }

  definirMetodoSeleccion(metodoSeleccion) {
    throw new Error(
      "El método de selección ya está definido en el estado de Selección"
    );
  }

  seleccionarArticulos() {
    if (!this.sesion.metodoSeleccion) {
      throw new Error("No se ha definido un método de selección");
    }

    // Delegamos la selección de artículos al método de selección
    this.sesion.metodoSeleccion.seleccionarArticulos(this.sesion);
  }

  asignarRevisores() {
    throw new Error("No se pueden asignar revisores en el estado de Selecion");
  }
  asignarEvaluacion(revisor, articulo, puntaje, texto) {
    throw new Error(
      "No se pueden asignar evaluaciones en el estado de Selección"
    );
  }
}

module.exports = Seleccion;
