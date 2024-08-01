const TipoSesion = require("./TipoSesion");

class TipoWorkshop extends TipoSesion {
  admitirRegular() {
    return true;
  }

  admitirPoster() {
    return true;
  }

  seleccionarArticulosPorTipo(articulos) {
    // Lógica específica para seleccionar artículos de tipo Workshop
  }
}

module.exports = TipoWorkshop;
