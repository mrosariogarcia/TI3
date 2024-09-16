import React from 'react'

import "./Header.css"

import { Link } from 'react-router-dom'



const Header = (props) => {
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
          <Link to="/populares">Populares</Link>
          <Link to="/cartelera">En Cartelera</Link>




        </nav>
      </section>

    </>
  )
}

export default Header