import test from "node:test";
import assert from "node:assert/strict";
import {
  createLocalProfile,
  friendlyAuthError,
  normalizeEmail,
  normalizeUsername,
  validateRegistrationInput,
} from "../auth-helpers.mjs";

test("normaliza el correo y nombre de usuario antes de autenticarlos", () => {
  assert.equal(normalizeEmail("  Autor@Ejemplo.COM "), "autor@ejemplo.com");
  assert.equal(normalizeUsername("  Autor_01  "), "autor_01");
});

test("valida los datos de registro antes de crear una cuenta", () => {
  assert.equal(
    validateRegistrationInput({ username: "mal nombre", email: "autor@ejemplo.com", password: "secreto" }),
    "El usuario solo puede tener letras, números, punto o guion bajo.",
  );
  assert.equal(
    validateRegistrationInput({ username: "autor", email: "correo-invalido", password: "secreto" }),
    "Introduce un correo electrónico válido.",
  );
  assert.equal(
    validateRegistrationInput({ username: "autor", email: "autor@ejemplo.com", password: "123" }),
    "La contraseña necesita al menos 6 caracteres.",
  );
  assert.equal(
    validateRegistrationInput({ username: "autor_01", email: "autor@ejemplo.com", password: "secreto" }),
    "",
  );
});

test("crea un perfil local utilizable aunque Firestore no esté disponible", () => {
  const profile = createLocalProfile(
    { uid: "abc123", email: "Lector@Ejemplo.com", displayName: null, photoURL: null },
    "Lector_01",
  );

  assert.deepEqual(profile, {
    username: "Lector_01",
    usernameLower: "lector_01",
    email: "lector@ejemplo.com",
    bio: "",
    avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=abc123",
    comicsCount: 0,
    followersCount: 0,
    likesCount: 0,
    savedComics: [],
  });
});

test("convierte los errores técnicos de autenticación en mensajes comprensibles", () => {
  assert.equal(friendlyAuthError({ code: "auth/network-request-failed" }), "No se pudo conectar. Revisa tu conexión e inténtalo de nuevo.");
  assert.equal(friendlyAuthError({ code: "permission-denied" }), "No se pudo acceder a tu perfil. Revisa la configuración de permisos de la aplicación.");
  assert.equal(friendlyAuthError({ code: "unknown" }), "No fue posible completar la operación. Inténtalo de nuevo.");
});
