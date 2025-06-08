'use client';
import React, {useState, useEffect} from "react";
import Card from "@/components/Card";
import pageStyles from "@/components/card.module.css";
import Navbar from "@/components/NavBar";

export default function Home() {
  const [cardsData, setCardsData] = useState([])
  const [count, setCount] = useState(0);

  useEffect(() => {

    async function getData() {
      try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
        console.log('Fetch status:', res.status);
        const data = await res.json();
        console.log('Data results:', data.results);
    
        const detailedPromises = data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            id: details.id,
            name: details.name,
            imageUrl: details.sprites.front_default,
          };
        });
        const detailedData = await Promise.all(detailedPromises);
        console.log('Detailed data:', detailedData);
    
        setCardsData(detailedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }    
    getData();
  }, [])

  if (cardsData.length === 0)
    return <div>Loading ....</div>


  const onClick = () => {
    setCount(prev => prev + 1) 
  }
  
  return (
    // <div className={pageStyles.card-Container}>
    <div className="">
        <Navbar  count={count}/>
        <div className={pageStyles['card-container']}>
          {cardsData.map((item) => (
          <Card
            onClick={onClick}
            key={item.id}
            imageUrl={item.imageUrl}
            title={item.name}
          />
          ))}
        </div>
    </div>
  );
}
