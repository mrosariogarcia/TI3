import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
      <section className="header">
        <div className="titulo">
          <img className="logo" src="../images/logo2.avif" alt=''></img>
          <div className='titulos'>
            <h1>Movie Time</h1>
            <h3>presenta</h3>
          </div>

        </div>
        <nav>
          <Link className="titulos2" to="/" exact="true">Home</Link>
          <Link className="titulos2" to="/favorites">Favorites</Link>
          <Link className="titulos2" to="/populares">Populares</Link>
          <Link className="titulos2" to="/cartelera">En Cartelera</Link>
        </nav>
      </section>

    </>
  )
}

export default Header