# Verificación de Firebase Authentication para InkToon

Esta aplicación utiliza Firebase Authentication con **correo y contraseña**. No implementa OAuth ni una cookie de sesión propia: Firebase conserva la sesión del navegador mediante `browserLocalPersistence` y el observador `onAuthStateChanged` actualiza la interfaz.

Antes de publicar los cambios, verifica que en Firebase Console el proveedor **Correo electrónico/Contraseña** esté habilitado. Si se activa un proveedor OAuth en el futuro, añade `comic-virid.vercel.app` y el dominio de producción correspondiente a **Authentication → Settings → Authorized domains**.

La regla de Firestore debe permitir a una persona autenticada leer y escribir únicamente su documento `users/{uid}`. Además, debe permitir leer los documentos de `usernames` para comprobar la disponibilidad y permitir crear o borrar únicamente una reserva cuyo campo `uid` sea el del usuario autenticado. Integra estas condiciones con las reglas existentes de `comics`, `chapters`, `likes` y otras colecciones; no sustituyas las reglas completas de producción por una regla parcial.

Tras desplegar, prueba con una cuenta de prueba: crear cuenta, cerrar sesión, volver a entrar y recargar la página. Confirma que se conserva la sesión y que el perfil se muestra sin abrir de nuevo el formulario de acceso.
