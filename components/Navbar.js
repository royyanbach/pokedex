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
            <h1 className="hero">Pokedex</h1>
            { this.props.children }
          </div>
        </div>
      </nav>
    )
  }
}
