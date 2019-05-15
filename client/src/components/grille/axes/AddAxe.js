// components/axes/AddAxe.js

import React, { Component } from 'react';
import axios from 'axios';

class AddAxe extends Component {
  constructor(props){
      super(props);          //             will help us to toggle add task form   
                            //                      |
      this.state = { title: "", description: "", isShowing: false };
  }
   
  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const aoID = this.props.theAo._id; // <== we need to know to which ao the created axe belong, so we need to get its 'id'
                                                // it has to be the 'id' because we are referencing ao 
                                                // by its id in the axe model on the server side ( ao: {type: Schema.Types.ObjectId, ref: 'Ao'})
    
    // { title, description, aoID } => this is 'req.body' that will be received on the server side in this route, 
    // so the names have to match
    axios.post(`${process.env.REACT_APP_APIURL || ""}/api/axes`, { title, description, aoID })
    .then( () => {
          // after submitting the form, retrieve ao one more time so the new axe is displayed as well 
          //              |
        this.props.getTheAo();
        this.setState({title: "", description: ""});
    })
    .catch( error => console.log(error) )
  }

  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  toggleForm = () => {
      if(!this.state.isShowing){
          this.setState({isShowing: true});
      } else {
        this.setState({isShowing: false});
      }
  }

  showAddAxeForm = () => {
    if(this.state.isShowing){
        return(
            <div>
                  <h3>Ajouter un axe :</h3>
                  <form onSubmit={this.handleFormSubmit}>
                  <label>Nom :</label>
                  <input class="text-input" type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>
                  <br/>
                  <br/>
                  <label>Description :</label>
                  <textarea class="text-input" name="description" value={this.state.description} onChange={ e => this.handleChange(e)} />
                  <br/>
                  <br/>
                  <input class="button-light" type="submit" value="Ajouter" />
                  </form>
            </div>
          )
    }
  }

  render(){
    return(
      <div>
            <button class="button" onClick={() => this.toggleForm()}> Ajouter un axe </button>
            { this.showAddAxeForm() }
      </div>
    )
  }
}

export default AddAxe;