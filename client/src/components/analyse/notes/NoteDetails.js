// components/notes/NoteDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddCommentaire from '../commentaires/AddCommentaire';

class NoteDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getSingleNote();
  }


  getSingleNote = () => {
    const { params } = this.props.match;
    axios.get(`${process.env.REACT_APP_APIURL || ""}/api/notes/${params.id}`)
    .then( responseFromApi =>{
      const theNote = responseFromApi.data;
      this.setState(theNote);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

    // ADD COMMENTAIRE TO A NOTE :
    renderAddCommentaireForm = () => {
      if(!this.state.note){
          this.getSingleNote();
        } else {     
                  // pass the ao and method getSingleAo() as a props down to AddAxe component
          return <AddCommentaire theNote={this.state} getTheNote={this.getSingleNote} />
        }
    }

  render(){
    return(
      <div>
        <h1>{this.state.note}</h1>

        <div>
        {/* show the commentaire heading only if there are criteres */}
        { this.state.commentaires && this.state.commentaires.length > 0 && <h3>Commentaires </h3> }
        {/* map through the array of commentaire and... */}
        { this.state.commentaires && this.state.commentaires.map((commentaire, index) => {
            return(
                <div key={ index }>
                {/* ... make each critere's title a link that goes to the criteres details page */}
                    <Link to={`/notes/${this.state._id}/commentaires/${commentaire._id}`}> 
                        { commentaire.description }
                    </Link>
                    </div>
            )
            
        }) }
        </div>
        <div>{this.renderAddCommentaireForm()} </div> {/* <== !!! */}
        <br/>
        <br/><br/><br/><br/><br/>
        <Link to={'/analyses'}>Back to analyses</Link>
      </div>
    )
  }
}

export default NoteDetails;