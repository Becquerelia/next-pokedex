import Image from 'next/image';

function Pokemon({pokemonDetails}) {
  return (
    <div>
        <h1>Details about: {pokemonDetails.name}</h1>
        <Image src={pokemonDetails.sprites.other.dream_world.front_default} alt={pokemonDetails.name} width="300" height="300" />
    </div>
  )
}

export default Pokemon;

export async function getServerSideProps(params) {

    const {name}= params.query;
    const getPokemonDetails = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const pokemonDetails = await getPokemonDetails.json()  
  
    return {
      props: {
        pokemonDetails
      }
    }
  };