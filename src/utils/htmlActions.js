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
