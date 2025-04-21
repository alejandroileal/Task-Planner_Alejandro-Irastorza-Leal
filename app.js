import { dashboard } from "./src/components/dashboard.js";
import { eventForm } from "./src/components/eventForm.js";
import { mobileNav } from "./src/components/mobileNav.js";
import { taskForm } from "./src/components/taskFrom.js";
import { htmlActions } from "./src/utils/htmlActions.js";

const app = {
  state: {
    tasksSlice: {
      tasks: [],
      currentTask: null,
      filter: "Todos",
    },
    eventsSlice: {
      events: [],
      currentEvent: null,
      currentCity: null,
    },
    newsSlice: {
      apikey: "61e3f2de767349ca9252ed0abf4d3215",
      news: null,
    },
    weatherSlice: {
      opencageApiKey: "c54de52228dc4c289948de575b105fd3",
      openWeatherApiKey: "96cb6093c994e234f88e5034dd735bea",
    },
  },

  elements: {
    main: { id: "mainLocator", element: htmlActions.getById("mainLocator") },
    dashboard: { id: "dashboard", element: htmlActions.getById("dashboard") },
    tasksList: {
      id: "tasksList",
      element: htmlActions.getById("tasksList"),
    },
    eventsList: {
      id: "eventsList",
      element: htmlActions.getById("eventsList"),
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
        break;
      case "newEvent":
        this.renderEventForm();
        break;
      case "nav":
        console.log(window.outerWidth);
        if (Number(window.outerWidth) < 766) {
          this.renderMobileNav();
        } else {
          this.navigate("dashboard");
        }
        break;
      default:
        this.renderDashboard();
        break;
    }
  },

  renderDashboard() {
    this.elements.main.element.innerHTML = dashboard(
      this.state.tasksSlice.tasks,
      this.state.eventsSlice.events
    );

    this.state.tasksSlice.tasks
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .forEach((task) => {
        const listElement = document.createElement("li");
        listElement.classList.add("task-card__list-item");
        listElement.id = task.id;

        listElement.innerHTML = `<div class="task-card__container">
                  <p class="task-card__expiration">${this.formatDate(
                    task.dueDate
                  )}</p>
                  <h3 class="task-card__title">${task.title}</h3>
                  <!-- <p class="task-card__description">${
                    task.description
                  }</p> -->
                  <p class="task-card__state">${task.status}</p>
                </div>`;

        listElement.addEventListener("click", (e) => {
          this.state.tasksSlice.currentTask =
            this.state.tasksSlice.tasks.filter(
              (task) => task.id === e.currentTarget.id
            )[0];
          this.navigate("newTask");
        });

        document
          .querySelector(`#${this.elements.tasksList.id}`)
          .append(listElement);
      });

    this.state.eventsSlice.events
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .forEach((event) => {
        const listElement = document.createElement("li");
        listElement.classList.add("event-card__list-container");
        listElement.id = event.id;

        listElement.innerHTML = `<div class="event__weather-img" style="background-image: url(https://openweathermap.org/img/wn/${
          event.weatherData.icon
        }@2x.png)">
                </div>
                <div class="event__info-container">
                  <h3 class="event__title">${event.title}</h3>
                  <div class="event__time-and-date">
                  <p class="event__date">${this.formatDate(
                    event.date
                  )} <span>|</span> </p>
                  <p class="event__time">${event.time}</p>
                  </div>
                  
                  ${
                    event.weatherData === null
                      ? ""
                      : `<div class="event__weather-data"><p class="event__min">Min ${
                          event.weatherData && event.weatherData.temp_min
                        } °C</p>
                  <p class="event__max">Max ${
                    event.weatherData && event.weatherData.temp_max
                  } °C</p> </div>`
                  }
                </div>`;

        listElement.addEventListener("click", (e) => {
          this.state.eventsSlice.currentEvent =
            this.state.eventsSlice.events.find(
              (event) => event.id === e.currentTarget.id
            );
          console.log(this.state.eventsSlice.currentEvent);
          this.navigate("newEvent");
        });

        document
          .querySelector(`#${this.elements.eventsList.id}`)
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
          filterButtonElement.style.backgroundColor = "#9AF0FF";
          filterButtonElement.style.borderColor = "#9AF0FF";
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

    const backBtn = document.querySelector("#backBtn");
    backBtn.addEventListener("click", () => {
      this.navigate("nav");
    });
  },

  renderTaskForm() {
    this.elements.main.element.innerHTML = taskForm(
      this.state.tasksSlice.currentTask !== null
    );

    const form = document.querySelector("#addTaskForm");
    const taskCancelBtn = document.querySelector("#taskCancelBtn");

    if (this.state.tasksSlice.currentTask) {
      for (let i = 0; i < form.elements.length; i++) {
        if (form[i] instanceof HTMLButtonElement) {
          continue;
        }
        form[i].value = this.state.tasksSlice.currentTask[form[i].name];
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this.state.tasksSlice.currentTask) {
        this.updateTask(e.target);
      } else {
        this.createTask(e.target);
      }
    });

    taskCancelBtn.addEventListener("click", () => {
      this.state.tasksSlice.currentTask = null;
      this.navigate("dashboard");
    });

    const taskBackBtn = document.querySelector("#taskBackBtn");
    taskBackBtn.addEventListener("click", () => {
      this.navigate("nav");
    });

    if (this.state.tasksSlice.currentTask !== null) {
      const deleteTaskBtn = document.querySelector("#taskDeleteBtn");
      deleteTaskBtn.addEventListener("click", () => {
        this.deleteTask(this.state.tasksSlice.currentTask.id);
      });
    }
  },

  renderEventForm() {
    this.elements.main.element.innerHTML = eventForm(
      this.state.eventsSlice.currentEvent !== null
    );

    const form = document.querySelector("#addEventForm");
    const eventCancelBtn = document.querySelector("#eventCancelBtn");

    if (this.state.eventsSlice.currentEvent) {
      for (let i = 0; i < form.elements.length; i++) {
        if (form[i] instanceof HTMLButtonElement) {
          continue;
        }
        form[i].value = this.state.eventsSlice.currentEvent[form[i].name];
      }
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this.state.eventsSlice.currentEvent) {
        this.updateEvent(e.target);
      } else {
        this.createEvent(e.target);
      }
    });

    eventCancelBtn.addEventListener("click", () => {
      this.state.eventsSlice.currentEvent = null;
      this.navigate("dashboard");
    });

    const eventBackBtn = document.querySelector("#eventBackBtn");
    eventBackBtn.addEventListener("click", () => {
      this.navigate("nav");
    });

    if (this.state.eventsSlice.currentEvent !== null) {
      console.log("Botón de eliminar activado");
      const eventDeleteBtn = document.querySelector("#eventDeleteBtn");
      eventDeleteBtn.addEventListener("click", () => {
        this.deleteEvent(this.state.eventsSlice.currentEvent.id);
      });
    }
  },

  async renderNews() {
    !this.state.newsSlice.news && (await this.fetchNews());

    this.elements.main.element.innerHTML = `<section id="section-3" class="dashboard__section">
        <div class="dashboard__top-navigator">
          <div class="dashboard__top-left">
            <p class="dashboard__top-back" id="newsBackBtn" >Back</p>
            <div class="dashboard__top-left-page-title">
              <p>📰</p>
              <p>Noticias</p>
            </div>
          </div>
        </div>
        <header class="news__header">
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
        liItem.innerHTML = `<div class="news__photo" style="background-image: url(${
          newsItem.urlToImage
        })"></div>
                <div class="news__info-container">
                  <h2 class="news__title">${newsItem.title}</h2>
                  <div class="news__aux-info">
                    <p class="news__author">${newsItem.author}</p>
                    <span>|</span>
                    <p class="news__source">${newsItem.source.name}</p>
                    <span>|</span>
                    <p class="news__publishedAt">${new Date(
                      newsItem.publishedAt
                    ).toLocaleString("es-Es", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}</p>
                  </div>

                  <p class="news__description">${newsItem.description}</p>
                  <a href="${newsItem.url}" class="news__link">Leer más</a>

                </div>`;

        newsListElement.append(liItem);
      });

    const newsbackBtn = document.querySelector("#newsBackBtn");

    newsbackBtn.addEventListener("click", () => {
      console.log("clck");
      this.navigate("nav");
    });
  },

  renderLoading() {
    this.elements.main.element.innerHTML = `<section class="loading__section">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif"
          alt="" srcset="">
      </section>`;
  },

  renderMobileNav() {
    this.elements.main.element.innerHTML = mobileNav();
  },

  createTask(form) {
    const newTask = {
      id: crypto.randomUUID(),
      title: form.title.value,
      description: form.description.value,
      dueDate: form.dueDate.value,
      status: form.status.value,
    };

    let missingValues = [];

    for (let prop in newTask) {
      if (!newTask[prop]) {
        missingValues.push(prop);
      }
    }

    if (missingValues.length > 0) {
      htmlActions.showSimpleDialog(
        `Faltan campos obligatorios: ${missingValues.join(", ")}`
      );
    } else {
      this.state.tasksSlice.tasks.push(newTask);
      this.saveToLs();
      this.navigate("dashboard");
      htmlActions.showSimpleDialog("Task creada con éxito");
    }
  },

  async createEvent(form) {
    const newEvent = {
      id: crypto.randomUUID(),
      title: form.title.value,
      date: form.date.value,
      time: form.time.value,
      details: form.details.value,
      weatherData: await this.fetchWeather(form.date.value),
    };

    let missingValues = [];

    for (let prop in newEvent) {
      if (!newEvent[prop]) {
        missingValues.push(prop);
      }
    }

    if (missingValues.length > 0) {
      htmlActions.showSimpleDialog(
        `Faltan campos obligatorios: ${missingValues.join(", ")}`
      );
    } else {
      this.state.eventsSlice.events.push(newEvent);
      this.saveToLs();
      this.navigate("dashboard");
      htmlActions.showSimpleDialog("Evento creado con éxito");
    }
  },

  updateTask(form) {
    const updatedTask = {
      id: this.state.tasksSlice.currentTask.id,
      title: form.title.value,
      description: form.description.value,
      dueDate: form.dueDate.value,
      status: form.status.value,
    };

    let missingValues = [];

    for (let prop in updatedTask) {
      if (!updatedTask[prop]) {
        missingValues.push(prop);
      }
    }

    if (missingValues.length > 0) {
      htmlActions.showSimpleDialog(
        `Faltan campos obligatorios: ${missingValues.join(", ")}`
      );
    } else {
      this.state.tasksSlice.tasks = this.state.tasksSlice.tasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );

      this.state.tasksSlice.currentTask = null;
      this.saveToLs();
      this.navigate("dashboard");
      htmlActions.showSimpleDialog("Task modificada con éxito");
    }
  },

  async updateEvent(form) {
    const updatedEvent = {
      id: this.state.eventsSlice.currentEvent.id,
      title: form.title.value,
      date: form.date.value,
      time: form.time.value,
      details: form.details.value,
      weatherData: await this.fetchWeather(form.date.value),
    };
    let missingValues = [];

    for (let prop in updatedEvent) {
      if (!updatedEvent[prop]) {
        missingValues.push(prop);
      }
    }

    if (missingValues.length > 0) {
      htmlActions.showSimpleDialog(
        `Faltan campos obligatorios: ${missingValues.join(", ")}`
      );
    } else {
      this.state.eventsSlice.events = this.state.eventsSlice.events.map(
        (event) => (event.id === updatedEvent.id ? updatedEvent : event)
      );
      this.state.eventsSlice.currentEvent = null;
      this.saveToLs();
      this.navigate("dashboard");
      htmlActions.showSimpleDialog("Evento modificado con éxito");
    }
  },

  deleteTask(taskId) {
    const filteredTasks = this.state.tasksSlice.tasks.filter(
      (task) => task.id !== taskId
    );

    this.state.tasksSlice.tasks = filteredTasks;
    this.state.tasksSlice.currentTask = null;
    this.saveToLs();
    this.navigate("dashboard");
    htmlActions.showSimpleDialog("Task eliminada con éxito");
  },

  deleteEvent(eventId) {
    const filteredEvents = this.state.eventsSlice.events.filter(
      (event) => event.id !== eventId
    );

    this.state.eventsSlice.events = filteredEvents;
    this.state.eventsSlice.currentEvent = null;
    this.saveToLs();
    this.navigate("dashboard");
    htmlActions.showSimpleDialog("Evento eliminado con éxito");
  },

  async fetchNews(topic = "code") {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${topic}&apikey=${this.state.newsSlice.apikey}`
      );
      const { articles } = await response.json();

      this.state.newsSlice.news = articles;
    } catch (error) {
      htmlActions.showSimpleDialog(error.message);
    }
  },

  async fetchWeather(date) {
    try {
      const eventDate = new Date(date); // Fecha que llega del formulario
      const timestamp = Math.floor(eventDate.getTime() / 1000);

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=40.4165&lon=-3.70256&appid=${this.state.weatherSlice.openWeatherApiKey}&units=metric&lang=es`
      );

      const { list } = await response.json();

      let closestData = list[0];
      let closestDiff = Math.abs(list[0].dt - timestamp);

      for (const item of list) {
        const diff = Math.abs(item.dt - timestamp);
        if (diff < closestDiff) {
          closestDiff = diff;
          closestData = item;
        }
      }

      return {
        temp: closestData.main.temp,
        temp_min: closestData.main.temp_min,
        temp_max: closestData.main.temp_max,
        description: closestData.weather[0].description,
        icon: closestData.weather[0].icon,
      };
    } catch (error) {
      htmlActions.showSimpleDialog("Error al obtener los datos del clima");
      return null;
    }
  },

  formatDate(date) {
    return new Date(date).toLocaleString("es-Es", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  },

  navigate(route) {
    location = `#${route}`;
  },

  saveToLs() {
    localStorage.setItem("tasks", JSON.stringify(this.state.tasksSlice.tasks));
    localStorage.setItem(
      "events",
      JSON.stringify(this.state.eventsSlice.events)
    );
  },
  getFromLs() {
    this.state.tasksSlice.tasks =
      JSON.parse(localStorage.getItem("tasks")) || [];

    this.state.eventsSlice.events =
      JSON.parse(localStorage.getItem("events")) || [];
  },
};

app.init();
