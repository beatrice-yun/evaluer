import React from "react";
import { Component } from "react";
import SelectAo from "./commentaires/SelectAo";
import SelectAxe from "./commentaires/SelectAxe";
import SelectCritere from "./commentaires/SelectCritere";
import SelectCandidat from "./commentaires/SelectCandidat";


class Analyse extends Component {
  // this.state = {
    

  //}
  //componentDidMount () {
    // Fetch ao

    // Fetch

  //}
  // définir une fonction pour l'AO qui sera sélectionné

  render () {
    return (
      <div>
        <h1>Evaluer les offres</h1>
        < SelectAo /> {/* ajouter ici le props de l'AO sélectionné */}
        < SelectAxe />
        < SelectCritere />
        < SelectCandidat />
        {/* Component CommentairesList */}
        {/* Component EditCommentaire */}
        {/* Component AddCommentaire */}
        {/* Component CommentaireDetails */}

      </div>
    )
  }
}

export default Analyse;