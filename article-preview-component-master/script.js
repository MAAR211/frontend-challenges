const shareButton = document.querySelector(".card__share-button");
const authorContainer = document.querySelector(".card__author");

shareButton.addEventListener("click", function () {
  authorContainer.classList.toggle("is-active");

  const isActive = authorContainer.classList.contains("is-active");

  // aria-expanded - true = panel is open, false = panel is closed
  shareButton.setAttribute("aria-expanded", isActive);
});

// Close share panel when clicking outside
document.addEventListener("click", function (event) {
  const isActive = authorContainer.classList.contains("is-active");

  if (!isActive) return; // Panel is closed, do nothing

  const isDesktop = window.matchMedia("(min-width: 48rem)").matches;

  if (isDesktop) {
    // Close when clicking outside the share panel
    const isClickInsidePanel = event.target.closest(".card__share-panel");
    const isClickOnButton = event.target.closest(".card__share-button");

    // If click is outside the panel and not on the button
    if (!isClickInsidePanel && !isClickOnButton) {
      closePanel();
    }
  } else {
    // Close when clicking outside the entire author container
    const isClickInsideAuthor = event.target.closest(".card__author");
    const isClickOnButton = event.target.closest(".card__share-button");

    // If click is outside author and not on the button
    if (!isClickInsideAuthor && !isClickOnButton) {
      closePanel();
    }
  }
});

// Close with Escape key
document.addEventListener("keydown", function (event) {
  // Check if the pressed key is Escape
  if (event.key === "Escape") {
    const isActive = authorContainer.classList.contains("is-active");

    // If panel is open, close it
    if (isActive) {
      closePanel();

      // Return focus to the share button for better accessibility
      shareButton.focus();
    }
  }
});

function closePanel() {
  authorContainer.classList.remove("is-active");
  shareButton.setAttribute("aria-expanded", "false");
}
