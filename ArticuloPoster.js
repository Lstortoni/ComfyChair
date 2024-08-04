// poster.js
const Articulo = require("./Articulo");

class ArticuloPoster extends Articulo {
  constructor(
    titulo,
    urlArchivo,
    autores,
    autorEncargado,
    tipoRequisito,
    urlFuentes
  ) {
    super(titulo, urlArchivo, autores, autorEncargado, tipoRequisito);
    this.urlFuentes = urlFuentes;
  }

  admitirEnSesion(tipoSesion) {
    return tipoSesion.admitirPoster();
  }
}

module.exports = ArticuloPoster;
