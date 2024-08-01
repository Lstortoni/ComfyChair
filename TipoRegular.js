const TipoSesion = require("./TipoSesion");

class TipoRegular extends TipoSesion {
  admitirRegular() {
    return true;
  }

  admitirPoster() {
    return false;
  }
}

module.exports = TipoRegular;
