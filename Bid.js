// bid.js
const InteresRevisor = require("./InteresRevisor");
const Usuario = require("./Usuario"); // Suponiendo que tienes una clase Usuario definida
const Articulo = require("./Articulo"); // Suponiendo que tienes una clase Articulo definida

class Bid {
  constructor(revisor, articulo, interes) {
    if (!Object.values(InteresRevisor).includes(interes)) {
      throw new Error("El interes debe ser un valor válido de InteresRevisor.");
    }

    this.revisor = revisor;
    this.articulo = articulo;
    this.interes = interes;
  }
}

module.exports = Bid;
