// components/commentaires/CommentaireDetails.js

import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    axios.get(`${process.env.REACT_APP_APIURL || ""}/api/notes/${params.id}/commentaires/${params.commentaireId}`)
    .then( responseFromApi =>{
      const theCommentaire = responseFromApi.data;
      this.setState(theCommentaire);
    })
    .catch((err)=>{
        console.log(err)
    })
  }

  render(){
    return(
      <div>
        <p>{this.state.description}</p>
        <p>Page: {this.state.page}</p>
        <p>Positif/négatif: {this.state.boolean}</p>

        <Link to={'/analyses'}>Back to analyse</Link>
      </div>
    )
  }
}

export default CommentaireDetails;