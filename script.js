// Page load with fade transition
async function loadPageWithTransition(url) {
  const content = document.getElementById("content");

  // 1. Fade out
  content.classList.add("fade-out");

  // 2. Wait for fade-out animation (matches CSS duration)
  await new Promise(resolve => setTimeout(resolve, 400));

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Couldn't load ${url}`);
    const html = await response.text();
    content.innerHTML = html;
  } catch (error) {
    content.innerHTML = `<p>${error.message}</p>`;
    console.error(error);
  }

  // 3. Fade in
  content.classList.remove("fade-out");
}

// Delegated navigation button handler
document.getElementById("content").addEventListener("click", (e) => {
  const pageButton = e.target.closest("button[data-page]");
  if (pageButton) {
    const page = pageButton.getAttribute("data-page");
    loadPageWithTransition(`${page}.html`);
  }
});

// Delegated back button handler
document.getElementById("content").addEventListener("click", (e) => {
  const backButton = e.target.closest(".back");
  if (backButton) {
    loadPageWithTransition("index.html");
  }
});
