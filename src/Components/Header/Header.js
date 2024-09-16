import React from 'react'

import "./Header.css"

import {Route, Link} from 'react-router-dom'

import Home from '../../Pages/Home'
import Favorites from '../../Pages/Favorites'
import Detail from '../../Pages/Detail'


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
          <Link to="/" exact="true">Home</Link> 
          <Link to="/favorites">Favorites</Link>
          <Link to="/detail">Detalle</Link>

          <Route path="/" exact={true} component={Home}></Route>
          <Route path="/favorites"  component={Favorites}></Route>
          <Route path="/detail"  component={Detail}></Route>
        </nav>
      </section>
       
    </>
  )
}

export default Header