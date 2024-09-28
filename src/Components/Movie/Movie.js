import "./Movie.css"
import { Component } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showExtra: false,
      favorito: false
    };
  }
  componentDidMount() {
    const storage = localStorage.getItem('favoritos');
    const parsedArray = JSON.parse(storage) || [];
    if (parsedArray.includes(this.props.movie.id)) {
      this.setState({ favorito: true });
    }
  }

  agregarFavorito() {
    const storage = localStorage.getItem('favoritos');
    const parsedArray = storage ? JSON.parse(storage) : [];
    if (!parsedArray.includes(this.props.movie.id)) {
      parsedArray.push(this.props.movie.id);
      localStorage.setItem('favoritos', JSON.stringify(parsedArray));
      this.setState({ favorito: true });
    }
  }

  quitarFavorito() {
    const storage = localStorage.getItem('favoritos');
    const parsedArray = JSON.parse(storage) || [];
    const favoritosRestantes = parsedArray.filter(id => id !== this.props.movie.id);
    localStorage.setItem('favoritos', JSON.stringify(favoritosRestantes));
    this.setState({ favorito: false });
  }


  verMas() {
    this.setState({
      showExtra: !this.state.showExtra
    })
  }

  render() {
    const { id, title, poster_path, overview } = this.props.movie;
    return (
      <>
        <article>
          <Link to={`/movies/${id}`}>
            <img src={`https://image.tmdb.org/t/p/w400${poster_path}`} alt={title} /> </Link>
            <div className="alinear">
            <Link className="title" to={`/movies/${id}`}>{title}</Link>
            <Link className="ir-detalle" to={`/movies/${id}`}>Ir detalle</Link>
            <p className={`overview ${this.state.showExtra ? "show" : "hide"}`}>{overview}</p>
            <button className="ver-mas2" onClick={() => this.verMas()}>{this.state.showExtra ? "Ver menos" : "Ver más"}</button>
            <button className="boton-favorito" onClick={() => this.state.favorito ? this.quitarFavorito() : this.agregarFavorito()}>
              {this.state.favorito ? "QUITAR " : "AGREGAR "}<FaHeart size={20} />
            </button>
            </div>
        </article>
      </>
    )
  }
}

export default Movie