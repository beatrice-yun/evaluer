import React, { Component } from 'react';
import axios from 'axios';

class CommentairreDetails extends Component {
  constructor(props){
    super(props);
    this.state = {};
}

  componentDidMount(){
      this.getSingleCommentaire();
  }

  getSingleCommentaire = () => {
      const { params } = this.props.match;
      axios.get(`${process.env.REACT_APP_APIURL || ""}/api/commentaires/${params.id}`)
      .then( responseFromApi =>{
          const theCommentaire = responseFromApi.data;
          this.setState(theCommentaire);
      })
      .catch((err)=>{
          console.log(err)
      })
  }

  render () {
    return (
      <div>
        <h3>Commentaire</h3>
      </div>
    )
  }

}

export default CommentairreDetails;