export function registerForm() {
  return ` <section class="register">
    <header class="login__header">
      <img class="login__logo" src="./images/logo.png" alt="Devotion logo">
      <h1 class="dashboard__logo-title">Devotion</h1>
    </header>
    <div class="login__bottom">
      <div class="login__titles">
        <h2 class="login__title">Todo tiene un inicio.</h2>
        <h3 class="login__subtitle">Crea tu cuenta de Devotion</h3>
      </div>
      <form class="login__form" action="submit" id="registerForm">
        <input name="firstName" class="login__input--text" type="text" placeholder="nombre">
        <input name="lastName" class="login__input--text" type="text" placeholder="apellido">
        <input name="email" class="login__input--text" type="text" placeholder="email">
        <input name="password" class="login__input--text" type="password" placeholder="contraseña">
        <input class="login__input--blue-button" type="submit" value="Registrarme">
      </form>

      <p class="login__register-href">¿Ya tienes cuenta? <a href="#login">Inicia sesión</a></p>

    </div>
  </section>`;
}
