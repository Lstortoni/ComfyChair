// revision.js
class Revision {
  constructor(revisor, puntaje, texto) {
    this.revisor = revisor;
    this.texto = texto;
    this.puntaje = puntaje;
  }

  asignarPuntaje(puntaje) {
    this.puntaje = puntaje;
  }

  agregarTexto(texto) {
    this.texto = texto;
  }

  getPuntaje() {
    return this.puntaje;
  }

  getTexto() {
    return this.texto;
  }
}

module.exports = Revision;
