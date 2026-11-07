// Small, accessible client-side interactions used throughout the static site.
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".primary-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      nav.classList.toggle("open", !expanded);
    });
  }

  const search = document.getElementById("recording-search");
  const filterButtons = [...document.querySelectorAll(".filter-button")];
  const cards = [...document.querySelectorAll(".recording-card")];
  const count = document.getElementById("results-count");
  const noResults = document.getElementById("no-results");
  let activeFilter = "all";

  function updateRecordings() {
    if (!cards.length) return;
    const term = (search?.value || "").trim().toLowerCase();
    let visible = 0;
    cards.forEach(card => {
      const eraMatch = activeFilter === "all" || card.dataset.era === activeFilter;
      const textMatch = !term || (card.dataset.search + " " + card.textContent).toLowerCase().includes(term);
      const show = eraMatch && textMatch;
      card.hidden = !show;
      if (show) visible++;
    });
    if (count) count.textContent = `Showing ${visible} of ${cards.length} recordings`;
    if (noResults) noResults.hidden = visible !== 0;
  }

  search?.addEventListener("input", updateRecordings);
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      activeFilter = button.dataset.filter;
      filterButtons.forEach(item => {
        const selected = item === button;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });
      updateRecordings();
    });
  });
  updateRecordings();
});
