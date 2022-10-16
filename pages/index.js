import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from "react"

export default function Home({pokedex}) {
  console.log('data es:', pokedex)
  const [pokemon, setPokemon] = useState([])
  return (
    <></>
  );
}

export async function getServerSideProps() {
  const getPokemon = (pokedexNumber) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokedexNumber}`)
    .then(response => response.json())
    .then(data => data)    
  }

  const pokedex = [];
  for (let i = 1; i <= 151 ; i++){
    let data = await getPokemon(i);
    pokedex.push(data);
  } 
  return {
    props: {
      pokedex
    }
  }
};
