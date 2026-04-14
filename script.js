const DATA_URL = "https://script.google.com/macros/s/AKfycbwQai3AEldoeZlXj6PNjqWauaJn2vShdPDMcR3DeDz1DyEDh_tOJ7o152QHrvxF4oA4rw/exec";

const app = document.getElementById("app");

async function loadData() {
  try {
    const res = await fetch(DATA_URL);
    const events = await res.json();

    render(events);

  } catch (err) {
    console.error("Error loading data:", err);
  }
}

function render(events) {
  app.innerHTML = "";

  // sort by date
  const sorted = [...events].sort((a, b) =>
    new Date(a.date) - new Date(b.date)
  );

  // group by date
  const grouped = {};

  sorted.forEach(ev => {
    const date = ev.date || "No Date";
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(ev);
  });

  // render
  Object.keys(grouped).forEach(date => {
    const dateEl = document.createElement("div");
    dateEl.className = "date";
    dateEl.textContent = date;
    app.appendChild(dateEl);

    grouped[date].forEach(ev => {
      const el = document.createElement("div");
      el.className = "event";

      el.innerHTML = `
        <span class="title">${ev.title || ""}</span>
        <span class="venue">${ev.venue || ""}</span>
        <span class="time">${ev.time || ""}</span>
        <span class="price">${ev.price || ""}</span>
      `;

      app.appendChild(el);
    });
  });
}

loadData();
