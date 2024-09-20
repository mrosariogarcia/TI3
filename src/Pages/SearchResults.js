import React, { Component } from 'react';
import MovieGrid from '../Components/MovieGrid/MovieGrid';
import Loading from '../Components/Loading/Loading'

export default class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchMovie: [],
      isLoading: true, 
      error: null 
    };
  }

  componentDidMount() {
    const query = this.props.location.state?.query || '';
    const api = `https://api.themoviedb.org/3/search/movie?api_key=e6a0d8ba2d9778d0953077400f26f011&language=en-US&query=${encodeURIComponent(query)}&page=1`;

    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          this.setState({
            searchMovie: data.results,
            isLoading: false 
          });
        } else {
          this.setState({
            searchMovie: [],
            isLoading: false
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        this.setState({
          error: 'Error al buscar películas',
          isLoading: false
        });
      });
  }

  render() {
    const { searchMovie, isLoading, error } = this.state;

    return (
      <>
        <section>
          <p className="results">Resultado de búsqueda: {this.props.location.state?.query}</p>

          {isLoading ? (
            <Loading /> 
          ) : error ? (
            <p>{error}</p> 
          ) : searchMovie.length > 0 ? (
            <MovieGrid movies={searchMovie} />
          ) : (
            <p className="results">No se encontraron resultados para tu búsqueda.</p>
          )}
        </section>
      </>
    );
  }
}
