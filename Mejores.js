const MetodoSeleccion = require("./MetodoSeleccion");

class Mejores extends MetodoSeleccion {
  constructor(puntajeMinimo) {
    super();
    this.puntajeMinimo = puntajeMinimo;
  }

  seleccionarArticulos(articulos) {
    return articulos.filter(
      (articulo) => articulo.puntaje >= this.puntajeMinimo
    );
  }
}

module.exports = Mejores;
