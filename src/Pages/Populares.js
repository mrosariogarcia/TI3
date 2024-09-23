import React, { Component } from 'react';
import MovieGrid from '../Components/MovieGrid/MovieGrid';
import Loading from '../Components/Loading/Loading'; 

class Populares extends Component {
  constructor(props) {
    super(props);
    this.state = {
      popularesMovies: [],
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
  const { pagina, popularesMovies } = this.state;
  const api = `https://api.themoviedb.org/3/movie/popular?api_key=415551d4ecd00d6cb4f0147be963f2ed&language=en-US&page=${pagina}`;

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

handleSearch = (search) => {
  this.setState({filterMovie: search.target.value})
}

render() {
  const { popularesMovies, isLoading, error, filterMovie } = this.state;
  const peliculasFiltradas = popularesMovies.filter((movie) => 
      movie.title.toLowerCase().includes(filterMovie.toLowerCase())
    );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section>
      <h2>Películas Populares</h2>
      <input type="text" value={filterMovie} placeholder='Buscar por titulo' onChange={this.handleSearch}/>

      {error ? (
        <p>{error}</p>
      ) : 
      
      (
        peliculasFiltradas.length > 0 ? 

          <div className="container">
          <MovieGrid movies={peliculasFiltradas} />
          <button className="ver-mas" onClick={this.handleVerMas} disabled={isLoading}>
            {isLoading ? <Loading />: 'Cargar más'}
          </button>
          </div>

          :

          <div className="container">
          <MovieGrid movies={popularesMovies} />
          <button className="ver-mas" onClick={this.handleVerMas} disabled={isLoading}>
            {isLoading ? <Loading />: 'Cargar más'}
          </button>
          </div>
        
      )}
    </section>
  );
}
}

export default Populares;
