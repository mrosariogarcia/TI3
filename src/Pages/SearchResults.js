import { Component } from "react";
import MovieGrid from '../Components/MovieGrid/MovieGrid';
export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
          searchMovie:[]
        };
      }
    componentDidMount() {
        const api = `https://api.themoviedb.org/3/search/movie?api_key=e6a0d8ba2d9778d0953077400f26f011&language=en-US&query=${this.props.location.state.query}&page=1`;

        fetch(api)
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
            if (data.results) {
                this.setState({ searchMovie: data.results });
            } else {
                console.error('No se encuentran películas');
            }
            })
            .catch((error) => console.log(error));
        }
    
        render() {
            const { searchMovie } = this.state;
            return (
              <>
                <section>
                  <p>Resultado de búsqueda: {this.props.location.state.query}</p>
          
                  {searchMovie.length > 0 ? (
                    <MovieGrid movies={searchMovie} />
                  ) : (
                    <p>No se encontraron resultados para tu búsqueda.</p> 
                  )}
                </section>
              </>
            );
          }
          
    }