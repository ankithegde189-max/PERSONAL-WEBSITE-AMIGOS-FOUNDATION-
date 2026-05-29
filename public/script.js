const apiStatus = document.querySelector("#api-status");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

async function checkBackend() {
  try {
    const response = await fetch("/api/health");
    if (!response.ok) throw new Error("Backend health check failed");
    apiStatus.textContent = "Backend online";
  } catch (_error) {
    apiStatus.textContent = "Backend unavailable";
  }
}

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  formStatus.textContent = "Sending...";

  const formData = new FormData(contactForm);
  const payload = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });
    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "Message could not be sent.");
    }

    formStatus.textContent = result.message;
    contactForm.reset();
  } catch (error) {
    formStatus.textContent = error.message;
  }
});

checkBackend();
