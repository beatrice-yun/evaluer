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

    axios.put(`http://localhost:5000/api/ao/${this.props.theAo._id}`, { title })
    .then( () => {
        this.props.getThePAo();
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
        <h3>Edit form</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={e => this.handleChangeTitle(e)}/>        
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default EditAo;