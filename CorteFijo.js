const MetodoSeleccion = require("./MetodoSeleccion");

class CorteFijo extends MetodoSeleccion {
  constructor(porcentajeAceptacion) {
    super();
    this.porcentajeAceptacion = porcentajeAceptacion;
  }

  seleccionarArticulos(sesion) {
    // Ordenar artículos por calificación promedio de mayor a menor
    const articulosOrdenados = sesion.articulos.sort(
      (a, b) => b.calificacionPromedio() - a.calificacionPromedio()
    );

    // Calcular el número de artículos que se pueden aceptar basándose en el porcentaje y redondeamos hacia arriba
    const numPorcentajeAceptados = Math.ceil(
      articulosOrdenados.length * (this.porcentajeAceptacion / 100)
    );

    // Obtener el número máximo de artículos permitidos por la sesión
    const numMaxAceptados = Math.min(
      sesion.maxArticulosAceptar,
      numPorcentajeAceptados
    );

    // Obtener los mejores artículos hasta el límite permitido
    const articulosAceptados = articulosOrdenados.slice(0, numMaxAceptados);

    sesion.articulosAceptados = articulosAceptados;
  }
}

module.exports = CorteFijo;
