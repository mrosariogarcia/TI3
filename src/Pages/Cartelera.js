import React, { Component } from 'react';
import MovieGrid from '../Components/MovieGrid/MovieGrid';
import Loading from '../Components/Loading/Loading'; 

class Cartelera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carteleraMovies: [],
      isLoading: true, 
      error: null 
    };
  }

  componentDidMount() {
    const api = 'https://api.themoviedb.org/3/movie/now_playing?api_key=e6a0d8ba2d9778d0953077400f26f011&language=en-US&page=1';

    // fetch para obtener las películas en cartelera
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          this.setState({ 
            carteleraMovies: data.results,
            isLoading: false 
          });
        } else {
          this.setState({
            error: 'No se encuentran películas en cartelera',
            isLoading: false
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: 'Error al cargar las películas en cartelera',
          isLoading: false
        });
      });
  }

  render() {
    const { carteleraMovies, isLoading, error } = this.state;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <section>
        <h2>Películas en Cartelera</h2>
        {error ? (
          <p>{error}</p>
        ) : (
          <MovieGrid movies={carteleraMovies} />
        )}
      </section>
    );
  }
}

export default Cartelera;
