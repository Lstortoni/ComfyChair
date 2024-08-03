class EstadoSesion {
  constructor(sesion) {
    this.sesion = sesion;
  }

  permiteAgregarArticulo() {
    return false; // Por defecto, no se permite agregar artículos en ningún estado.
  }

  recibirBid(revisor, articulo, interes) {
    throw new Error("Este método debe ser implementado por subclases");
  }

  cerrarBidding() {
    throw new Error("Este método debe ser implementado por subclases");
  }

  definirMetodoSeleccion(metodoSeleccion) {
    throw new Error("Este método debe ser implementado por subclases");
  }

  seleccionarArticulos() {
    throw new Error("Este método debe ser implementado por subclases");
  }

  asignarRevisores() {
    throw new Error(
      "Los revisores solo pueden ser asignados en el estado de Asignación y Revisión."
    );
  }

  asignarRevisores() {
    throw new Error("Este método debe ser implementado por subclases");
  }
  asignarEvaluacion(revisor, articulo, puntaje, texto) {
    throw new Error("Este método debe ser implementado por subclases");
  }
}

module.exports = EstadoSesion;
