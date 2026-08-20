export function normalizeEmail(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function normalizeUsername(value) {
  return String(value ?? "").trim().toLowerCase();
}

export function validateRegistrationInput({ username, email, password }) {
  const normalizedUsername = normalizeUsername(username);
  const normalizedEmail = normalizeEmail(email);

  if (normalizedUsername.length < 3 || normalizedUsername.length > 20) {
    return "El nombre de usuario debe tener entre 3 y 20 caracteres.";
  }

  if (!/^[a-z0-9_.]+$/.test(normalizedUsername)) {
    return "El usuario solo puede tener letras, números, punto o guion bajo.";
  }

  if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
    return "Introduce un correo electrónico válido.";
  }

  if (String(password ?? "").length < 6) {
    return "La contraseña necesita al menos 6 caracteres.";
  }

  return "";
}

export function friendlyAuthError(error) {
  const code = String(error?.code ?? "");
  const messages = {
    "app/username-already-in-use": "Ese nombre de usuario ya está en uso.",
    "auth/email-already-in-use": "Ese correo ya tiene una cuenta. Prueba a iniciar sesión.",
    "auth/invalid-email": "El correo no es válido.",
    "auth/weak-password": "La contraseña necesita al menos 6 caracteres.",
    "auth/user-not-found": "Correo o contraseña incorrectos.",
    "auth/wrong-password": "Correo o contraseña incorrectos.",
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
    "auth/user-disabled": "Esta cuenta está deshabilitada. Contacta con soporte.",
    "auth/too-many-requests": "Demasiados intentos. Espera unos minutos antes de volver a intentarlo.",
    "auth/network-request-failed": "No se pudo conectar. Revisa tu conexión e inténtalo de nuevo.",
    "auth/operation-not-allowed": "El acceso con correo y contraseña no está habilitado en este proyecto.",
    "auth/unauthorized-domain": "Este dominio no está autorizado para iniciar sesión. Contacta con soporte.",
    "permission-denied": "No se pudo acceder a tu perfil. Revisa la configuración de permisos de la aplicación.",
    "unavailable": "El servicio no está disponible en este momento. Inténtalo de nuevo.",
  };

  return messages[code] || "No fue posible completar la operación. Inténtalo de nuevo.";
}
