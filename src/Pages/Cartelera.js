import React, { Component } from 'react';
import MovieGrid from '../Components/MovieGrid/MovieGrid';
import Loading from '../Components/Loading/Loading'; 

class Cartelera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      carteleraMovies: [],
      isLoading: true, 
      error: null,
      pagina: 1,
    };
  }

  componentDidMount() {
    this.fetchMovies(); 
  }

  fetchMovies = () => {
    const { pagina, carteleraMovies } = this.state;
    const api = `https://api.themoviedb.org/3/movie/now_playing?api_key=e6a0d8ba2d9778d0953077400f26f011&language=en-US&page=${pagina}`;

    fetch(api)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          const peliculasActual = []; 
        
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
          <>
            <MovieGrid movies={carteleraMovies} />
            <button onClick={this.handleVerMas} disabled={isLoading}>
              {isLoading ? <Loading />: 'Ver más'}
            </button>
          </>
        )}
      </section>
    );
  }
}

export default Cartelera;
