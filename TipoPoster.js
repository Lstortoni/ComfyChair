const TipoSesion = require("./TipoSesion");

class TipoPoster extends TipoSesion {
  admitirRegular() {
    return false;
  }

  admitirPoster() {
    return true;
  }
}

module.exports = TipoPoster;
