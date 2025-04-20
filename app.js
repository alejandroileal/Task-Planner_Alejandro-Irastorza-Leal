const htmlActions = {
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

const app = {
  state: {
    tasksSlice: {
      tasks: [],
      currentTask: undefined,
      filter: "Todos",
    },
    eventsSlice: {
      events: [],
      currentEvent: null,
      avilableCities: [
        "Madrid",
        "Barcelona",
        "Valencia",
        "Sevilla",
        "Zaragoza",
        "Málaga",
        "Murcia",
        "Palma",
        "Las Palmas de Gran Canaria",
        "Bilbao",
        "Alicante",
        "Córdoba",
        "Valladolid",
        "Vigo",
        "Gijón",
        "Hospitalet de Llobregat",
        "La Coruña",
        "Granada",
        "Vitoria-Gasteiz",
        "Elche",
        "Oviedo",
        "Santa Cruz de Tenerife",
        "Badalona",
        "Cartagena",
        "Terrassa",
        "Jerez de la Frontera",
        "Sabadell",
        "Móstoles",
        "Alcalá de Henares",
        "Pamplona",
        "Fuenlabrada",
        "Almería",
        "Leganés",
        "San Sebastián",
        "Burgos",
        "Santander",
        "Castellón de la Plana",
        "Albacete",
        "Getafe",
        "Salamanca",
        "Logroño",
        "Huelva",
        "Badajoz",
        "Lleida",
        "Tarragona",
        "León",
        "Cádiz",
        "Marbella",
        "Torrejón de Ardoz",
      ],
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
              <p class="cards__filter-option" id='inProgressFilter'>En Proceso</p>
              <p class="cards__filter-option" id='completedFilter'>Completado</p>
            </div>
            ${
              this.state.tasksSlice.tasks.length === 0
                ? `<p class="cards__empty-message">Nada que mostrar</p>`
                : ""
            }
            <ul class="cards__list" id="tasksList">
            </ul>
          </section>

           <section class="cards__widget">
            <h2 class="cards__title">Próximos eventos</h2>
            <ul class="cards__list" id="eventsList">
            </ul>
          </section>
        </div>`;

    this.state.tasksSlice.tasks.forEach((task) => {
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

    this.state.eventsSlice.events
      .sort((a, b) => b.date - a.date)
      .forEach((event) => {
        const listElement = document.createElement("li");
        listElement.classList.add("event-card__list-container");
        listElement.id = event.id;

        listElement.innerHTML = `<div class="event__weather-img">

      ${
        event.weatherData === null
          ? ""
          : `<p class="event__min">Min ${
              event.weatherData && event.weatherData.temp_min
            } °F</p>
                  <p class="event__max">Max ${
                    event.weatherData && event.weatherData.temp_max
                  } °F</p>`
      }
                </div>
                <div class="event__info-container">
                  <h3 class="event__title">${event.title}</h3>
                  <p class="event__date">${this.formatDate(event.date)}</p>
                  <p class="event__time">${event.time}</p>
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
<p class="dashboard__icon">✍🏼</p>
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

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this.state.tasksSlice.currentTask) {
        this.updateTask(e.target);
        htmlActions.showSimpleDialog("Task modificada con éxito");
      } else {
        this.createTask(e.target);
        htmlActions.showSimpleDialog("Task añadida con éxito");
      }
    });
  },

  renderEventForm() {
    this.elements.main.element.innerHTML = `<section id="section-4" class="dashboard__section">
        <div class="dashboard__top-navigator">
          <div class="dashboard__top-left">
            <p>Back Button</p>
            <div class="dashboard__top-left-page-title">
              <p>📆</p>
              <p>Nuevo evento</p>
            </div>
          </div>
        </div>

        <header class="new-task__header">
          <p class="dashboard__icon">📆</p>
        </header>

        <div class="dashboard__section-content">
          <form class="new-event__form" action="submit" id="addEventForm">
            <textarea name="title" rows="1" class="new-task__input-title" placeholder="Nuevo evento"></textarea>
            <div class="inputs-container">
              <label class="new-event__label" for="newEventDate">Fecha</label>
              <input name="date" class="new-event__input-date" id="newEventDate" type="date">
            </div>
            <div class="inputs-container">
              <label class="new-event__label" for="newEventTime">Hora</label>
              <input name="time" class="new-event__input-date" id="newEventTime" type="time">
            </div>
            <textarea name="details" rows="3" class="new-event__input-details" id="new-event-details"
              placeholder="Detalles relevantes"></textarea>
            <button class="new-event__submit-button">${
              this.state.eventsSlice.currentEvent
                ? "Modificar evento"
                : "Añadir evento"
            }</button>

          </form>
        </div>

      </section>`;

    const form = document.querySelector("#addEventForm");

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
        htmlActions.showSimpleDialog("Evento modificado con éxito");
      } else {
        this.createEvent(e.target);
        htmlActions.showSimpleDialog("Evento modificado con éxito");
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
  },

  renderLoading() {
    this.elements.main.element.innerHTML = `<section class="loading__section">
        <img src="https://upload.wikimedia.org/wikipedia/commons/a/ad/YouTube_loading_symbol_3_%28transparent%29.gif"
          alt="" srcset="">
      </section>`;
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

  async createEvent(form) {
    const newEvent = {
      id: crypto.randomUUID(),
      title: form.title.value,
      date: form.date.value,
      time: form.time.value,
      details: form.details.value,
      weatherData: await this.fetchWeather(form.date.value),
    };

    this.state.eventsSlice.events.push(newEvent);
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

    this.state.tasksSlice.currentTask = null;
    this.saveToLs();
    this.navigate("dashboard");
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
    this.state.eventsSlice.events = this.state.eventsSlice.events.map((event) =>
      event.id === updatedEvent.id ? updatedEvent : event
    );

    this.state.eventsSlice.currentEvent = null;

    this.saveToLs();
    this.navigate("dashboard");
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
      const eventDate = new Date(date);
      const timestamp = Math.floor(eventDate.getTime() / 1000);

      const newResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=40.4165&lon=-3.70256&appid=${this.state.weatherSlice.openWeatherApiKey}&units=metric&lang=es`
      );

      const { list } = await newResponse.json();

      const data = list.filter((data) => data.dt === timestamp);

      return data.length === 1 ? data[0].main : null;
    } catch (error) {
      htmlActions.showSimpleDialog(error.message);
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
