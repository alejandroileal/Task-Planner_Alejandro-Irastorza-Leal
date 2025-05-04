export function loginSection() {
  return ` <section class="login">
    <header class="login__header">
      <img class="login__logo" src="./images/logo.png" alt="Devotion logo">
      <h1 class="dashboard__logo-title">Devotion</h1>
    </header>
    <div class="login__bottom">
      <div class="login__titles">
        <h2 class="login__title">Planéalo. Lógralo.</h2>
        <h3 class="login__subtitle">Inicia sesión en tu cuenta de Devotion</h3>
      </div>
      <form class="login__form" action="submit" id="loginForm">
        <input name="email" class="login__input--text" type="text" placeholder="email">
        <input name="password" class="login__input--text" type="password" placeholder="contraseña">
        <input class="login__input--blue-button" type="submit" value="Iniciar sesión">
      </form>

      <p class="login__register-href">¿No tienes cuenta? <a href="">Crea una</a></p>

    </div>
  </section>`;
}
