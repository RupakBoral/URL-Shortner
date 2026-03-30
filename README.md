# clipURL ✂️

> A fast, minimal URL shortener built with Node.js, TypeScript, Redis, and Docker.

---

## What is clipURL?

clipURL takes a long URL and returns a short, shareable link that redirects to the original. Links auto-expire based on a TTL you define. Built as a hands-on exploration of Redis fundamentals — key-value storage, TTL, bidirectional mapping, and rate limiting.

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Runtime | Node.js 18 |
| Language | TypeScript |
| Framework | Express |
| Database | Redis |
| Process Manager | PM2 |
| Containerization | Docker + Docker Compose |
| Reverse Proxy | Nginx |

---

## Features

- 🔗 Shorten any valid URL
- ⏳ Custom expiry (TTL) per link
- 🐬 Duplicate URL detection — same URL returns same short code
- 🚀 Fast redirects via Redis lookup
- 🐳 Fully containerized with Docker Compose
- ♻️ PM2 process management inside container
- 🔁 Reverse Proxy and IP based rate limiting
---

## API

### Shorten a URL

```http
POST /api/v1/shortner
Content-Type: application/json
```

**Request Body:**
```json
{
  "url": "https://www.example.com/some/very/long/url",
  "expires_in": 3600,
  "size": 4
}
```

| Field | Type | Description |
|-------|------|-------------|
| `url` | string | Valid URL to shorten |
| `expires_in` | number | TTL in seconds (max 86400 = 24hrs) |
| `size` | number | size of the code (max 8) |

**Response:**
```json
{
  "success": true,
  "short_url": "http://localhost:80/clip/a1b2c3d4"
}
```

---

### Redirect

```http
GET api/v1/tiny/:id
```

Redirects (`302`) to the original URL. Returns `404` if the link has expired or doesn't exist.

---

## Environment Variables

```env
PORT=8080
BASE_URL=http://localhost:80

REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=yourpassword
REDIS_DB=0

URL_TTL=86400
```

> For local development without Docker, set `REDIS_HOST=localhost`

---

## Running Locally

### Prerequisites
- Docker
- Docker Compose

### Start

```bash
# clone the repo
git clone https://github.com/RupakBoral/clipURL.git
cd clipurl
cd backend

# copy env
cp .env.example .env

# start all services
docker-compose up -d --build
```

### Stop

```bash
docker-compose down
```