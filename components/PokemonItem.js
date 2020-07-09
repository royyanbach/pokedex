import React, { Component } from "react";

export default class PokemonItem extends Component {
  constructor(props) {
    super(props);

    const pokemonId = this.props.pokemonDetail.url.replace(/\/$/, '').split('/').pop();
    const backgroundUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    this.pokemonId = pokemonId;
    this.style = {
      backgroundImage: `url(${backgroundUrl})`
    }
  }

  render() {
    return(
      <li className="pokemon-item-wrapper" style={ this.style } onClick={ () => this.props.onSelectPokemon(this.pokemonId) }>
        { this.props.pokemonDetail.name }
      </li>
    );
  }
}
