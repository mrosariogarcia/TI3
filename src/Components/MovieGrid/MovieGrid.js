import React from 'react';
import Movie from "../Movie/Movie"
import "./MovieGrid.css"

function MovieGrid({ movies }) {
  return (
    <>
      <section>
        <div className="movie-grid">
          {movies.map((movie, index) => (
            <Movie movie={movie} key={index} />
          ))}
        </div>
      </section>
    </>
  );
}

export default MovieGrid;
