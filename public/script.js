const apiStatus = document.querySelector("#api-status");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");
const profileName = document.querySelector("#profile-name");
const profileRole = document.querySelector("#profile-role");
const profileAvailability = document.querySelector("#profile-availability");
const profileRolePanel = document.querySelector("#profile-role-panel");
const profileEducation = document.querySelector("#profile-education");
const profileAvailabilityPanel = document.querySelector("#profile-availability-panel");

async function loadProfile() {
  try {
    const response = await fetch("/api/profile");
    if (!response.ok) throw new Error("Profile API request failed");

    const profile = await response.json();

    if (profileName) profileName.textContent = profile.name || "Ankit A Hegde";
    if (profileRole) profileRole.textContent = profile.role || "Information Science student";
    if (profileAvailability) profileAvailability.textContent = profile.availability || "Open to internships and web projects";
    if (profileRolePanel) profileRolePanel.textContent = profile.role || "Information Science student";
    if (profileEducation) profileEducation.textContent = profile.education || "B.Tech in Information Science, Presidency University, Bangalore";
    if (profileAvailabilityPanel) profileAvailabilityPanel.textContent = profile.availability || "Open to internships and web projects";
  } catch (_error) {
    if (profileRole) profileRole.textContent = "Profile data is temporarily unavailable.";
    if (profileAvailability) profileAvailability.textContent = "The live API could not be reached.";
  }
}

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
loadProfile();
