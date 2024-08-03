class Articulo {
  constructor(titulo, urlArchivo, autores, autorEncargado) {
    this.titulo = titulo;
    this.urlArchivo = urlArchivo;
    this.autores = autores;
    this.autorEncargado = autorEncargado;
    this.revisoresarticulo = [];
    this.revisionesArticulo = [];
  }

  agregarAutor(autor) {
    this.autores.push(autor);
  }

  admitirEnSesion(tipoSesion) {
    throw new Error("Este método debe ser implementado por subclases");
  }

  agregarRevision(revision) {
    if (this.revisionesArticulo.length < 3) {
      this.revisionesArticulo.push(revision);
    } else {
      throw new Error("El artículo ya tiene el máximo de 3 revisiones.");
    }
  }

  quitarRevision(revision) {
    this.revisiones = this.revisiones.filter((r) => r !== revision);
  }

  calificacionPromedio() {
    if (this.revisionesArticulo.length === 0) return 0;
    const totalPuntaje = this.evisionesArticulo.reduce(
      (sum, rev) => sum + rev.puntaje,
      0
    );
    return totalPuntaje / this.evisionesArticulo.length;
  }
}
module.exports = Articulo;
