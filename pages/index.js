import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

export default function Home({pokedex}) {

  console.log(pokedex);

  
  return (
    < div style={{margin: "50px"}} >
    <h1 style={{display:"flex", flexDirection: "row", justifyContent: "center", margin: "50px"}} >Kanto - Pokédex</h1>
      <ul className={styles.pokedexGrid} >
        {pokedex.map((eachPokemon, index) => {
          return (
            <li key={index}>
              <Link href={{ pathname: '/pokemon/[name]', query: {name: eachPokemon.name} }} ><a>
                <div className={`${styles.pokemonCard} ${eachPokemon.types[0].type.name}`} data-testid="poke-test-link" >
                 <h3>{eachPokemon.name}</h3>
                 <Image src={eachPokemon.image} alt={eachPokemon.name} width="100" height="100" />
                 <div className={styles.typesSection} >
                  {eachPokemon.types.map((eachType, index)=>{
                    return <p className={styles.type} key={index} >{eachType.type.name}</p>
                  })}
                 </div>
                </div>
              </a></Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const getPokemon = (pokedexNumber) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokedexNumber}`)
    .then(response => response.json())
    .then(data => data)    
  }

  const pokemonList = [];
  for (let i = 1; i <= 151 ; i++){
    let data = await getPokemon(i);
    pokemonList.push(data);
  } 

  const pokedex = pokemonList.map((eachPokemon) => {
    return ({
      id: eachPokemon.id,
      name: eachPokemon.name,
      image: eachPokemon.sprites.other.dream_world.front_default,
      types: eachPokemon.types
    })
  })

  return {
    props: {
      pokedex
    }
  }
};