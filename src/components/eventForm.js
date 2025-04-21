export function eventForm(isUpdate) {
  return `<section id="section-4" class="dashboard__section">
        <div class="dashboard__top-navigator">
          <div class="dashboard__top-left">
            <p class="dashboard__top-back" id="eventBackBtn">Back</p>
            <div class="dashboard__top-left-page-title">
              <p>📆</p>
              <p>Nuevo evento</p>
            </div>
          </div>
        </div>

        <header class="new-event__header">
          <p class="dashboard__icon">📆</p>
        </header>

        <div class="dashboard__section-content">
          <form class="new-event__form" action="submit" id="addEventForm">
            <textarea required name="title" rows="1" class="new-task__input-title" placeholder="Nuevo evento"></textarea>
            <div class="inputs-container">
              <label class="new-event__label" for="newEventDate">Fecha</label>
              <input required name="date" class="new-event__input-date" id="newEventDate" type="date">
            </div>
            <div class="inputs-container">
              <label class="new-event__label" for="newEventTime">Hora</label>
              <input required name="time" class="new-event__input-date" id="newEventTime" type="time">
            </div>
            <textarea required name="details" rows="3" class="new-event__input-details" id="new-event-details"
              placeholder="Detalles relevantes"></textarea>
            <div class="buttons-container">

            <button class="new-event__submit-button">${
              isUpdate ? "Modificar evento" : "Añadir evento"
            }</button>
             ${
               isUpdate
                 ? `<button type='button' id="eventDeleteBtn" class="new-task__delete-button">Eliminar evento</button>`
                 : ""
             }
            <button type='button' id="eventCancelBtn" class="new-task__submit-button">Cancelar</button>
            </div>
          </form>
        </div>

      </section>`;
}
