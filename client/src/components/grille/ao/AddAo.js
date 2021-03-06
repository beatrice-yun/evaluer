// components/ao/AddAo.js

import React, { Component } from 'react';
import axios from 'axios';

class AddAo extends Component {
  constructor(props){
      super(props);
      this.state = { title: ""};
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    axios.post(`${process.env.REACT_APP_APIURL || ""}/api/ao`, { title }, {withCredentials:true})
    .then( () => {
        // this.props.getData();
        this.setState({title: ""});
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
        <hr />
        <h3>Créer un nouvel appel d'offres :</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Nom :</label>
          <input class="text-input" type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
          <br/>
          <br/>
          <input class="button" type="submit" value="Créer" />
        </form>
      </div>
    )
  }
}

export default AddAo;