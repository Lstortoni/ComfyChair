const MetodoSeleccion = require("./MetodoSeleccion");

class CorteFijo extends MetodoSeleccion {
  constructor(porcentajeAceptacion) {
    super();
    this.porcentajeAceptacion = porcentajeAceptacion;
  }

  seleccionarArticulos(articulos) {
    // Ordenar artículos por calificación promedio de mayor a menor
    articulos.sort(
      (a, b) => b.calificacionPromedio() - a.calificacionPromedio()
    );

    // Calcular el número de artículos que se pueden aceptar basándose en el porcentaje
    const numAceptados = Math.ceil(
      articulos.length * (this.porcentajeAceptacion / 100)
    );

    // Obtener los mejores artículos hasta el límite permitido
    const articulosAceptados = articulos.slice(0, numAceptados);

    // Asegurar que cada artículo tiene al menos 3 revisores asignados, asignando revisores aleatorios si es necesario
    const comitePrograma = this.sesion.comitePrograma;
    articulosAceptados.forEach((articulo) => {
      while (articulo.revisores.length < 3) {
        let revisor =
          comitePrograma[Math.floor(Math.random() * comitePrograma.length)];
        if (!articulo.revisores.includes(revisor)) {
          articulo.revisores.push(revisor);
        }
      }
    });

    return articulosAceptados;
  }
}

module.exports = CorteFijo;
