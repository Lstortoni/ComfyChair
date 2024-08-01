const Usuario = require("../Usuario");
const Rol = require("../Rol");
const RolesValidos = require("../RolesValidos");

test("Crear un usuario con un rol", () => {
  const usuario = new Usuario(
    "Leonardo Stortoni",
    "UNLP",
    "leodaniel1978@gmail.com",
    "1234",
    [new Rol(RolesValidos.CHAIR)]
  );
  expect(usuario.nombreCompleto).toBe("Leonardo Stortoni");
  expect(usuario.afiliacion).toBe("UNLP");
  expect(usuario.email).toBe("leodaniel1978@gmail.com");
  expect(usuario.roles[0].nombre).toBe(RolesValidos.CHAIR);
});

test("Crear un usuario con múltiples roles", () => {
  const usuario = new Usuario(
    "Daniel Stortoni",
    "UNLP",
    "dani@gmail.com",
    "6789",
    [new Rol(RolesValidos.AUTHOR), new Rol(RolesValidos.REVISOR)]
  );

  expect(usuario.roles).toHaveLength(2);
  expect(usuario.roles[0].nombre).toBe(RolesValidos.AUTHOR);
  expect(usuario.roles[1].nombre).toBe(RolesValidos.REVISOR);
});
