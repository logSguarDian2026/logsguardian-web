document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("nav-open");
      const open = document.body.classList.contains("nav-open");
      toggle.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () => document.body.classList.remove("nav-open"));
  });

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy");
      try {
        await navigator.clipboard.writeText(text);
        const original = btn.textContent;
        btn.textContent = "copied";
        setTimeout(() => (btn.textContent = original), 1400);
      } catch (e) {
        /* clipboard unavailable, ignore */
      }
    });
  });

  // bar fills: width driven by data-pct so the same markup works for any metric
  document.querySelectorAll(".bar-fill[data-pct]").forEach((el) => {
    const pct = parseFloat(el.getAttribute("data-pct"));
    el.style.width = Math.max(0, Math.min(100, pct)) + "%";
  });

  // grouped chart bar heights driven by data-pct (0-100, relative to group max)
  document.querySelectorAll(".gbar[data-pct]").forEach((el) => {
    const pct = parseFloat(el.getAttribute("data-pct"));
    el.style.height = Math.max(2, Math.min(100, pct)) + "%";
  });
});
