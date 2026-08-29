const STORAGE_KEY = "september.v1";

const LABELS = {
  status: {
    stored: "przechowywana",
    available: "aktualnie dostępna",
    done: "zakończona",
    paused: "odłożona / nieważna",
  },
  mode: {
    "": "brak",
    deadline: "TERMIN",
    block: "BLOK",
    iteration: "ITERACJA",
    exploration: "EKSPLORACJA",
  },
  guidance: {
    deadline: "Czy termin jest już zabezpieczony w kalendarzu?",
    block: "To wygląda jak rzecz na jeden blok. Masz teraz przestrzeń?",
    iteration: "Nie musisz kończyć całości. Jaki fragment jest sensowny teraz?",
    exploration: "Celem może być lepsze rozumienie, nie rozwiązanie od razu.",
    "": "Możesz zostawić bez klasyfikacji i wrócić później.",
  },
};

const state = loadState();

const sections = {
  capture: document.querySelector("#capture"),
  checkin: document.querySelector("#checkin"),
  act: document.querySelector("#act"),
  store: document.querySelector("#store"),
};

const addForm = document.querySelector("#add-form");
const feedback = document.querySelector("#capture-feedback");
const suggestions = document.querySelector("#suggestions");
const suggestionsEmpty = document.querySelector("#suggestions-empty");
const storeList = document.querySelector("#store-list");
const storeEmpty = document.querySelector("#store-empty");
const itemTemplate = document.querySelector("#item-template");
const searchInput = document.querySelector("#search");

wireIntents();
wireAdd();
wireSearch();
renderAct();
renderStore();
registerServiceWorker();

function loadState() {
  const fallback = { items: [], checkin: "can-now" };
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!parsed || !Array.isArray(parsed.items)) return fallback;
    return {
      items: parsed.items,
      checkin: parsed.checkin || "can-now",
    };
  } catch {
    return fallback;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function wireIntents() {
  document.querySelectorAll("[data-view]").forEach((button) => {
    button.addEventListener("click", () => showView(button.dataset.view));
  });

  document.querySelectorAll("[data-checkin]").forEach((button) => {
    button.addEventListener("click", () => {
      state.checkin = button.dataset.checkin;
      saveState();
      showView("act");
      renderAct();
    });
  });
}

function wireAdd() {
  addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(addForm);
    const item = {
      id: crypto.randomUUID(),
      title: String(data.get("title") || "").trim(),
      mode: String(data.get("mode") || ""),
      deadline: String(data.get("deadline") || ""),
      notes: String(data.get("notes") || "").trim(),
      status: "stored",
      calendarSecured: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    if (!item.title) return;
    if (item.mode !== "deadline") item.deadline = "";

    state.items.unshift(item);
    saveState();
    addForm.reset();
    feedback.classList.remove("hidden");
    setTimeout(() => feedback.classList.add("hidden"), 1200);
    renderAct();
    renderStore();
  });
}

function wireSearch() {
  searchInput.addEventListener("input", renderStore);
}

function showView(viewName) {
  Object.entries(sections).forEach(([key, node]) => {
    node.classList.toggle("hidden", key !== viewName);
  });
  if (viewName === "act") renderAct();
  if (viewName === "store") renderStore();
}

function renderAct() {
  const items = pickSuggestions();
  suggestions.innerHTML = "";
  suggestionsEmpty.classList.toggle("hidden", items.length > 0);

  items.forEach((item) => {
    const row = document.createElement("li");
    row.className = "item";
    row.innerHTML = `
      <p><strong>${escapeHtml(item.title)}</strong></p>
      <p class="muted">${LABELS.mode[item.mode || ""]}</p>
      <p class="muted">${escapeHtml(LABELS.guidance[item.mode || ""])}</p>
      <div class="actions">
        <button type="button" data-mark="available">Wchodzę w to</button>
        <button type="button" data-mark="stored" class="ghost">Jednak nie teraz</button>
        <button type="button" data-open-store class="ghost">Otwórz w magazynie</button>
      </div>
    `;

    row.querySelector('[data-mark="available"]').addEventListener("click", () => {
      updateItem(item.id, { status: "available" });
    });
    row.querySelector('[data-mark="stored"]').addEventListener("click", () => {
      updateItem(item.id, { status: "stored" });
    });
    row.querySelector("[data-open-store]").addEventListener("click", () => {
      showView("store");
    });
    suggestions.appendChild(row);
  });
}

function pickSuggestions() {
  const candidates = state.items.filter((item) => item.status !== "done" && item.status !== "paused");
  const sorted = [...candidates].sort((a, b) => b.updatedAt - a.updatedAt);

  if (state.checkin === "wrong-context") {
    return sorted.filter((item) => item.mode === "iteration" || item.mode === "exploration").slice(0, 4);
  }
  if (state.checkin === "low-resources") {
    return sorted.filter((item) => item.mode === "iteration" || item.mode === "").slice(0, 4);
  }
  if (state.checkin === "blocked") {
    return sorted.filter((item) => item.mode === "exploration" || item.mode === "").slice(0, 4);
  }
  return sorted.slice(0, 4);
}

function renderStore() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = state.items.filter((item) => {
    if (!query) return true;
    return item.title.toLowerCase().includes(query) || item.notes.toLowerCase().includes(query);
  });

  storeList.innerHTML = "";
  storeEmpty.classList.toggle("hidden", filtered.length > 0);

  filtered.forEach((item) => {
    const fragment = itemTemplate.content.cloneNode(true);
    const root = fragment.querySelector(".item");
    const title = root.querySelector(".item-title");
    const status = root.querySelector(".item-status");
    const mode = root.querySelector(".item-mode");
    const fieldStatus = root.querySelector(".field-status");
    const fieldMode = root.querySelector(".field-mode");
    const fieldDeadline = root.querySelector(".field-deadline");
    const fieldNotes = root.querySelector(".field-notes");
    const fieldCalendar = root.querySelector(".field-calendar");
    const calendarField = root.querySelector(".calendar-field");
    const guidance = root.querySelector(".item-guidance");

    title.textContent = item.title;
    status.textContent = LABELS.status[item.status];
    mode.textContent = LABELS.mode[item.mode || ""];
    fieldStatus.value = item.status;
    fieldMode.value = item.mode || "";
    fieldDeadline.value = item.deadline || "";
    fieldNotes.value = item.notes || "";
    fieldCalendar.checked = Boolean(item.calendarSecured);
    calendarField.classList.toggle("hidden", (item.mode || "") !== "deadline");
    guidance.textContent = LABELS.guidance[item.mode || ""];

    fieldMode.addEventListener("change", () => {
      calendarField.classList.toggle("hidden", fieldMode.value !== "deadline");
      if (fieldMode.value !== "deadline") {
        fieldDeadline.value = "";
        fieldCalendar.checked = false;
      }
      guidance.textContent = LABELS.guidance[fieldMode.value || ""];
    });

    root.querySelector(".save-item").addEventListener("click", () => {
      updateItem(item.id, {
        status: fieldStatus.value,
        mode: fieldMode.value,
        deadline: fieldMode.value === "deadline" ? fieldDeadline.value : "",
        notes: fieldNotes.value.trim(),
        calendarSecured: fieldMode.value === "deadline" ? fieldCalendar.checked : false,
      });
    });

    root.querySelector(".delete-item").addEventListener("click", () => {
      state.items = state.items.filter((value) => value.id !== item.id);
      saveState();
      renderAct();
      renderStore();
    });

    storeList.appendChild(fragment);
  });
}

function updateItem(id, patch) {
  const index = state.items.findIndex((item) => item.id === id);
  if (index < 0) return;
  state.items[index] = { ...state.items[index], ...patch, updatedAt: Date.now() };
  saveState();
  renderAct();
  renderStore();
}

function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
