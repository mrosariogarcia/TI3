import"./Movie.css"

import { Component } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

class Movie extends Component{
    constructor(props) {
    super(props);
    this.state = {
      showExtra: false
    };
  }

  verMas(){
    this.setState({
        showExtra : !this.state.showExtra
    })
  }

  render(){
     const { id, title, poster_path, overview } = this.props.movie;
    return(
        <>
        <article className="movie-grid">
        <div>
          <img src={`https://image.tmdb.org/t/p/w400${poster_path}`} alt={title} />
          <Link to={`/movies/${id}`}>{title}</Link>  

          <p className={this.state.showExtra ? "show": "hide"}>{overview}</p>
                    <button onClick={() => this.verMas()}>{this.state.showExtra ? "Ver menos": "Ver más"}</button>  

          <Link to="/favoritos"><button className="botonFavorito"> <FaHeart size={20} /></button></Link>
        </div>
      </article>
        </>
    )
  }
}

export default Movie