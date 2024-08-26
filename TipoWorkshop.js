const TipoSesion = require("./TipoSesion");

class TipoWorkshop extends TipoSesion {
  admitirRegular() {
    return true;
  }

  admitirPoster() {
    return true;
  }
}

module.exports = TipoWorkshop;
