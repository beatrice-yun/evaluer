import React from "react";
import { Component } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

class Analyse extends Component {
  constructor(props) {
  super(props);
  this.state = {
    ao: [],
    selectedAo: {},
    axes: [],
    selectedAxes: {},
    criteres: [],
    selectedCritere: {},
    candidats: [],
    selectedCandidat: {},
    commentaires: [],
    selectedCommentaire: {},
    title: "",
    description: "",
    page: "",
    boolean: "",
    critere: "",
    candidat: ""
  }
}

  componentDidMount () {
    
    fetch(`${process.env.REACT_APP_APIURL || ""}/api/ao`)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let aoFromAPI = data.map(oneAo => { return {value: oneAo._id, display: oneAo.title} })
      this.setState({ ao: [{value: '', display: ''}].concat(aoFromAPI) });
    }).catch(error => {
      console.log(error);
    });

    fetch(`${process.env.REACT_APP_APIURL || ""}/api/axes`)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let axeFromAPI = data.map(oneAxe => { return {value: oneAxe._id, display: oneAxe.title, ao: oneAxe.ao} })
      this.setState({ axes: [{value: '', display: '', ao: ''}].concat(axeFromAPI) });
    }).catch(error => {
      console.log(error);
    });

    fetch(`${process.env.REACT_APP_APIURL || ""}/api/criteres`)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let critereFromAPI = data.map(oneCritere => { return {value: oneCritere._id, display: oneCritere.title, axe: oneCritere.axe} })
      this.setState({ criteres: [{value: '', display: '', axe:''}].concat(critereFromAPI) });
    }).catch(error => {
      console.log(error);
    });

    fetch(`${process.env.REACT_APP_APIURL || ""}/api/candidats`)
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let candidatFromAPI = data.map(oneCandidat => { return {value: oneCandidat._id, display: oneCandidat.title, ao: oneCandidat.ao} })
      this.setState({ candidats: [{value: '', display: '', ao: ''}].concat(candidatFromAPI) });
    }).catch(error => {
      console.log(error);
    });

    fetch(`${process.env.REACT_APP_APIURL || ""}/api/commentaires`)
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

  // formulaire AddCommentaire
  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const description = this.state.description;
    const page = this.state.page;
    const boolean = this.state.boolean;
    const critere = this.state.critere;
    const candidat = this.state.candidat;
    axios.post(`${process.env.REACT_APP_APIURL || ""}/api/commentaires`, { title, description, page, boolean, critere, candidat })
    .then( () => {
        // this.props.getData();
        this.setState({title: "", description: "", page: "", boolean: "", critere: "", candidat: ""});
    })
    .catch( error => console.log(error) )
  }

  // formulaire AddCommentaire
  handleChange = (event) => {  
      const {name, value} = event.target;
      this.setState({[name]: value});
  }

  render () {
    return (
      <div>
        <h1>Evaluer les offres</h1>
        <div>
          <h3>Choisir un appel d'offres</h3>
          <select value={this.state.selectedAo.value} 
            onChange={(e) => this.setState({selectedAo: e.target.value})}>
            <option>Choisir un appel d'offres</option>
            {this.state.ao.map((oneAo) => { 
            return <option key={oneAo.value} value={oneAo.value}>{oneAo.display}</option>})}

          </select>
        </div>
        {/*<h3>Choisir un axe</h3>*/}
        <div>
        <h3>Choisir un axe</h3>
          <select value={this.state.selectedAxes} 
            onChange={(e) => this.setState({selectedAxes: e.target.value})}>
            <option>Choisir un axe</option>
            {this.state.axes.filter( axe => axe.ao === this.state.selectedAo)
            .map((oneAxe) => { 
            return <option key={oneAxe.value} value={oneAxe.value}>{oneAxe.display}</option>})}

          </select>
        </div>
        <div>
          <h3>Choisir un critère</h3>
          <select value={this.state.selectedCritere} 
            onChange={(e) => this.setState({selectedCritere: e.target.value})}>
            <option>Choisir un critère</option>
            {this.state.criteres.filter( critere => critere.axe === this.state.selectedAxes)
            .map((oneCritere) => { 
            return <option key={oneCritere.value} value={oneCritere.value}>{oneCritere.display}</option>})}

          </select>
        </div>
        <div>
          <h3>Choisir un candidat</h3>
          <select value={this.state.selectedCandidat} 
            onChange={(e) => this.setState({selectedCandidat: e.target.value})}> {/*appeler ici la fonction qui prend l'ao sélectionné */}
            <option>Choisir un candidat</option>
            {this.state.candidats.filter( candidat => candidat.ao === this.state.selectedAo)
            .map((oneCandidat) => { 
            return <option key={oneCandidat.value} value={oneCandidat.value}>{oneCandidat.display}</option>})}

          </select>
        </div>
        
        <div>
          <h3>Note :</h3>
          
        </div>

        <div>
          <h3>Liste des commentaires</h3>
          {this.state.commentaires.filter( commentaire => commentaire.critere === this.state.selectedCritere && commentaire.candidat === this.state.selectedCandidat)
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
        
        <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={this.state.title} onChange={ e => this.handleChange(e)}/>

          <label>Description:</label>
          <input type="text" name="description" value={this.state.description} onChange={ e => this.handleChange(e)}/>

          <label>Page:</label>
          <input type="text" name="page" value={this.state.page} onChange={ e => this.handleChange(e)}/>

          <label>Boolean:</label>
          <select value={this.state.bolean} name="boolean"
            onChange={e => this.handleChange(e)}>
            <option>Choisir une option</option>
            <option value="positif">Positif</option>
            <option value="negatif">Negatif</option>
          </select>

          <input type="text" name="boolean" value={this.state.boolean} onChange={ e => this.handleChange(e)}/>

          <input name="critere" value={this.state.selectedCritere} onChange={ e => this.handleChange(e)}/>

          <input name="candidat" value={this.state.selectedCandidat} onChange={ e => this.handleChange(e)}/>
          
          <input type="submit" value="Submit" />
        </form>
      </div>

        {/* Edit commentaire */}

      </div>
    )
  }
}

export default Analyse;