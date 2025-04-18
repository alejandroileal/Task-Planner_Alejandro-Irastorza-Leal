const htmlActions = {
  saveToLS: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getById: (id) => document.getElementById(id),
  refreshElement: (elementId, callback) => {
    const element = htmlActions.getById(elementId);
    element.replaceChildren();
    callback();
  },
  showElement: (elementId) => {
    htmlActions.getById(elementId).style.display = "Block";
  },
  hideElement: (elementId) => {
    htmlActions.getById(elementId).style.display = "None";
  },
  clearFormElement: (elementId) => {
    htmlActions.getById(elementId).value = "";
  },
  fillFormElement: (formElementId, value) => {
    htmlActions.getById(formElementId).value = value;
  },
  showSimpleDialog: (text) => {
    alert(text);
  },
  addElementInside: (parentId, elementToAdd) => {
    htmlActions.getById(parentId).prepend(elementToAdd);
  },
};

const app = {
  state: {
    tasksSlice: {
      tasks: [],
      currentTask: undefined,
      filter: "Todos",
    },
    newsSlice: {
      apikey: "61e3f2de767349ca9252ed0abf4d3215",
      news: null,
    },
  },

  elements: {
    main: { id: "mainLocator", element: htmlActions.getById("mainLocator") },
    tasksList: {
      id: "tasksList",
      element: htmlActions.getById("tasksList"),
    },
    addTaskForm: {
      id: "addTaskForm",
      element: htmlActions.getById("addTaskForm"),
    },
    allFilterBtn: {
      id: "allFilter",
    },
  },

  init() {
    this.setupEventListeners();
  },

  setupEventListeners() {
    this.getFromLs();
    window.addEventListener("hashchange", () => this.renderRoute());
    window.addEventListener("DOMContentLoaded", () => this.renderRoute());
  },

  renderRoute() {
    const currentRoute = location.hash.slice(1) || "dashboard";

    switch (currentRoute) {
      case "dashboard":
        this.renderDashboard();
        break;
      case "newTask":
        this.renderTaskForm();
        break;
      case "news":
        this.renderNews();
        console.log("In");
        break;
      default:
        break;
    }
  },

  renderDashboard() {
    this.elements.main.element.innerHTML = `<section id="section-1" class="dashboard__section">
        <div class="dashboard__top-navigator">
          <div class="dashboard__top-left">
            <p>Back Button</p>
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
              <p class="cards__filter-option" id='inProgressFilter'>En proceso</p>
              <p class="cards__filter-option" id='completedFilter'>Completado</p>
            </div>
            <ul class="cards__list" id="tasksList">
            </ul>
          </section>
        </div>`;

    this.state.tasksSlice.tasks.forEach((task) => {
      const listElement = document.createElement("li");
      listElement.classList.add("task-card__list-item");
      listElement.id = task.id;

      listElement.innerHTML = `<div class="task-card__container">
                  <p class="task-card__expiration">${task.dueDate}</p>
                  <h3 class="task-card__title">${task.title}</h3>
                  <!-- <p class="task-card__description">${task.description}</p> -->
                  <p class="task-card__state--completed">${task.status}</p>
                  <input type="checkbox" class="task-card__checkbox" id='checkedTaskBox'>
                </div>`;

      listElement.addEventListener("click", (e) => {
        this.state.tasksSlice.currentTask = this.state.tasksSlice.tasks.filter(
          (task) => task.id === e.currentTarget.id
        )[0];
        this.navigate("newTask");
      });

      document
        .querySelector(`#${this.elements.tasksList.id}`)
        .append(listElement);
    });

    document
      .querySelectorAll(".cards__filter-option")
      .forEach((filterButton) => {
        const filterButtonElement = document.querySelector(
          `#${filterButton.id}`
        );
        if (
          this.state.tasksSlice.filter.toLowerCase() ===
          filterButton.textContent.toLowerCase()
        ) {
          filterButtonElement.style.backgroundColor = "#7AC0DE";
        }
        filterButton.addEventListener("click", (e) => {
          const filter = e.currentTarget.textContent;
          this.state.tasksSlice.filter = filter;

          this.getFromLs();

          if (filter.toLowerCase() !== "todos") {
            this.state.tasksSlice.tasks = this.state.tasksSlice.tasks.filter(
              (task) => task.status.toLowerCase() === filter.toLowerCase()
            );
          }

          this.renderDashboard();
        });
      });
  },

  renderTaskForm() {
    this.elements.main.element.innerHTML = `<section id="section-2" class="dashboard__section">
        <div class="dashboard__top-navigator">
          <div class="dashboard__top-left">
            <p>Back Button</p>
            <div class="dashboard__top-left-page-title">
              <p>✍🏼</p>
              <p>Nueva task</p>
            </div>
          </div>
        </div>

        <header class="new-task__header">

        </header>

        <div class="dashboard__section-content">
          <form class="new-task__form" action="submit" id="addTaskForm">
            <textarea name='title' rows="1" class="new-task__input-title" placeholder="Nueva task"></textarea>
            <textarea name='description' rows="3" class="new-task__input-description" id="new-task-description"
              placeholder="Descripcción"></textarea>

            <div class="inputs-container">
              <label class="new-task__label" for="newTaskDate">Vencimiento</label>
              <input name='dueDate' class="new-task__input-date" id="newTaskDate" type="date">
            </div>

            <div class="inputs-container"><label class="new-task__label" for="newTaskSelect">Estatus</label>
              <select name='status' class="new-task__select" id="newTaskSelect">
                <option value="pendiente">Pendiente</option>
                <option value="en proceso">En proceso</option>
                <option value="completado">Completado</option>
              </select>
            </div>

            <button type='submit' class="new-task__submit-button">${
              this.state.tasksSlice.currentTask
                ? "Modificar task"
                : "Agregar task"
            }</button>

          </form>
        </div>
      </section>`;

    const form = document.querySelector("#addTaskForm");

    if (this.state.tasksSlice.currentTask) {
      for (let i = 0; i < form.elements.length; i++) {
        if (form[i] instanceof HTMLButtonElement) {
          continue;
        }
        form[i].value = this.state.tasksSlice.currentTask[form[i].name];
      }
    }

    htmlActions;
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this.state.tasksSlice.currentTask) {
        this.updateTask(e.target);
      } else {
        this.createTask(e.target);
      }
    });
  },

  async renderNews() {
    !this.state.newsSlice.news && (await this.fetchNews());

    this.elements.main.element.innerHTML = `<section id="section-3" class="dashboard__section">
        <div class="dashboard__top-navigator">
          <div class="dashboard__top-left">
            <p>Back Button</p>
            <div class="dashboard__top-left-page-title">
              <p>📰</p>
              <p>Noticias</p>
            </div>
          </div>
        </div>
        <header class="dashboard__header">
          <p class="dashboard__icon">📰</p>
        </header>

        <div class="dasboard__section-content">
          <h1 class="dashboard__main-title">Últimas noticias</h1>

          <section class="news__widget">
            <div class="news__search-container">
              <input class="news__search-input" type="text" placeholder="Busca un tema en específico" id="searchTopicInput">
              <button class="news__search-button" id="newsSearchBtn">Buscar</button>
            </div>

            <ul class="news__list" id="newsList"> 
            </ul>
          </section>
        </div>

      </section>`;

    const newsSearchBtn = document.querySelector("#newsSearchBtn");

    newsSearchBtn.addEventListener("click", async () => {
      const searchTopic = document.querySelector("#searchTopicInput");
      await this.fetchNews(searchTopic.value);
      this.renderNews();
    });

    const newsListElement = document.querySelector("#newsList");
    const newsFromState = this.state.newsSlice.news;

    newsFromState &&
      newsFromState.length > 0 &&
      newsFromState.forEach((newsItem) => {
        const liItem = document.createElement("li");
        liItem.classList.add("news__item");
        liItem.innerHTML = `<div class="news__photo" style="background-image: url(${newsItem.urlToImage})"></div>
                <div class="news__info-container">
                  <h2 class="news__title">${newsItem.title}</h2>
                  <div class="news__aux-info">
                    <p class="news__author">${newsItem.author}</p>
                    <span>|</span>
                    <p class="news__source">${newsItem.source.name}</p>
                    <span>|</span>
                    <p class="news__publishedAt">${newsItem.publishedAt}</p>
                  </div>

                  <p class="news__description">${newsItem.description}</p>
                  <a href="${newsItem.url}" class="news__link">Leer más</a>

                </div>`;

        newsListElement.append(liItem);
      });
  },

  createTask(form) {
    const newTask = {
      id: crypto.randomUUID(),
      title: form.title.value,
      description: form.description.value,
      dueDate: form.dueDate.value,
      status: form.status.value,
    };

    //Aquí puedo hacer las validaciones con mensaje de error

    this.state.tasksSlice.tasks.push(newTask);
    this.saveToLs();
    this.navigate("dashboard");
  },

  updateTask(form) {
    const updatedTask = {
      id: this.state.tasksSlice.currentTask.id,
      title: form.title.value,
      description: form.description.value,
      dueDate: form.dueDate.value,
      status: form.status.value,
    };
    this.state.tasksSlice.tasks = this.state.tasksSlice.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.saveToLs();
    this.navigate("dashboard");
  },

  async fetchNews(topic = "technology") {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${topic}&apikey=${this.state.newsSlice.apikey}`
      );
      const { articles } = await response.json();

      this.state.newsSlice.news = articles;
      console.log(this.state.newsSlice.news);
    } catch (error) {
      console.log(error);
    }
  },

  navigate(route) {
    location = `#${route}`;
  },

  saveToLs() {
    localStorage.setItem("tasks", JSON.stringify(this.state.tasksSlice.tasks));
  },
  getFromLs() {
    this.state.tasksSlice.tasks =
      JSON.parse(localStorage.getItem("tasks")) || [];
  },
};

app.init();
