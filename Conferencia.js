class Conferencia {
  constructor(nombre, chairs = [], comitePrograma = []) {
    this.nombre = nombre;
    this.chairs = chairs;
    this.comitePrograma = comitePrograma; //revisores
    this.sesiones = [];
    this.autores = [];
  }

  // chair = Organidadores, ComitePrograma = Son los revisores

  agregarChair(chair) {
    this.chairs.push(chair);
  }

  eliminarChair(chair) {
    this.chairs = this.chairs.filter((c) => c !== chair);
  }

  agregarRevisor(revisor) {
    this.comitePrograma.push(revisor);
    this.sesiones.forEach((sesion) => {
      sesion.actualizarRevisores(this.comitePrograma);
    });
  }

  eliminarRevisor(revisor) {
    this.comitePrograma = this.comitePrograma.filter((r) => r !== revisor);
    this.sesiones.forEach((sesion) => {
      sesion.actualizarRevisores(this.comitePrograma);
    });
  }

  agregarSesion(sesion) {
    this.sesiones.push(sesion);
  }

  eliminarSesion(sesion) {
    this.sesiones = this.sesiones.filter((s) => s !== sesion);
  }

  agregarAutor(autor) {
    this.autores.push(autor);
  }
}
module.exports = Conferencia;
