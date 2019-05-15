// components/projects/EditCandidat.js

import React, { Component } from 'react';
import axios from 'axios';

class EditCandidat extends Component {
  constructor(props){
    super(props);
    this.state = {
        title: this.props.theCandidat.title
    }
  }
    
  handleFormSubmit = (event) => {
    const title = this.state.title;

    event.preventDefault();

    axios.put(`${process.env.REACT_APP_APIURL || ""}/api/candidats/${this.props.theCandidat._id}`, { title })
    .then( () => {
        this.props.getTheCandidat();
        // after submitting the form, redirect to '/ao'
        this.props.history.push('/ao');    
    })
    .catch( error => console.log(error) )
  }

  handleChangeCandidat = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
}

  render(){
    return (
      <div>
        <hr />
        <h3>Modifier le candidat :</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nouveau nom :</label>
          <input class="text-input" type="text" name="title" value={this.state.title} onChange={e => this.handleChangeCandidat(e)}/>
          <br/>      
          <br/>  
          <input class="button-light" type="submit" value="Modifier" />
        </form>
      </div>
    )
  }
}

export default EditCandidat;