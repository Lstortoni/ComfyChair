const Conferencia = require("../Conferencia");
const Usuario = require("../Usuario");
const Rol = require("../Rol");
const RolesValidos = require("../RolesValidos");
const Sesion = require("../Sesion");
const TipoRegular = require("../TipoRegular");

describe("Conferencia", () => {
  let conferencia;
  let chair;
  let revisor;
  let sesion;

  beforeEach(() => {
    conferencia = new Conferencia("Conferencia de Prueba");
    chair = new Usuario("Juan Pérez", "UNLP", "juan@example.com", "pass123", [
      new Rol(RolesValidos.CHAIR),
    ]);
    revisor = new Usuario("Ana García", "UNLP", "ana@example.com", "pass456", [
      new Rol(RolesValidos.REVISOR),
    ]);
    sesion = new Sesion(
      "Sesión Regular 1",
      new TipoRegular(),
      new Date(),
      new Date(),
      5
    );
  });

  test("Agregar y eliminar chairs", () => {
    conferencia.agregarChair(chair);
    expect(conferencia.chairs).toContain(chair);
    expect(conferencia.chairs).toHaveLength(1);

    conferencia.eliminarChair(chair);
    expect(conferencia.chairs).not.toContain(chair);
    expect(conferencia.chairs).toHaveLength(0);
  });

  test("Agregar y eliminar revisores", () => {
    conferencia.agregarRevisor(revisor);
    expect(conferencia.comitePrograma).toContain(revisor);
    expect(conferencia.comitePrograma).toHaveLength(1);

    conferencia.eliminarRevisor(revisor);
    expect(conferencia.comitePrograma).not.toContain(revisor);
    expect(conferencia.comitePrograma).toHaveLength(0);
  });

  test("Agregar y eliminar sesiones", () => {
    conferencia.agregarSesion(sesion);
    expect(conferencia.sesiones).toContain(sesion);
    expect(conferencia.sesiones).toHaveLength(1);

    conferencia.eliminarSesion(sesion);
    expect(conferencia.sesiones).not.toContain(sesion);
    expect(conferencia.sesiones).toHaveLength(0);
  });

  test("Agregar y eliminar multiple chairs y revisores", () => {
    const chair2 = new Usuario(
      "Marta López",
      "UNLP",
      "marta@example.com",
      "pass789",
      [new Rol(RolesValidos.CHAIR)]
    );
    const revisor2 = new Usuario(
      "Luis Rodríguez",
      "UNLP",
      "luis@example.com",
      "pass789",
      [new Rol(RolesValidos.REVISOR)]
    );

    conferencia.agregarChair(chair);
    conferencia.agregarChair(chair2);
    conferencia.agregarRevisor(revisor);
    conferencia.agregarRevisor(revisor2);

    expect(conferencia.chairs).toContain(chair);
    expect(conferencia.chairs).toContain(chair2);
    expect(conferencia.chairs).toHaveLength(2);
    expect(conferencia.comitePrograma).toContain(revisor);
    expect(conferencia.comitePrograma).toContain(revisor2);
    expect(conferencia.comitePrograma).toHaveLength(2);

    conferencia.eliminarChair(chair);
    conferencia.eliminarRevisor(revisor2);

    expect(conferencia.chairs).not.toContain(chair);
    expect(conferencia.chairs).toContain(chair2);
    expect(conferencia.chairs).toHaveLength(1);
    expect(conferencia.comitePrograma).toContain(revisor);
    expect(conferencia.comitePrograma).not.toContain(revisor2);
    expect(conferencia.comitePrograma).toHaveLength(1);
  });
});
