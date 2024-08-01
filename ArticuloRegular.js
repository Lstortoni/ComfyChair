const Articulo = require("./Articulo");

class ArticuloRegular extends Articulo {
  constructor(titulo, urlArchivo, autores, autorEncargado, resumen) {
    super(titulo, urlArchivo, autores, autorEncargado);
    this.resumen = resumen;
  }

  admitirEnSesion(tipoSesion) {
    return tipoSesion.admitirRegular();
  }
}

module.exports = ArticuloRegular;
