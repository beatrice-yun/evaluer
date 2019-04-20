import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";

class Analyse extends Component {
  state = {
    ao: [],
    selectedAo: {},
    axes: [],
    selectedAxes: {},
    criteres: [],
    selectedCritere: {},
    candidats: [],
    selectedCandidat: {},
    commentaires: [],
    selectedCommentaire: {}
  }

  componentDidMount () {
    
    fetch("http://localhost:5000/api/ao")
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let aoFromAPI = data.map(oneAo => { return {value: oneAo._id, display: oneAo.title} })
      this.setState({ ao: [{value: '', display: ''}].concat(aoFromAPI) });
    }).catch(error => {
      console.log(error);
    });

    fetch("http://localhost:5000/api/axes")
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let axeFromAPI = data.map(oneAxe => { return {value: oneAxe._id, display: oneAxe.title, ao: oneAxe.ao} })
      this.setState({ axes: [{value: '', display: '', ao: ''}].concat(axeFromAPI) });
    }).catch(error => {
      console.log(error);
    });

    fetch("http://localhost:5000/api/criteres")
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let critereFromAPI = data.map(oneCritere => { return {value: oneCritere._id, display: oneCritere.title, axe: oneCritere.axe} })
      this.setState({ criteres: [{value: '', display: '', axe:''}].concat(critereFromAPI) });
    }).catch(error => {
      console.log(error);
    });

    fetch("http://localhost:5000/api/candidats")
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let candidatFromAPI = data.map(oneCandidat => { return {value: oneCandidat._id, display: oneCandidat.title, ao: oneCandidat.ao} })
      this.setState({ candidats: [{value: '', display: '', ao: ''}].concat(candidatFromAPI) });
    }).catch(error => {
      console.log(error);
    });

    fetch("http://localhost:5000/api/commentaires")
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let commentaireFromAPI = data.map(oneCommentaire => { return {value: oneCommentaire._id, display: oneCommentaire.title, critere: oneCommentaire.critere, candidat: oneCommentaire.candidat} })
      this.setState({ commentaires: [{value: '', display: '', critere: '', candidat:''}].concat(commentaireFromAPI) });
    }).catch(error => {
      console.log(error);
    });

  }

  render () {
    return (
      <div>
        <h1>Evaluer les offres</h1>
        <div>
          <h3>Choisir un appel d'offres</h3>
          <select value={this.state.selectedAo.value} 
            onChange={(e) => this.setState({selectedAo: e.target.value})}> {/*appeler ici la fonction qui prend l'ao sélectionné */}

            {this.state.ao.map((oneAo) => { 
            return <option key={oneAo.value} value={oneAo.value}>{oneAo.display}</option>})}

          </select>
        </div>
        {/*<h3>Choisir un axe</h3>*/}
        <div>
        <h3>Choisir un axe</h3>
          <select value={this.state.selectedAxes} 
            onChange={(e) => this.setState({selectedAxes: e.target.value})}>

            {this.state.axes.filter( axe => axe.ao === this.state.selectedAo)
            .map((oneAxe) => { 
            return <option key={oneAxe.value} value={oneAxe.value}>{oneAxe.display}</option>})}

          </select>
        </div>
        <div>
          <h3>Choisir un critère</h3>
          <select value={this.state.selectedCritere} 
            onChange={(e) => this.setState({selectedCritere: e.target.value})}>
            
            {this.state.criteres.filter( critere => critere.axe === this.state.selectedAxes)
            .map((oneCritere) => { 
            return <option key={oneCritere.value} value={oneCritere.value}>{oneCritere.display}</option>})}

          </select>
        </div>
        <div>
          <h3>Choisir un candidat</h3>
          <select value={this.state.selectedCandidat} 
            onChange={(e) => this.setState({selectedCandidat: e.target.value})}> {/*appeler ici la fonction qui prend l'ao sélectionné */}

            {this.state.candidats.filter( candidat => candidat.ao === this.state.selectedAo)
            .map((oneCandidat) => { 
            return <option key={oneCandidat.value} value={oneCandidat.value}>{oneCandidat.display}</option>})}

          </select>
        </div>
        
        <div>
          <h3>Note :</h3>
          
        </div>

        <div>
          { this.state.commentaires
          &&
          this.state.commentaires.filter( commentaire => commentaire.critere === this.state.selectedCritere && commentaire.candidat === this.state.selectedCandidat)
          .map((oneCommentaire) => {
              return(
                  <div key={ oneCommentaire.value } value={oneCommentaire.value}>
                  {/* ... make each axe's title a link that goes to the axes details page */}
                      <Link to={`/commentaires/${oneCommentaire.value}`}> 
                          { oneCommentaire.display }
                      </Link>
                      </div>
              )
              
          }) }
        </div>
        {/* Edit commentaire */}
        {/* Add commentaire */}
      </div>
    )
  }
}

export default Analyse;