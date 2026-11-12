const navigationToggle = document.querySelector(".site-nav-toggle");
const siteNavigation = document.querySelector("#site-navigation");

if (
  navigationToggle instanceof HTMLButtonElement &&
  siteNavigation instanceof HTMLElement
) {
  document.documentElement.classList.add("has-mobile-nav");

  const setNavigationOpen = (isOpen) => {
    navigationToggle.setAttribute("aria-expanded", String(isOpen));
    navigationToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation",
    );
    siteNavigation.classList.toggle("is-open", isOpen);
  };

  navigationToggle.addEventListener("click", () => {
    setNavigationOpen(navigationToggle.getAttribute("aria-expanded") !== "true");
  });

  siteNavigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      setNavigationOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigationToggle.getAttribute("aria-expanded") === "true") {
      setNavigationOpen(false);
      navigationToggle.focus();
    }
  });
}

const consultationForm = document.querySelector("#consultation-form");

if (consultationForm instanceof HTMLFormElement) {
  const formStatus = document.querySelector("#consultation-form-status");

  if (!(formStatus instanceof HTMLElement)) {
    console.error("Consultation form status region is missing.");
  } else {
    consultationForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!consultationForm.reportValidity()) {
        return;
      }

      const submitButton = consultationForm.querySelector('button[type="submit"]');
      if (!(submitButton instanceof HTMLButtonElement)) {
        console.error("Consultation form submit button is missing.");
        return;
      }

      submitButton.disabled = true;
      formStatus.textContent = "";

      try {
        const response = await fetch("https://formspree.io/f/myewybwj", {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: new FormData(consultationForm),
        });

        if (!response.ok) {
          formStatus.textContent =
            "We could not submit your request. Please try again.";
          return;
        }

        consultationForm.reset();
        formStatus.textContent =
          "Thank you. Your consultation request has been submitted.";
      } catch (error) {
        console.error("Consultation form submission failed.", error);
        formStatus.textContent =
          "We could not submit your request. Please try again.";
      } finally {
        submitButton.disabled = false;
      }
    });
  }
}