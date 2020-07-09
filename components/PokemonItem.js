import React, { Component } from "react";

export default class PokemonList extends Component {
  constructor(props) {
    super(props);

    const pokemonId = this.props.pokemonDetail.url.replace(/\/$/, '').split('/').pop();
    const backgroundUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    this.style = {
      backgroundImage: `url(${backgroundUrl})`
    }
  }

  render() {
    return(
      <li key={ this.props.pokemonDetail.name } className="pokemon-item-wrapper" style={ this.style }>
        { this.props.pokemonDetail.name }
      </li>
    );
  }
}
