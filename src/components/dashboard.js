export function dashboard(tasks, events) {
  return `<section id="section-1" class="dashboard__section">
        <div class="dashboard__top-navigator">
          <div class="dashboard__top-left">
            <p class="dashboard__top-back" id="backBtn" >Back</p>
            <div class="dashboard__top-left-page-title">
              <p>🖥️</p>
              <p>Dashboard</p>
            </div>
          </div>
        </div>
        <header class="dashboard__header">
          <p class="dashboard__icon">🖥️</p>
        </header>

        <div class="dasboard__section-content">
          <h1 class="dashboard__main-title">Dashboard</h1>
          <section class="cards__widget">
            <h2 class="cards__title">Tasks</h2>
            <div class="cards__filter-container">
              <p class="cards__filter-option" id='allFilter'>Todos</p>
              <p class="cards__filter-option" id='pendingFilter'>Pendiente</p>
              <p class="cards__filter-option" id='inProgressFilter'>En Proceso</p>
              <p class="cards__filter-option" id='completedFilter'>Completada</p>
            </div>
            ${
              tasks.length === 0
                ? `<p class="cards__empty-message">Nada que mostrar</p>`
                : ""
            }
            <ul class="cards__list" id="tasksList">
            </ul>
          </section>

           <section class="cards__widget">
            <h2 class="cards__title">Próximos eventos</h2>
             ${
               events.length === 0
                 ? `<p class="cards__empty-message">Nada que mostrar</p>`
                 : ""
             }
            <ul class="cards__list" id="eventsList">
            </ul>
          </section>
        </div>`;
}
