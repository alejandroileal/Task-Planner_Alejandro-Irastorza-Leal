// Observación: Buena práctica centralizando utilidades DOM en un módulo independiente
// Sugerencia: Considerar implementar un sistema de selectores más robusto
export const htmlActions = {
  getById: (id) => document.getElementById(id),
  refreshElement: (elementId, callback) => {
    const element = htmlActions.getById(elementId);
    element.replaceChildren();
    callback();
  },
  showElement: (elementId) => {
    htmlActions.getById(elementId).style.display = "block";
  },
  hideElement: (elementId) => {
    htmlActions.getById(elementId).style.display = "none";
  },

  showSimpleDialog: (text) => {
    alert(text);
  },
};
