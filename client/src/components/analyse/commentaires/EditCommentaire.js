// components/projects/EditCommentaire.js

import React, { Component } from 'react';
import axios from 'axios';

class EditCommentaire extends Component {
  constructor(props){
    super(props);
    this.state = {
        description: this.props.theCommentaire.description,
        page: this.props.theCommentaire.page,
        boolean: this.props.theCommentaire.boolean
    }
  }
    
  handleFormSubmit = (event) => {
    const description = this.state.description;
    const page = this.state.page;
    const boolean = this.state.boolean;

    event.preventDefault();

    axios.put(`${process.env.REACT_APP_APIURL || ""}/api/commentaires/${this.props.theCommentaire._id}`, { description, page, boolean })
    .then( () => {
        this.props.getTheCommentaire();
        // after submitting the form, redirect to '/ao'
        this.props.history.push('/analyses');    
    })
    .catch( error => console.log(error) )
  }

  handleChangeCommentaire = (event) => {  
    const {name, value} = event.target;
    this.setState({[name]: value});
}

  render(){
    return (
      <div>
        <hr />
        <h3>Modifier le commentaire :</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nouvelle description :</label>
          <textarea class="text-input" type="text" name="description" value={this.state.description} onChange={e => this.handleChangeCommentaire(e)}/>
          <br/>
          <br/>
          <label>Nouvelle page :</label>
          <input class="text-input" type="number" name="page" value={this.state.page} onChange={e => this.handleChangeCommentaire(e)}/>   
          <br/>
          <br/>
          <label>Nouvelle qualification positif / négatif :</label>
          <input class="text-input" type="text" name="boolean" value={this.state.boolean} onChange={e => this.handleChangeCommentaire(e)}/>  
          <br/>
          <br/>      
          <input class="button-light" type="submit" value="Modifier" />
        </form>
      </div>
    )
  }
}

export default EditCommentaire;