'use client';
import React, {useState, useEffect} from "react";
import Card from "@/components/Card";
import pageStyles from "@/components/card.module.css";
import Navbar from "@/components/NavBar";

export default function Home() {
  const [cardsData, setCardsData] = useState([])
  const [count, setCount] = useState(0);
  const [highestScore, setHighestScore] = useState(0)
  const [clickedCards, setClickedCards] = useState(new Set());


  function shuffleArray(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
  }
  

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


  const onClick = (id) => {
    if (clickedCards.has(id)) {
      // clicked same card twice → reset
      if (count > highestScore) setHighestScore(count);
      setCount(0);
      setClickedCards(new Set());
    } else {
      // new card clicked → increment count, add to clickedCards
      const newClicked = new Set(clickedCards);
      newClicked.add(id);
      setClickedCards(newClicked);
      const newCount = count + 1;
      setCount(newCount);
      if (newCount > highestScore) setHighestScore(newCount);
    }

    // shuffle cards every click
    setCardsData(prevCards => shuffleArray(prevCards));
  };
  
  return (
    // <div className={pageStyles.card-Container}>
    <div>
        <Navbar  count={count} highestScore={highestScore}/>
        <div className={pageStyles['card-container']}>
          {cardsData.map((item) => (
          <Card
            onClick={() => onClick(item.id)}
            key={item.id}
            imageUrl={item.imageUrl}
            title={item.name}
          />
          ))}
        </div>
    </div>
  );
}
