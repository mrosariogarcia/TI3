import React, { Component } from 'react';
import MovieGrid from '../Components/MovieGrid/MovieGrid';
import Loading from '../Components/Loading/Loading'; 

class Populares extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularesMovies: [],
      isLoading: true, 
      error: null,
      pagina: 1
    };
  }

componentDidMount() {
  this.fetchMovies(); 
}

fetchMovies = () => {
  const { pagina, popularesMovies } = this.state;
  const api = `https://api.themoviedb.org/3/movie/popular?api_key=e6a0d8ba2d9778d0953077400f26f011&language=en-US&page=${pagina}`;

  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      if (data.results) {
        const peliculasActual = []; 
      
        // principales películas
        for (let i = 0; i < popularesMovies.length; i++) {
          peliculasActual.push(popularesMovies[i]);
        }

        // nuevas películas
        for (let i = 0; i < data.results.length; i++) {
          peliculasActual.push(data.results[i]);
        }

        this.setState({
          popularesMovies: peliculasActual, 
          isLoading: false 
        });
        
      } else {
        this.setState({
          error: 'No se encuentran películas populares',
          isLoading: false
        });
      }
    })

    .catch((error) => {
      console.log(error);
      this.setState({
        error: 'Error al cargar las películas populares',
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
  const { popularesMovies, isLoading, error } = this.state;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <h2>Películas Populares</h2>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <MovieGrid movies={popularesMovies} />
          <button className="ver-mas" onClick={this.handleVerMas} disabled={isLoading}>
            {isLoading ? <Loading />: 'Cargar más'}
          </button>
        </>
      )}
    </section>
  );
}
}

export default Populares;
