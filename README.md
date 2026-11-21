# Doomsday Ready — Frontend

[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![Lucide](https://img.shields.io/badge/Lucide--React-0.475-red.svg)](https://lucide.dev/)

**Doomsday Ready** is a cinematic, Marvel-inspired full-stack web application built for Marvel Cinematic Universe fans preparing for *Avengers: Doomsday* (2026).

---

## Features

- **Operational Dashboard**: Live statistics calculated dynamically from API data (Total Movies, Watched Movies, Watch Time Remaining, Cinema Venues) with a dedicated *Avengers: Doomsday* preparation countdown section.
- **MCU Movie Catalog**: Complete catalog with real-time search, status filtering (all/watched/unwatched), inline watched toggles, and modal form for adding/editing movies and managing prerequisite dependencies.
- **Topological Rewatch Plan**: Destination film selector that calculates a verified DAG chronological rewatch order using custom DFS graph traversal. Features visual progress percentage, runtime remaining calculations, and interactive completion updates.
- **Cinema Seat Bundle Calculator**: Optimizes ticket purchases for opening-night watch parties using custom unbounded coin-change dynamic programming to achieve the absolute minimum bundle count with zero wasted seats.

---

## Tech Stack

- **Framework**: Next.js 15 (App Router, Server & Client Components)
- **Language**: TypeScript 5.7+
- **Styling**: Tailwind CSS 3.4 (Custom Marvel color palette and cinematic glows)
- **Icons**: Lucide React
- **API Client**: Axios with centralized response interceptors and error handling

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Set the backend API endpoint:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```
