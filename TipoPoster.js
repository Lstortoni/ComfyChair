const TipoSesion = require("./TipoSesion");

class TipoPoster extends TipoSesion {
  admitirRegular() {
    return false;
  }

  admitirPoster() {
    return true;
  }

  seleccionarArticulosPorTipo(articulos) {
    // Lógica específica para seleccionar artículos de tipo Poster
  }
}

module.exports = TipoPoster;
