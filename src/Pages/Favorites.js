import React, { Component } from 'react';
import MovieGrid from '../Components/MovieGrid/MovieGrid';
import Loading from '../Components/Loading/Loading'

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
    const parsedArray = JSON.parse(storage) || []; //si localStorage está vacío

    Promise.all(
      parsedArray.map(id =>
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=415551d4ecd00d6cb4f0147be963f2ed&language=en-US&page=1`)
          .then(response => response.json())
          .then(movie => movie)
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
    if (isLoading) {
      return <Loading />;
    }

    if (movies.length === 0) {
      return (
        <div className='results-div'>
                <p className="results2">No tienes peliculas en favoritos</p>
        </div>
      );
    }

    return <MovieGrid movies={movies} />;
  }
}

export default Favoritos;

