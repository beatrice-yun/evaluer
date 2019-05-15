// components/projects/EditAo.js

import React, { Component } from 'react';
import axios from 'axios';

class EditAo extends Component {
  constructor(props){
    super(props);
    this.state = {
        title: this.props.theAo.title, 
    }
  }

    
  handleFormSubmit = (event) => {
    const title = this.state.title;

    event.preventDefault();

    axios.put(`${process.env.REACT_APP_APIURL || ""}/api/ao/${this.props.theAo._id}`, { title }, {withCredentials:true})
    .then( () => {
        this.props.getTheAo();
        // after submitting the form, redirect to '/ao'
        this.props.history.push('/ao');    
    })
    .catch( error => console.log(error) )
  }

  handleChangeTitle = (event) => {  
    this.setState({
      title:event.target.value
    })
  }

  render(){
    return (
      <div>
        <hr />
        <h3>Modifier le nom de l'appel d'offres :</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nouveau nom :</label>
          <input class="text-input" type="text" name="title" value={this.state.title} onChange={e => this.handleChangeTitle(e)}/> 
          <br/>
          <br/> 
          <input class="button-light" type="submit" value="Modifier" />
        </form>
      </div>
    )
  }
}

export default EditAo;