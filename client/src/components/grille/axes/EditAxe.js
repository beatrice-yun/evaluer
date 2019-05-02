// components/projects/EditAxe.js

import React, { Component } from 'react';
import axios from 'axios';

class EditAxe extends Component {
  constructor(props){
    super(props);
    this.state = {
        title: this.props.theAxe.title,
        description: this.props.theAxe.description
    }
  }
    
  handleFormSubmit = (event) => {
    const title = this.state.title;
    const description = this.state.description;

    event.preventDefault();

    axios.put(`${process.env.REACT_APP_APIURL || ""}/api/axes/${this.props.theAxe._id}`, { title, description })
    .then( () => {
        this.props.getTheAxe();
        // after submitting the form, redirect to '/ao'
        this.props.history.push('/ao');    
    })
    .catch( error => console.log(error) )
  }

  handleChangeAxe = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
}

  render(){
    return (
      <div>
        <hr />
        <h3>Modifier l'axe :</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nouveau nom :</label>
          <input type="text" name="title" value={this.state.title} onChange={e => this.handleChangeAxe(e)}/>
          <label>Nouvelle description :</label>
          <textarea type="text" name="description" value={this.state.description} onChange={e => this.handleChangeAxe(e)}/>          
          <input type="submit" value="Modifier" />
        </form>
      </div>
    )
  }
}

export default EditAxe;