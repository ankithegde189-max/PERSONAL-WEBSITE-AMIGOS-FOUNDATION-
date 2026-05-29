const express = require("express");
const helmet = require("helmet");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(
  helmet({
    contentSecurityPolicy: false
  })
);
app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));

const profile = {
  name: "Ankit A Hegde",
  role: "Information Science student",
  focus: ["Web Development", "AI Tools", "Problem Solving"],
  education: "B.Tech in Information Science, Presidency University, Bangalore",
  availability: "Open to internships, web projects, and learning opportunities"
};

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, service: "saoarte-profile", timestamp: new Date().toISOString() });
});

app.get("/api/profile", (_req, res) => {
  res.json(profile);
});

app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: "Name, email, and message are required." });
  }

  const emailLooksValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailLooksValid) {
    return res.status(400).json({ ok: false, error: "Please enter a valid email address." });
  }

  console.log("New contact message", {
    name: String(name).slice(0, 80),
    email: String(email).slice(0, 120),
    message: String(message).slice(0, 1000),
    receivedAt: new Date().toISOString()
  });

  res.status(202).json({
    ok: true,
    message: "Thanks. Your message was received successfully."
  });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, () => {
  console.log(`Saoarte profile website running on port ${port}`);
});
