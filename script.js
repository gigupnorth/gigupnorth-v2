const DATA_URL = "https://script.google.com/macros/s/AKfycbwQai3AEldoeZlXj6PNjqWauaJn2vShdPDMcR3DeDz1DyEDh_tOJ7o152QHrvxF4oA4rw/exec";

const AREA_ORDER = [
  { name: "Darlington", code: "DL" },
  { name: "Durham", code: "DH" },
  { name: "Middlesbrough", code: "CS" },
  { name: "Newcastle", code: "NE" },
  { name: "Sunderland", code: "SR" }
];

const COLOUR_MAP = {
  blue: "Darlington",
  green: "Durham",
  orange: "Middlesbrough",
  black: "Newcastle",
  red: "Sunderland"
};

function clean(str) {
  return (str || "").toString().trim().toLowerCase();
}

async function loadData() {
  try {
    const res = await fetch(DATA_URL);
    const data = await res.json();
    render(data);
  } catch (err) {
    console.error("Failed to load data:", err);
  }
}

function render(events) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const sorted = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const byDate = {};

  sorted.forEach(ev => {
    const d = ev.date || "No Date";
    if (!byDate[d]) byDate[d] = [];
    byDate[d].push(ev);
  });

  Object.keys(byDate).forEach(date => {
    const dateEl = document.createElement("div");
    dateEl.textContent = date;
    dateEl.style.fontWeight = "bold";
    dateEl.style.marginTop = "40px";
    app.appendChild(dateEl);

    const dayEvents = byDate[date];

    AREA_ORDER.forEach(area => {

      const matches = dayEvents.filter(ev => {
        const colour = clean(ev.j || ev.colour);
        return COLOUR_MAP[colour] === area.name;
      });

      if (matches.length === 0) return;

      const header = document.createElement("div");
      header.textContent = `${area.name} ${area.code}`;
      header.style.marginTop = "10px";
      header.style.fontWeight = "bold";
      app.appendChild(header);

      matches.forEach(ev => {
        const row = document.createElement("div");

        const venue = ev.venue || ev.b || "";
        const band = ev.artist || ev.title || ev.a || "";

        row.textContent = `${venue}: ${band}`;

        app.appendChild(row);
      });
    });
  });
}
function loadData() {
  fetch(DATA_URL)
    .then(res => res.json())
    .then(data => render(data))
    .catch(err => console.error(err));
}

// START APP
loadData();

