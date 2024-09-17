import React, { Component } from 'react';
import MovieGrid from '../Components/MovieGrid/MovieGrid';
import { SearchForm } from '../Components/SearchForm/SearchForm';

import { Link } from 'react-router-dom'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularMovies: [],
      nowPlayingMovies: [],
    };
  }

  componentDidMount() {
    const apiPopular = 'https://api.themoviedb.org/3/movie/popular?api_key=e6a0d8ba2d9778d0953077400f26f011&language=en-US&page=1';
    const apiNowPlaying = 'https://api.themoviedb.org/3/movie/now_playing?api_key=e6a0d8ba2d9778d0953077400f26f011&language=en-US&page=1';

    // Fetch para películas populares
    fetch(apiPopular)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          this.setState({ popularMovies: data.results });
        } else {
          console.error('No se encuentran películas populares');
        }
      })
      .catch((error) => console.log(error));

    // Fetch para películas en cartelera
    fetch(apiNowPlaying)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          this.setState({ nowPlayingMovies: data.results });
        } else {
          console.error('No se encuentran películas en cartelera');
        }
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { popularMovies, nowPlayingMovies } = this.state;

    return (
      <>
        <SearchForm history={this.props.history} />

        <section>
          <h2>Películas Populares</h2>
          
          <MovieGrid movies={popularMovies.slice(0, 5)} />
        </section>




        <section>
          <h2>Películas en Cartelera</h2>
          <Link to="/cartelera">Ver mas</Link>
          <MovieGrid movies={nowPlayingMovies.slice(0, 5)} />
        </section>
      </>
    );
  }
}

export default Home;