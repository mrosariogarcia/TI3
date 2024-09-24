import React, { Component } from 'react';
import MovieGrid from '../Components/MovieGrid/MovieGrid';
import Loading from '../Components/Loading/Loading';

class Cartelera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carteleraMovies: [],
      filterMovie: "",
      isLoading: true,
      error: null,
      pagina: 1
    };
  }

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = () => {
    const { pagina, carteleraMovies } = this.state;
    const api = `https://api.themoviedb.org/3/movie/now_playing?api_key=415551d4ecd00d6cb4f0147be963f2ed&language=en-US&page=${pagina}`;

    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          const peliculasActual = [];

          // principales películas
          for (let i = 0; i < carteleraMovies.length; i++) {
            peliculasActual.push(carteleraMovies[i]);
          }

          // nuevas películas
          for (let i = 0; i < data.results.length; i++) {
            peliculasActual.push(data.results[i]);
          }

          this.setState({
            carteleraMovies: peliculasActual,
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

  handleVerMas = () => {
    this.setState({
      pagina: this.state.pagina + 1
    }, this.fetchMovies);
  };

  handleSearch = (search) => {
    this.setState({ filterMovie: search.target.value })
  }

  render() {
    const { carteleraMovies, isLoading, error, filterMovie } = this.state;
    const peliculasFiltradas = carteleraMovies.filter((movie) =>
      movie.title.toLowerCase().includes(filterMovie.toLowerCase())
    );

    if (isLoading) {
      return <Loading />;
    }

    return (
      <section>
        <h2>Películas en Cartelera</h2>
        <div className='search-container'>
          <input className="ver-mas" type="text" value={filterMovie} placeholder='Filtrar Peliculas' onChange={this.handleSearch} />
        </div>
        {error ? (
          <p>{error}</p>
        ) :

          (
            peliculasFiltradas.length > 0 ?

              <div className="movie-grid">
                <MovieGrid movies={peliculasFiltradas} />
                <button className="ver-mas" onClick={this.handleVerMas} disabled={isLoading}>
                  {isLoading ? <Loading /> : 'Cargar más'}
                </button>
              </div>

              :

              <div className="container"></div>

          )}
      </section>
    );
  }
}

export default Cartelera;
