const Articulo = require("./Articulo");

class ArticuloRegular extends Articulo {
  constructor(
    titulo,
    urlArchivo,
    autores,
    autorEncargado,
    tipoRequisito,
    resumen
  ) {
    super(titulo, urlArchivo, autores, autorEncargado, tipoRequisito);
    this.resumen = resumen;
  }

  admitirEnSesion(tipoSesion) {
    return tipoSesion.admitirRegular();
  }
}

module.exports = ArticuloRegular;
