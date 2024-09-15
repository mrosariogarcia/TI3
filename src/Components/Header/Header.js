import React from 'react'

import {Route, Link} from 'react-router-dom'

import Home from '../../Pages/Home'
import Favorites from '../../Pages/Favorites'
import Detail from '../../Pages/Detail'


const Header = () => {
  return (
    <>
        <Link to="/" exact="true">Home</Link> 
        <Link to="/favorites">Favorites</Link>
        <Link to="/detail">Detalle</Link>

        <Route path="/" exact={true} component={Home}></Route>
        <Route path="/favorites"  component={Favorites}></Route>
        <Route path="/detail"  component={Detail}></Route>
    </>
  )
}

export default Header