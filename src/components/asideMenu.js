export function asideMenu() {
  return `<div class="dashboard__logo-container">
        <img class="dashboard__logo" src="./images/logo.png" alt="Un logotipo en forma de D con la palabra Devotion">
        <h1 class="dashboard__logo-title">Devotion</h1>
      </div>
      <nav class="dashboard__nav">
        <p class="dashboard__nav-title">Atajos</p>
        <a class="dashboard__a" href="#dashboard"><button class="dashboard__nav-button">🖥️ Dashboard</button></a>

        <a href="#news" class="dashboard__a"><button class="dashboard__nav-button">📰 Últimas noticias</button></a>
        <p class="dashboard__nav-title">Acciones</p>
        <a class="dashboard__a" href="#newTask"><button class="dashboard__nav-button">✍🏼 Nueva task</button></a>
        <a class="dashboard__a" href="#newEvent"><button class="dashboard__nav-button">📆 Nuevo evento</button></a>

      </nav>
      <div class="dashboard-user-container">
        <p class="dashboard__profile-picture">AI</p>
        <p class="dashboard__profile-name">Alejandro Irastorza</p>
      </div>`;
}
