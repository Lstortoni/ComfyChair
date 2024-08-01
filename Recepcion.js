const EstadoSesion = require("./EstadoSesion");

class Recepcion extends EstadoSesion {
  permiteAgregarArticulo() {
    return true; // Solo en el estado de recepción se permite agregar artículos.
  }

  // Implementaciones específicas de los otros métodos para el estado de Recepción
  recibirBid(revisor, articulo, interes) {
    throw new Error("No se pueden recibir bids en el estado de Recepción");
  }

  cerrarBidding() {
    throw new Error("No se puede cerrar el bidding en el estado de Recepción");
  }

  definirMetodoSeleccion(metodoSeleccion) {
    throw new Error(
      "No se puede definir el método de selección en el estado de Recepción"
    );
  }

  seleccionarArticulos() {
    throw new Error(
      "No se puede seleccionar artículos en el estado de Recepción"
    );
  }
}

module.exports = Recepcion;
