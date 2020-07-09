import React, { Component } from "react";

import PokemonItem from './PokemonItem';

export default class PokemonList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className="pokemon-list-wrapper">
        { this.props.pokemon.map(pokemonItem => <PokemonItem key={ pokemonItem.name } pokemonDetail={ pokemonItem } />) }
      </ul>
    )
  }
}
