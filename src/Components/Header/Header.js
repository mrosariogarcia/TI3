import React from 'react'

import "./Header.css"

import {Route, Link} from 'react-router-dom'

import Home from '../../Pages/Home'
import Favorites from '../../Pages/Favorites'
import Populares from '../../Pages/Populares'
import Cartelera from '../../Pages/Cartelera'


const Header = () => {
  return (
    <>
      <section className="header">

        <div className="titulo">
          <img className="logo" src="../images/logo.avif" alt=''></img>
          <div className='titulos'>
            <h1>MOON</h1>
            <h3>presenta</h3>
          </div>

        </div>
        <nav>
          <form>
          <input type="text" placeholder="Buscar..."/>
          <button type="submit">Buscar</button>
          </form>

          <Link to="/" exact="true">Home</Link> 
          <Link to="/favorites">Favorites</Link>
          <Link to="/populares">Populares</Link>
          <Link to="/cartelera">En Cartelera</Link>

          <Route path="/" exact={true} component={Home}></Route>
          <Route path="/favorites"  component={Favorites}></Route>
          <Route path="/populares"  component={Populares}></Route>
          <Route path="/cartelera"  component={Cartelera}></Route>

          
        </nav>
      </section>
       
    </>
  )
}

export default Header