// Observación: Buena práctica separando formularios en componentes independientes
// Sugerencia: Considerar implementar un sistema de validación más robusto
export function taskForm(isUpdate) {
  return `<section id="section-2" class="dashboard__section">
        <div class="dashboard__top-navigator">
          <div class="dashboard__top-left">
            <p class="dashboard__top-back" id="taskBackBtn">Back</p>
            <div class="dashboard__top-left-page-title">
              <p>✍🏼</p>
              <p>Nueva task</p>
            </div>
          </div>
        </div>

        <header class="new-task__header">
<p class="dashboard__icon">✍🏼</p>
        </header>

        <div class="dashboard__section-content">
          <form class="new-task__form" action="submit" id="addTaskForm">
            <textarea required name='title' rows="1" class="new-task__input-title" placeholder="Nueva task"></textarea>
            <textarea required name='description' rows="3" class="new-task__input-description" id="new-task-description"
              placeholder="Descripcción"></textarea>

            <div class="inputs-container">
              <label class="new-task__label" for="newTaskDate">Vencimiento</label>
              <input required name='dueDate' class="new-task__input-date" id="newTaskDate" type="date">
            </div>

            <div class="inputs-container"><label class="new-task__label" for="newTaskSelect">Estatus</label>
              <select required name='status' class="new-task__select" id="newTaskSelect">
                <option value="pendiente">Pendiente</option>
                <option value="en proceso">En proceso</option>
                <option value="completado">Completado</option>
              </select>
            </div>
            <div class="buttons-container">
            <button type='submit' class="new-task__submit-button">${
              isUpdate ? "Modificar task" : "Agregar task"
            }</button>
            ${
              isUpdate
                ? `<button type='button' id="taskDeleteBtn" class="new-task__delete-button">Eliminar task</button>`
                : ""
            }
            <button type='button' id="taskCancelBtn" class="new-task__submit-button">Cancelar</button>
            </div>
          </form>
        </div>
      </section>`;
}

