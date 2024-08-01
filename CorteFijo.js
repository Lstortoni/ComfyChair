const MetodoSeleccion = require("./MetodoSeleccion");

class CorteFijo extends MetodoSeleccion {
  constructor(porcentajeAceptacion) {
    super();
    this.porcentajeAceptacion = porcentajeAceptacion;
  }

  seleccionarArticulos(articulos) {
    articulos.sort(
      (a, b) => b.calificacionPromedio() - a.calificacionPromedio()
    );
    const numAceptados = Math.ceil(
      articulos.length * (this.porcentajeAceptacion / 100)
    );
    return articulos.slice(0, numAceptados);
  }
}

module.exports = CorteFijo;
