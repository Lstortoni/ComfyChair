const Revision = require("./Revision");
const Recepcion = require("./Recepcion");
const RegularSesion = require("./TipoRegular");
const WorkshopSesion = require("./TipoWorkshop");
const PosterSesion = require("./TipoPoster");
const Bid = require("./Bid");

class Sesion {
  constructor(
    nombre,
    tipoSesion,
    fechaInicio,
    fechaFin,
    maxArticulosAceptar,
    revisoresConferencia = []
  ) {
    this.nombre = nombre;
    this.tipoSesion = tipoSesion; // Tendria que ser una instancia de TipoRegular, TipoPoster,TipoWorkShop
    this.fechaInicio = fechaInicio;
    this.fechaFin = fechaFin;
    this.articulos = [];
    this.maxArticulosAceptar = maxArticulosAceptar;
    this.bids = [];
    this.revisores = revisoresConferencia;
    this.metodoSeleccion = null;
    this.estado = null;
  }

  agregarArticulo(articulo) {
    if (
      this.estado.permiteAgregarArticulo() &&
      this.articulos.length < this.maxArticulosAceptar &&
      articulo.admitirEnSesion(this.tipoSesion)
    ) {
      this.articulos.push(articulo);
    } else {
      throw new Error(
        "No se puede agregar el artículo. Se ha alcanzado el límite máximo, el tipo de artículo no es admitido, o el estado actual no permite agregar artículos."
      );
    }
  }

  eliminarArticulo(articulo) {
    this.articulos = this.articulos.filter((a) => a !== articulo);
  }

  cambiarEstado(nuevoEstado) {
    this.estado = nuevoEstado;
  }

  recibirBid(revisor, articulo, interes) {
    this.estado.recibirBid(revisor, articulo, interes);
  }

  cerrarBidding() {
    this.estado.cerrarBidding();
  }

  definirMetodoSeleccion(metodoSeleccion) {
    this.estado.definirMetodoSeleccion(metodoSeleccion);
  }

  seleccionarArticulos() {
    return this.estado.seleccionarArticulos();
  }

  asignarRevisores() {
    this.estado.asignarRevisores();
  }

  asignarEvaluacion(revisor, articulo, puntaje, texto) {
    this.estado.asignarEvaluacion(revisor, articulo, puntaje, texto);
  }

  /*
   Retorna los revisores de la sesion que cabe aclarar
   son los mismos que estan como revisores en la conferencia
   es decir que cuando creo una sesion le seteo los revisores que tiene la conferencia
  */
  revisoresSesion() {
    return this.revisores;
  }

  actualizarRevisores(nuevosRevisores) {
    this.revisores = nuevosRevisores;
  }
}

module.exports = Sesion;
