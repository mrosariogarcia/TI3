import React, { Component } from 'react';
import MovieGrid from '../Components/MovieGrid/MovieGrid';

class Favoritos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movies: [],
      isLoading: true
    };
  }

  componentDidMount() {
    const storage = localStorage.getItem('favoritos');
    const parsedArray = JSON.parse(storage) || []; // Evita errores si localStorage está vacío

    Promise.all(
      parsedArray.map(id => 
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=e6a0d8ba2d9778d0953077400f26f011&language=en-US&page=1`)
          .then(response => response.json())
          .then(movie => movie) // Solo retornamos la película aquí
      )
    ).then(movies => {
      this.setState({
        movies,
        isLoading: false
      });
    });
  }

  render() {
    const { movies, isLoading } = this.state;
    return (
      <div>
        {isLoading ? <p>Loading ...</p> : <MovieGrid movies={movies} />}
      </div>
    );
  }
}

export default Favoritos;

