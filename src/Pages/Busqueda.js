import { queries } from '@testing-library/react';
import React, { Component } from 'react';
import React from 'react'

export class Busqueda extends Component{
  constructor(props) {
    super(props);
    this.state={ 
      query:''
    }
  }


  handleInputChange(e){
    this.setState({
      query:e.target.value
    })

  

  }
  handleInputSubmit(){
    this.props.history.push('/search',{query:this.state.query})
  }
  handleRedrect(){}

  render(){
    return(
      <div>
        <input onChange={(e)=> this.handleInputChange(e)}
        type='text'name='query' value={this.state.query}></input>
        <button onClick={()=>this.handleInputSubmit()}>search</button>

      </div>
     
     
    )
  }




}