const DATA_URL = "PASTE_YOUR_GOOGLE_SCRIPT_URL_HERE";

let events = [];
let view = "cards";

const app = document.getElementById("app");
const toggle = document.getElementById("viewToggle");

toggle.addEventListener("click", () => {
  view = view === "cards" ? "text" : "cards";
  render();
  updateButton();
});

function updateButton() {
  toggle.textContent =
    view === "cards" ? "Switch to Text View" : "Switch to Cards";
}

async function load() {
  const res = await fetch(DATA_URL);
  events = await res.json();
  render();
}

function render() {
  app.innerHTML = "";

  const sorted = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const grouped = {};

  sorted.forEach(ev => {
    grouped[ev.date] = grouped[ev.date] || [];
    grouped[ev.date].push(ev);
  });

  Object.keys(grouped).forEach(date => {
    const dateEl = document.createElement("div");
    dateEl.className = "date";
    dateEl.textContent = date;
    app.appendChild(dateEl);

    grouped[date].forEach(ev => {
      if (view === "cards") {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h3>${ev.title || ""}</h3>
          <p>${ev.venue || ""}</p>
          <p>${ev.time || ""}</p>
          <p>${ev.price || ""}</p>
        `;
        app.appendChild(card);
      } else {
        const row = document.createElement("div");
        row.className = "row";
        row.innerHTML = `
          <span>${ev.title || ""}</span>
          <span>${ev.venue || ""}</span>
          <span>${ev.time || ""}</span>
          <span>${ev.price || ""}</span>
        `;
        app.appendChild(row);
      }
    });
  });
}

load();
updateButton();
