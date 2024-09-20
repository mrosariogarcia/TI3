import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Home from "./Pages/Home";
import Favorites from "./Pages/Favorites";
import Populares from "./Pages/Populares";
import Cartelera from "./Pages/Cartelera";
import SearchResults from "./Pages/SearchResults";
import NotFound from './Pages/NotFound';
import MovieDetail from './Components/MovieDetail/MovieDetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route path="/" exact={true} component={Home}></Route>
          <Route path="/favorites" component={Favorites}></Route>
          <Route path="/populares" component={Populares}></Route>
          <Route path="/cartelera" component={Cartelera}></Route>
          <Route path="/search" component={SearchResults}></Route>
          <Route path="/movies/:movieId" exact component={MovieDetail}></Route>
          <Route path="" component={NotFound} />

        </Switch>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
