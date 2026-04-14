const DATA_URL = "https://script.google.com/macros/s/AKfycbwQai3AEldoeZlXj6PNjqWauaJn2vShdPDMcR3DeDz1DyEDh_tOJ7o152QHrvxF4oA4rw/exec";



const AREA_ORDER = [
  { name: "Darlington", code: "DL" },
  { name: "Durham", code: "DH" },
  { name: "Middlesbrough", code: "TS" },
  { name: "Newcastle", code: "NE" },
  { name: "Sunderland", code: "SR" }
];

const app = document.getElementById("app");

async function loadData() {
  const res = await fetch(DATA_URL);
  const events = await res.json();
  render(events);
}

function render(events) {
  app.innerHTML = "";

  // 1. sort by date
  const sorted = [...events].sort((a, b) =>
    new Date(a.date) - new Date(b.date)
  );

  // 2. group by date
  const groupedByDate = {};

  sorted.forEach(ev => {
    const date = ev.date || "No Date";
    if (!groupedByDate[date]) groupedByDate[date] = [];
    groupedByDate[date].push(ev);
  });

  // 3. render
  Object.keys(groupedByDate).forEach(date => {
    const dateEl = document.createElement("div");
    dateEl.style.fontWeight = "bold";
    dateEl.style.marginTop = "20px";
    dateEl.textContent = date;
    app.appendChild(dateEl);

    const dayEvents = groupedByDate[date];

    // 4. loop through fixed area order
    AREA_ORDER.forEach(area => {
      const filtered = dayEvents.filter(
        ev => (ev.area || "").toLowerCase() === area.name.toLowerCase()
      );

      if (filtered.length === 0) return;

      // header
      const header = document.createElement("div");
      header.style.marginTop = "10px";
      header.style.fontWeight = "bold";
      header.textContent = `${area.name} and ${area.code}`;
      app.appendChild(header);

      // events
      filtered.forEach(ev => {
        const row = document.createElement("div");
        row.textContent = `${ev.venue || ""}: ${ev.title || ""}`;
        app.appendChild(row);
      });
    });
  });
}

loadData();
