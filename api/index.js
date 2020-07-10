import { Pokedex } from 'pokeapi-js-wrapper';

const POKE_API = new Pokedex({
  cache: false,
});

export default {
  getAllTypes() {
    return POKE_API.getTypesList();
  },
  getAllPokemons(offset, limit) {
    return POKE_API.getPokemonsList({
      offset,
      limit,
    });
  },
  getAllPokemonsByType(type) {
    return POKE_API.getTypeByName(type);
  },
  getPokemonByName(name) {
    return POKE_API.getPokemonByName(name);
  },
}
