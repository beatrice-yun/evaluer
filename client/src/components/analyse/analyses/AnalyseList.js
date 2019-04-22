// components/ao/AoList.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class AnalysesList extends Component {
  constructor(){
      super();
      this.state = { listOfAnalyses: [] };
  }

  getAllAnalyses= () =>{
    axios.get(`${process.env.REACT_APP_APIURL || ""}/api/analyses`)
    .then(responseFromApi => {
      this.setState({
        listOfAnalyses: responseFromApi.data
      })
    })
  }

  componentDidMount() {
    this.getAllAnalyses();
  }

  render(){
    return(
      <div>
        <h3>Listes des analyses</h3>
        <div>
          { this.state.listOfAnalyses.map( analyse => {
            return (
              <div key={analyse._id}>
                <Link to={`/analyses/${analyse._id}`}>
                  <h3>{analyse.note}</h3>
                </Link>
                {/* <p style={{maxWidth: '400px'}} >{project.description} </p> */}
              </div>
            )})
          }
        </div>
      </div>
    )
  }
}

export default AnalysesList;