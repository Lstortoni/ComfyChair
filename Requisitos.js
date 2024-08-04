class Requisito {
  cumple(articulo) {
    throw new Error("Este método debe ser implementado por subclases");
  }
}

// En este caso defino este limite de palabras asi el numero de palabras permitidas se puede parametrizar
// para hacer las pruebas puedeo mandar un abstrac más pequeño
class RequisitoRegular extends Requisito {
  constructor(limitePalabras) {
    super();
    this.limitePalabras = limitePalabras;
  }

  cumple(articulo) {
    const abstractWordCount = articulo.resumen.split(" ").length;

    return (
      articulo.titulo &&
      articulo.autores.length > 0 &&
      abstractWordCount <= this.limitePalabras
    );
  }
}

class RequisitoPoster extends Requisito {
  cumple(articulo) {
    return articulo.titulo && articulo.autores.length > 0;
  }
}

module.exports = { Requisito, RequisitoRegular, RequisitoPoster };
