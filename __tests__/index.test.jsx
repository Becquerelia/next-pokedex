import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Home from '@/pages/index';
import { PokedexMock } from '../__mocks__/PokedexMock';


describe('Home', () => {

  beforeEach(() => {
    render(<Home pokedex={PokedexMock} />);
  });

  it('Home component should render correctly', () => {    
    const heading = screen.getByText(/kanto/i);
    expect(heading).toBeInTheDocument();
  });

  it('Should exist pokemon name in the card', () => {
    PokedexMock.forEach((eachPokemon) => {
      expect(screen.getByText(eachPokemon.name)).toBeInTheDocument();
    })    
  });  

  it('Should display pokemon image in the card', () => {
    const pokeImage = screen.getByRole('img');
    PokedexMock.forEach((eachPokemon) => {
      expect(pokeImage.getAttribute('alt')).toBe(eachPokemon.name);
    })       
  });

  it('Should display pokemon type in the card', () => {
    PokedexMock.forEach((eachPokemon) => {
      expect(eachPokemon).toHaveProperty('types');
      expect(eachPokemon.types).toHaveLength(1);
      expect(screen.getByText(eachPokemon.types[0].type.name)).toBeInTheDocument();
    })
  });

  it('Should redirect to pokemon details by clicking on it', () => {
    const pokeCard = screen.getByTestId('poke-test-link');
    expect(global.window.location.pathname).toContain(`/`) 
    PokedexMock.forEach(async (eachPokemon) => {
      userEvent.click(pokeCard);
      await waitFor(() => {
        expect(global.window.location.pathname).toContain(`/pokemon/${eachPokemon.name}`) 
        const heading = screen.getByText(/details/i);
        expect(heading).toBeInTheDocument();
      })         
    })
  });  

});