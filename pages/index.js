import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';

export default function Home({pokedex}) {

  console.log(pokedex);

  
  return (
    <>
      <ul className={styles.grid} >
        {pokedex.map((eachPokemon, index) => {
          return (
            <li style={{listStyle:"none"}} key={index}>
              <Link href="" ><a>
                <div className={styles.card}>
                 <h3>{eachPokemon.name}</h3>
                 <div className={styles.types} >
                  {eachPokemon.types.map((eachType, index)=>{
                    return <p key={index} >{eachType.type.name}</p>
                  })}
                 </div>
                </div>
              </a></Link>
            </li>
          );
        })}
      </ul>
    </>
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

// export async function getServerSideProps() {
//   const getPokemon = () => {
//     return fetch(`https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`)
//     .then(response => response.json())
//     .then(data => data)    
//   }

//   const pokedex = await getPokemon();
//   return {
//     props: {
//       pokedex
//     }
//   }
// };
