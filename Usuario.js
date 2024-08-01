class Usuario {
  constructor(nombreCompleto, afiliacion, email, contrasena, roles = []) {
    this.nombreCompleto = nombreCompleto;
    this.afiliacion = afiliacion;
    this.email = email;
    this.contrasena = contrasena;
    this.roles = roles;
  }

  agregarRol(rol) {
    this.roles.push(rol);
  }
}
module.exports = Usuario;
