// components/ao/AoList.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddAo from './AddAo'; // <== !!!

class AoList extends Component {
  constructor(){
      super();
      this.state = { listOfAo: [] };
  }

  getAllAo= () =>{
    axios.get(`http://localhost:5000/api/ao`)
    .then(responseFromApi => {
      this.setState({
        listOfAo: responseFromApi.data
      })
    })
  }

  componentDidMount() {
    this.getAllAo();
  }

  render(){
    return(
      <div>
        <div>
          { this.state.listOfAo.map( ao => {
            return (
              <div key={ao._id}>
                <Link to={`/ao/${ao._id}`}>
                  <h3>{ao.title}</h3>
                </Link>
                {/* <p style={{maxWidth: '400px'}} >{project.description} </p> */}
              </div>
            )})
          }
        </div>
        <div>
            <AddAo getData={() => this.getAllAo()}/> {/* <== !!! */}
        </div>
      </div>
    )
  }
}

export default AoList;