import "./MovieGrid.css"
import Movie from "../Movie/Movie"
import { Component } from "react";

class MovieGrid extends Component{
    constructor(props){
        super(props);
        this.state={
            movies:[]
        }
    }

    componentDidMount(){
        const api = 'https://api.themoviedb.org/3/movie/popular?api_key=e6a0d8ba2d9778d0953077400f26f011&language=en-US&page=1'

        fetch(api)
        .then(response => response.json())
        .then((data) => data.results && data ? this.setState({ movies: data.results }) 
        : console.error("No se encuentran películas")
        .catch(error => console.log(error))
    )}

    render(){
        const { movies } = this.state; // Desestructuramos el estado para acceder a las películas
        return(
            <>
            <section>
            <h2 className="titulo">Películas Populares</h2>

            <div className="movie-grid">
                {movies.map((movie, index) => (
                <Movie movie={movie} key={index} />
            ))}
            </div>

            </section>
            </>
        )
    
    }
}

export default MovieGrid