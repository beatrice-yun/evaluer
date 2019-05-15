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
    axios.get(`${process.env.REACT_APP_APIURL || ""}/api/ao`, {withCredentials:true})
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
        <h1>Créer une grille d'analyse</h1>
        <h3>Listes des appels d'offres existants :</h3>
        <div>
          {this.state.listOfAo.filter(ao => this.props.loggedInUser && ao.owner === this.props.loggedInUser._id)
          .map( ao => {
            return (
              <div key={ao._id}>
                <Link to={`/ao/${ao._id}`} class="link">
                  {ao.title}
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