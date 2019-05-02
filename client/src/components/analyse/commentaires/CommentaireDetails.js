// components/commentaires/CommentaireDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import EditCommentaire from "./EditCommentaire";

class CommentaireDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  componentDidMount(){
    this.getSingleCommentaire();
  }

  getSingleCommentaire = () => {
    const { params } = this.props.match;
    axios.get(`${process.env.REACT_APP_APIURL || ""}/api/commentaires/${params.commentaireId}`)
    .then( responseFromApi =>{
      const theCommentaire = responseFromApi.data;
      this.setState(theCommentaire);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

    // EDIT COMMENTAIRE :
    renderEditForm = () => {
      if(!this.state.description){
        this.getSingleCommentaire();
      } else {
      //                                                    {...props} => so we can have 'this.props.history' in Edit.js
      //                                                                                          ^
      //                                                                                          |
        return <EditCommentaire theCommentaire={this.state} getTheCommentaire={this.getSingleCommentaire} {...this.props} />
          
      }
    }

  // DELETE COMMENTAIRE :
  deleteCommentaire = () => {
    const { params } = this.props.match;
    axios.delete(`${process.env.REACT_APP_APIURL || ""}/api/commentaires/${params.id}`)
    .then( () =>{
        this.props.history.push('/analyses'); // !!!         
    })
    .catch((err)=>{
        console.log(err)
    })
  }
  
  render(){
    return(
      <div>
        <p>{this.state.description}</p>
        <p><b>Page :</b> {this.state.page}</p>
        <p><b>Positif/négatif :</b> {this.state.boolean}</p>

        <div>{this.renderEditForm()} </div> {/* <== !!! */}
        <button onClick={() => this.deleteCommentaire()}>Supprimer le commentaire</button> {/* <== !!! */}
        <br/><br/><br/><br/><br/>
        <Link to={'/analyses'}>Revenir à la page d'accueil des évaluations</Link>
      </div>
    )
  }
}

export default CommentaireDetails;