import { Component } from "react";
import { FaHeart } from "react-icons/fa";
import "./MovieDetail.css"
import Loading from '../Loading/Loading'


class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      favorito: false
    };
  }

  componentDidMount() {
    const { movieId } = this.props.match.params;

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=e6a0d8ba2d9778d0953077400f26f011&language=en-US`)
      .then(response => response.json())
      .then(data => {
        this.setState({ movie: data });

        // Verificar favoritos en detalle tambien
        const storage = localStorage.getItem('favoritos');
        const parsedArray = JSON.parse(storage) || [];
        if (parsedArray.includes(movieId)) {
          this.setState({ favorito: true });
        }
      })
      .catch(error => console.log(error));
  }

  agregarFavorito() {
    const storage = localStorage.getItem('favoritos');
    const parsedArray = storage ? JSON.parse(storage) : [];

    //el this.props aca esta indefinido, entonces utilizo this.state.movie.id
    if (this.state.movie && !parsedArray.includes(this.state.movie.id)) {
      parsedArray.push(this.state.movie.id);
      localStorage.setItem('favoritos', JSON.stringify(parsedArray));
      this.setState({ favorito: true });
    }
  }

  quitarFavorito() {
    const storage = localStorage.getItem('favoritos');
    const parsedArray = JSON.parse(storage) || [];

    const favoritosRestantes = parsedArray.filter(id => id !== this.state.movie.id);
    localStorage.setItem('favoritos', JSON.stringify(favoritosRestantes));

    this.setState({ favorito: false });
  }

  render() {
    const { movie, favorito } = this.state;

    if (movie) {
      const { title, poster_path, vote_average, release_date, runtime, overview, genres } = movie;
      const generos = genres.map(genre => <li key={genre.id}>{genre.name}</li>);

      return (
        <section className='movie-detail'>
          <div className="detail-content">
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
            <h2>{title}</h2>
            <p><strong>Calificación:</strong> {vote_average} / 10</p>
            <p><strong>Fecha de estreno:</strong> {release_date}</p>
            <p><strong>Duración:</strong> {runtime} minutos</p>
            <p><strong>Sinopsis:</strong> {overview}</p>
            <p><strong>Género:</strong> {generos}</p>
            <button className="botonFavorito" onClick={() => favorito ? this.quitarFavorito() : this.agregarFavorito()}>
              {favorito ? "Quitar de favoritos" : "Agregar a favoritos"} <FaHeart size={20} />
            </button>
          </div>
        </section>
      );
    } return <Loading />;
  }
}

export default MovieDetail;

