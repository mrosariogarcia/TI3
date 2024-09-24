import { Component } from "react";
import "./MovieDetail.css"
import Loading from '../Loading/Loading'


class MovieDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    const { movieId } = this.props.match.params;

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=415551d4ecd00d6cb4f0147be963f2ed&language=en-US`)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ movie: data });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { movie } = this.state;

    if (movie) {
      const { title, poster_path, vote_average, release_date, runtime, overview, genres } = movie;
      const generos = genres.map(genre => <li key={genre.id}>{genre.name}</li>);

      return (
        <section className='movie-detail'>
          <div className="detail-content">
            <img src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={title} />
            <div>
              <h2>{title}</h2>
              <p><strong>Calificación:</strong> {vote_average} / 10</p>
              <p><strong>Fecha de estreno:</strong> {release_date}</p>
              <p><strong>Duración:</strong> {runtime} minutos</p>
              <p><strong>Sinopsis:</strong> {overview}</p>
              <p><strong>Género:</strong> {generos}</p>
            </div>
            
          </div>
        </section>
      );
    } return <Loading />;
  }
}

export default MovieDetail;

