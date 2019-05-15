// components/projects/EditCritere.js

import React, { Component } from 'react';
import axios from 'axios';

class EditCritere extends Component {
  constructor(props){
    super(props);
    this.state = {
        title: this.props.theCritere.title,
        description: this.props.theCritere.description
    }
  }
    
  handleFormSubmit = (event) => {
    const title = this.state.title;
    const description = this.state.description;

    event.preventDefault();

    axios.put(`${process.env.REACT_APP_APIURL || ""}/api/criteres/${this.props.theCritere._id}`, { title, description })
    .then( () => {
        this.props.getTheCritere();
        // after submitting the form, redirect to '/ao'
        this.props.history.push('/ao');    
    })
    .catch( error => console.log(error) )
  }

  handleChangeCritere = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
}

  render(){
    return (
      <div>
        <hr />
        <h3>Modifier le critère :</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nouveau nom :</label>
          <input class="text-input" type="text" name="title" value={this.state.title} onChange={e => this.handleChangeCritere(e)}/>
          <br/>
          <br/>
          <label>Nouvelle description :</label>
          <textarea class="text-input" type="text" name="description" value={this.state.description} onChange={e => this.handleChangeCritere(e)}/>
          <br/>          
          <br/>
          <input class="button-light" type="submit" value="Modifier" />
        </form>
      </div>
    )
  }
}

export default EditCritere;