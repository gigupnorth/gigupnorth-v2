const DATA_URL = "https://script.google.com/macros/s/AKfycbwQai3AEldoeZlXj6PNjqWauaJn2vShdPDMcR3DeDz1DyEDh_tOJ7o152QHrvxF4oA4rw/exec";



const AREA_ORDER = [
  { name: "Darlington", code: "DL" },
  { name: "Durham", code: "DH" },
  { name: "Middlesbrough", code: "TS" },
  { name: "Newcastle", code: "NE" },
  { name: "Sunderland", code: "SR" }
];

function clean(str) {
  return (str || "").toString().trim().toLowerCase();
}

function render(events) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  // sort by date
  const sorted = [...events].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // group by date
  const byDate = {};

  sorted.forEach(ev => {
    const d = ev.date || "No Date";
    if (!byDate[d]) byDate[d] = [];
    byDate[d].push(ev);
  });

  // render each date
  Object.keys(byDate).forEach(date => {
    const dateEl = document.createElement("div");
    dateEl.textContent = date;
    dateEl.style.fontWeight = "bold";
    dateEl.style.marginTop = "20px";
    app.appendChild(dateEl);

    const dayEvents = byDate[date];

    // loop fixed area order
    AREA_ORDER.forEach(area => {

      const matches = dayEvents.filter(ev =>
        clean(ev.area) === clean(area.name)
      );

      if (matches.length === 0) return;

      // AREA HEADER
      const header = document.createElement("div");
      header.textContent = `${area.name} ${area.code}`;
      header.style.marginTop = "10px";
      header.style.fontWeight = "bold";
      app.appendChild(header);

      // EVENTS
      matches.forEach(ev => {
        const row = document.createElement("div");

        const venue = ev.venue || "";
        const band = ev.title || "";

        row.textContent = `${venue} — ${band}`;

        app.appendChild(row);
      });
    });
  });
}
loadData();
