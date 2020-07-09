import React, { Component } from "react";

import PokemonStatItem from './PokemonStatItem';

export default class PokemonDetailPopup extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props)
    return (
      <div className="pokemon-detail-overlay">
        <div className="pokemon-detail-popup">
          <h2 className="pokemon-detail-popup__name">{ this.props.pokemonDetail.species.name }</h2>
          <img className="pokemon-detail-popup__image" src={ this.props.pokemonDetail.sprites.front_default } />
          <img className="pokemon-detail-popup__image" src={ this.props.pokemonDetail.sprites.back_default } />
          {
            this.props.pokemonDetail.stats.map((statsDetail, idx) => <PokemonStatItem key={ idx } statsData={ statsDetail }/>)
          }
          <button className="pokemon-detail-popup__close" onClick={ this.props.onClosePopup }>Close</button>
        </div>
      </div>
    )
  }
}
