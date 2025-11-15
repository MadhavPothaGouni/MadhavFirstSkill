Streaming Dashboard

Streaming Dashboard is a movie browsing web application built with Next.js, React, and Tailwind CSS.
It uses The Movie Database API (TMDB) to display popular movies, trending movies, and detailed movie information.

The design follows a clean, modern, streaming service layout similar to Netflix.
This project includes a hero banner, interactive movie rows, movie cards with hover animations, and a movie details page.

Features
Homepage

Hero banner that displays a featured movie.

Movie rows for multiple categories.

Scrollable horizontal lists.

Movie cards with hover effects.

Responsive design for all screen sizes.

Secure API integration using server-side routes.

Movie Details Page

Dynamic movie details using the movie ID.

Poster, overview, release date.

Back navigation.

Loading and error states.

Architecture

Next.js App Router.

Server components for home page.

Client component for movie details page.

API route for secure TMDB requests.

Clean component structure.

Tech Stack

Next.js 14

React

Tailwind CSS

TypeScript

TMDB API

Next Image optimization

Folder Structure
app/
  components/
    Header.tsx
    HeroBanner.tsx
    MovieRow.tsx
    MovieCard.tsx
  movie/[id]/
    page.tsx
  api/movie/[id]/
    route.ts
  page.tsx

lib/
  tmdb.ts

types/
  movie.ts

public/

How to Run the Project

Clone the repository

git clone https://github.com/your-username/your-repo.git


Install dependencies

npm install


Create an .env.local file in the project root and add:

TMDB_API_KEY=2c6048eb582f9c006bed50fc3ddfae51


Start the development server

npm run dev


Open the application

http://localhost:3000