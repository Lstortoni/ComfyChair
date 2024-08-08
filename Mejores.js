const MetodoSeleccion = require("./MetodoSeleccion");

class Mejores extends MetodoSeleccion {
  constructor(puntajeMinimo) {
    super();
    this.puntajeMinimo = puntajeMinimo;
  }

  seleccionarArticulos(sesion) {
    // Filtrar artículos que cumplen con el umbral de puntaje
    const articulosCumplen = sesion.articulos.filter(
      (articulo) => articulo.calificacionPromedio() > this.puntajeMinimo
    );

    // Obtener el número máximo de artículos permitidos por la sesión
    const numMaxAceptados = Math.min(
      sesion.maxArticulosAceptar,
      articulosCumplen.length
    );

    // Seleccionar los mejores artículos hasta el límite permitido
    const articulosAceptados = articulosCumplen.slice(0, numMaxAceptados);

    sesion.articulosAceptados = articulosAceptados;
  }
}

module.exports = Mejores;
