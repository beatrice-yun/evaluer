// components/axes/AxeDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddCritere from '../criteres/AddCritere';
import EditAxe from './EditAxe';

class AxeDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getSingleAxe();
  }


  getSingleAxe = () => {
    const { params } = this.props.match;
    axios.get(`${process.env.REACT_APP_APIURL || ""}/api/ao/${params.id}/axes/${params.axeId}`)
    .then( responseFromApi =>{
      const theAxe = responseFromApi.data;
      this.setState(theAxe);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

    // ADD CRITERE TO AN AXE :
    renderAddCritereForm = () => {
      if(!this.state.title){
          this.getSingleAxe();
        } else {     
                  // pass the axe and method getSingleAxe() as a props down to AddCritere component
          return <AddCritere theAxe={this.state} getTheAxe={this.getSingleAxe} />
        }
    }
  
    // EDIT AXE
    renderEditForm = () => {
      if(!this.state.title){
        this.getSingleAxe();
      } else {
      //                                                    {...props} => so we can have 'this.props.history' in Edit.js
      //                                                                                          ^
      //                                                                                          |
        return <EditAxe theAxe={this.state} getTheAxe={this.getSingleAxe} {...this.props} />
          
      }
    }
    
    // DELETE AXE
    deleteAxe = () => {
      const { params } = this.props.match;
      axios.delete(`${process.env.REACT_APP_APIURL || ""}/api/axes/${params.axeId}`)
      .then( () =>{
          this.props.history.push('/ao'); // !!!         
      })
      .catch((err)=>{
          console.log(err)
      })
    }

  render(){
    return(
      <div>
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>

        <div>
        {/* show the critere heading only if there are criteres */}
        { this.state.criteres && this.state.criteres.length > 0 && <h3>Liste des critères : </h3> }
        {/* map through the array of criteres and... */}
        { this.state.criteres && this.state.criteres.map((critere, index) => {
            return(
                <div key={ index }>
                {/* ... make each critere's title a link that goes to the criteres details page */}
                    <Link class="link" to={`/ao/${this.state._id}/axes/${this.state._id}/criteres/${critere._id}`}> {/*je pense ici il va y avoir un probleme car this.state._id de ao n'est pas possible, il faut p-e en faire un this.getSingleAO._id ? */}
                        { critere.title }
                    </Link>
                    </div>
            )
            
        }) }
        </div>
        <br/>
        <div>{this.renderAddCritereForm()} </div> {/* <== !!! */}
        <div>{this.renderEditForm()} </div>
        <br/>
        <button class="button-red" onClick={() => this.deleteAxe()}>Supprimer l'axe</button> {/* <== !!! */}
        <br/><br/><br/><br/><br/>
        <Link class="link" to={'/ao'}>Revenir aux appels d'offres</Link>
      </div>
    )
  }
}

export default AxeDetails;