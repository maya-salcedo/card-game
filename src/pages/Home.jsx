import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [deckId, setDeckId] = useState();
  const [remainingCard, setRemainingCard] = useState(null);
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [disable, setDisable] = useState(false);

  const identifiesWinner = (card1, card2) => {
    console.log(card1.value);
    console.log(card2.value);
    const valueOptions = [
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'JACK',
      'QUEEN',
      'KING',
      'ACE',
    ];

    const card1ValueIndex = valueOptions.indexOf(card1.value);
    const card2ValueIndex = valueOptions.indexOf(card2.value);

    return card1ValueIndex > card2ValueIndex
      ? setPlayer1Score(player1Score + 1)
      : card1ValueIndex < card2ValueIndex
      ? setPlayer2Score(player2Score + 1)
      : ' ';
  };

  async function handleClick() {
    setDisable(false);
    setRemainingCard(52);
    const { data } = await axios.get(
      'https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/'
    );
    setDeckId(data?.deck_id);
  }

  const handleDraw = async () => {
    const { data } = await axios.get(
      `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    );
    setPlayer1(data?.cards[0]);
    setPlayer2(data?.cards[1]);
    setRemainingCard(data?.remaining);
    setDisable(data?.remaining < 40 && !disable);
  };

  const drawCard = () => {
    handleDraw();
    identifiesWinner(player1, player2);
    console.log(player1Score);
    console.log(player2Score);
  };

  return (
    <div>
      <button onClick={() => handleClick()}>New Deck, Please</button>
      <button onClick={drawCard} disabled={disable}>
        Draw
      </button>
      <img src={player1?.image} alt={`${player1?.suit}-${player1?.value}`} />
      <img src={player2?.image} alt={`${player2?.suit}-${player2?.value}`} />
      <h2>HEllo</h2>
      <h3>Remaining Cards: {remainingCard}</h3>
      <p>Player 1 Score: {player1Score}</p>
      <p>Player 2 Score: {player2Score}</p>
    </div>
  );
}
