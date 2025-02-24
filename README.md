# The Daily News 📰

A news app built with React that brings together multiple news sources into a single place.

## Features

- A simple and good user interface and mobile responsive
- Auto save search filters in local storage and load them when the page is reloaded
- Adapter for every news source
- Real-time search with debounce for better performance and less api requests
- Filtering options:
  - Search query (in title, description, content or fields provided by the source)
  - Date range (if source supports it)
  - Source (at least 1 source is required)
  - Category (if source supports it)
  - Author (if source supports it)

## Before you start

Copy the `.env.example` file in the root directory and rename it to `.env`. then add your api keys for the sources you want to use.

#### Sources provided by the app

- [NewsAPI](https://newsapi.org/)
- [New York Times](https://developer.nytimes.com/)
- [Guardian](https://open-platform.theguardian.com/)

#### Then choose one of the following sections to run the app

1. Run with Docker

2. For Development

## Run with Docker

1. Install [Docker](https://docs.docker.com/get-docker/) based on your OS

2. Build the Docker image:

```bash
docker build -t the-daily-news:latest .
```

3. Run the container:

```bash
docker run -d -p 8080:8080 the-daily-news:latest
```

4. Open your browser and navigate to:

```
http://localhost:8080/
```

## For Development

1. Install dependencies

```bash
npm install
```

2. Start vite development server

```bash
npm run dev
```
