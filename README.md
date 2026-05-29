# Saoarte Profile Website

Portfolio website for Ankit A Hegde with a polished frontend and a Node/Express backend.

## Project Structure

- `server.js` - Express backend, static hosting, profile API, contact API, health check
- `public/index.html` - frontend markup
- `public/styles.css` - responsive visual design
- `public/script.js` - frontend API integration
- `render.yaml` - Render deployment configuration

## Run Locally

```bash
npm install
npm start
```

Open `http://localhost:3000`.

## Backend Endpoints

- `GET /api/health` - deployment health check
- `GET /api/profile` - profile data
- `POST /api/contact` - contact form submission

## Deploy Live

Recommended path:

1. Push this folder to a GitHub repository.
2. Create a Render account at `render.com`.
3. Select New Web Service and connect the GitHub repo.
4. Render will detect `render.yaml`.
5. Deploy. The site will get a public `https://...onrender.com` URL.

For a custom domain, add the domain in Render and update your domain DNS records as Render instructs.
