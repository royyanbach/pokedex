import React, { Component, createRef } from "react";

export default class PokemonItem extends Component {
  constructor(props) {
    super(props);

    const pokemonId = this.props.pokemonDetail.url.replace(/\/$/, '').split('/').pop();
    const backgroundUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

    this.pokemonId = pokemonId;
    this.el = createRef();
    this.style = {
      backgroundImage: `url(${backgroundUrl})`
    }
  }

  componentDidMount() {
    if (this.props.observer) {
      this.props.observer.observe(this.el.current);
    }
  }

  componentDidUpdate() {
    if (this.props.observer) {
      this.props.observer.observe(this.el.current);
    }
  }

  render() {
    return(
      <li className="pokemon-item-wrapper" style={ this.style } onClick={ () => this.props.onSelectPokemon(this.pokemonId) } ref={ this.el }>
        { this.props.pokemonDetail.name }
      </li>
    );
  }
}
