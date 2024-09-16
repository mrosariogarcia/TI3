import React, { Component } from 'react';
import MovieGrid from '../Components/MovieGrid/MovieGrid';

class Cartelera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carteleraMovies: []
    };
  }

  componentDidMount() {
    const api = 'https://api.themoviedb.org/3/movie/now_playing?api_key=e6a0d8ba2d9778d0953077400f26f011&language=en-US&page=1';
    
    // fetch para obtener las películas en cartelera
    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          this.setState({ carteleraMovies: data.results });
        } else {
          console.error('No se encuentran películas en cartelera');
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { carteleraMovies } = this.state;

    return (
      <>
        <section>
          <h2>Películas en Cartelera</h2>
          <MovieGrid movies={carteleraMovies} />
        </section>
      </>
    );
  }
}

export default Cartelera;
