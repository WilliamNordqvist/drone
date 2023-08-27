# Drone Frontend (drone-fe)

## Overview

This is a frontend application built for managing drones in a scalable and user-friendly manner. It is developed using Next.js, a popular React framework, and TypeScript for strong typing support. The application provides functionalities like viewing drone statuses, controlling drone movements, and receiving real-time updates. It also employs Tailwind CSS for modern UI/UX design. The code is organized to make it easy to add new features or modify existing ones.

---

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the App](#running-the-app)

---

## Prerequisites

- Node.js (v14+)
- npm or yarn
- Git

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/drone-fe.git
   ```

2. Navigate to the project directory:

   ```bash
   cd drone-fe
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```
   OR
   ```bash
   yarn install
   ```

---

## Running the App

1. To start the development server:

   ```bash
   npm run dev
   ```

   OR

   ```bash
   yarn dev
   ```

2. Open your web browser and navigate to `http://localhost:3000`.

---

## Used Packages

- Next.js: Framework for building the frontend.
- TypeScript: For strong typing support.
- Tailwind CSS: For styling the application.
- ESLint: For code linting.
- PostCSS: For processing CSS.
- react-map-gl: For integrating map functionalities.
- axios: For making HTTP requests.

## Environment Variables

To run this project, you'll need to add the following environment variables to your `.env` file:

```bash
NEXT_PUBLIC_MAP_BOX_KEY_TOKEN=your_mapbox_token_here
```
