const EstadoSesion = require("./EstadoSesion");
const AsignacionYRevision = require("./AsignacionYRevision");
const Bid = require("./Bid");

class Bidding extends EstadoSesion {
  permiteAgregarArticulo() {
    return false;
  }

  recibirBid(revisor, articulo, interes) {
    if (!this.sesion.articulos.includes(articulo)) {
      throw new Error("El artículo no pertenece a esta sesión");
    }

    const bid = new Bid(revisor, articulo, interes);
    this.sesion.bids.push(bid);
  }

  cerrarBidding() {
    this.sesion.cambiarEstado(new AsignacionYRevision(this.sesion));
  }

  definirMetodoSeleccion(metodoSeleccion) {
    this.sesion.metodoSeleccion = metodoSeleccion;
  }

  seleccionarArticulos() {
    throw new Error(
      "No se pueden seleccionar artículos en el estado de Bidding"
    );
  }

  asignarRevisores() {
    throw new Error("No se pueden asignar revisores en el estado de Bidding");
  }
  asignarEvaluacion(revisor, articulo, puntaje, texto) {
    throw new Error(
      "No se pueden asignar evaluaciones en el estado de Bidding"
    );
  }
}

module.exports = Bidding;
