import React, { Component } from "react";

export default class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <nav className="navbar">
        <div className="container">
          <div className="navbar__content">
            <div>
              <h1 className="hero">Pokedex</h1>
              <p className="total-information">Showing <strong>{ this.props.totalDisplayedPokemon }</strong> from total of <strong>{ this.props.totalPokemon }</strong> pokemons</p>
            </div>
            { this.props.children }
          </div>
        </div>
      </nav>
    )
  }
}
