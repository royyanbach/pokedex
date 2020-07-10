import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import renderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";

import PokemonItem from './PokemonItem';

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Render list with correctly', () => {
  const pokemonPreviewData = {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/'
  };

  const component = renderer.create(
    <PokemonItem pokemonPreviewData={ pokemonPreviewData }/>,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it('Handle click event', () => {
  const onSelectPokemon = jest.fn();
  const id = 1;
  const pokemonPreviewData = {
    name: 'bulbasaur',
    url: `https://pokeapi.co/api/v2/pokemon/${id}/`
  };

  act(() => {
    render(<PokemonItem pokemonPreviewData={ pokemonPreviewData } onSelectPokemon={ onSelectPokemon } />, container);
  });

  const renderedItem = document.querySelector('.pokemon-item-wrapper');

  act(() => {
    renderedItem.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });

  expect(onSelectPokemon).toHaveBeenCalledWith(id);
});

it('Observe it owns element if observer is given', () => {
  const observer = {
    observe: jest.fn(),
  };

  const pokemonPreviewData = {
    name: 'bulbasaur',
    url: 'https://pokeapi.co/api/v2/pokemon/1/'
  };
  
  act(() => {
    render(<PokemonItem pokemonPreviewData={ pokemonPreviewData } observer={ observer }/>, container);
  });

  expect(observer.observe).toHaveBeenCalled();
})
