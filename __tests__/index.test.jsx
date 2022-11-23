import { render, screen } from '@testing-library/react'
import Home from '@/pages/index'
import 'mutationobserver-shim';


describe('Home', () => {
  it('renders', () => {
    const pokedex = [{
      id: 1,
      name: 'squirtle',
      types: [{type: {name: 'water'}}],
      image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/7.svg'
    }]
    render(<Home pokedex={pokedex} />)

    const heading = screen.getByText(/kanto/i)

    expect(heading).toBeInTheDocument()
  })
})