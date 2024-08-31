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

  getNombreCompleto() {
    return this.nombreCompleto;
  }

  getAfiliacion() {
    return this.afiliacion;
  }

  getEmail() {
    return this.email;
  }

  getContrasena() {
    return this.contrasena;
  }

  getRoles() {
    return this.roles;
  }
}
module.exports = Usuario;
