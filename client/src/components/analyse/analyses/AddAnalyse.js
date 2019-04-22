// components/ao/AddAo.js

import React, { Component } from 'react';
import axios from 'axios';

class AddAnalyse extends Component {
  constructor(props){
      super(props);
      this.state = { 
        auteur: "",
        ao:"",
        appelDOffres: [],
        selectedAo: {}
      };
  }

  componentDidMount () {
    
    fetch(`${process.env.REACT_APP_APIURL || ""}/api/ao`)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let aoFromAPI = data.map(oneAo => { return {value: oneAo._id, display: oneAo.title} })
      this.setState({ appelDOffres: [{value: '', display: ''}].concat(aoFromAPI) });
    }).catch(error => {
      console.log(error);
    });
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const auteur = this.state.auteur;
    const ao = this.state.selectedAo.value;

    axios.post(`${process.env.REACT_APP_APIURL || ""}/api/analyses`, { auteur, ao })
    .then( () => {
        this.props.getData();
        this.setState({auteur: "", ao: ""});
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Auteur:</label>
          <input type="text" name="auteur" value={this.state.auteur} onChange={ e => this.handleChange(e)}/>
          <label>Appel d'offres:</label>
          
            <select name="ao" value={this.state.selectedAo.value} 
              onChange={(e) => this.setState({selectedAo: e.target.value})}>
              <option>Choisir un appel d'offres</option>
              {this.state.appelDOffres.map((oneAo) => { 
              return <option key={oneAo.value} value={oneAo.value}>{oneAo.display}</option>})}
            </select>

          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddAnalyse;