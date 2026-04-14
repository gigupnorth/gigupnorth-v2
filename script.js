const DATA_URL = "https://script.google.com/macros/s/AKfycbwQai3AEldoeZlXj6PNjqWauaJn2vShdPDMcR3DeDz1DyEDh_tOJ7o152QHrvxF4oA4rw/exec";

const app = document.getElementById("app");

async function loadData() {
  const res = await fetch(DATA_URL);
  const events = await res.json();
  render(events);
}

function render(events) {
  app.innerHTML = "";

  const sorted = [...events].sort((a, b) =>
    new Date(a.date) - new Date(b.date)
  );

  const grouped = {};

  sorted.forEach(ev => {
    const date = ev.date || "No Date";
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(ev);
  });

  Object.keys(grouped).forEach(date => {
    const dateEl = document.createElement("div");
    dateEl.textContent = date;
    dateEl.style.fontWeight = "bold";
    dateEl.style.marginTop = "20px";
    app.appendChild(dateEl);

    grouped[date].forEach(ev => {
      const row = document.createElement("div");
      row.textContent = `${ev.title || ""} - ${ev.venue || ""} - ${ev.time || ""}`;
      app.appendChild(row);
    });
  });
}

loadData();
