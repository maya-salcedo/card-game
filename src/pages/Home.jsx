import React, { useState } from 'react';

let player1Score = 0;
let player2Score = 0;

const identifiesWinner = (card1, card2) => {
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

  if (card1ValueIndex > card2ValueIndex) {
    player1Score = player1Score + 1;
    return 'card 1 wins';
  } else if (card1ValueIndex < card2ValueIndex) {
    player2Score = player2Score + 1;
    return 'card 2 wins';
  } else {
    return "it's a tie";
  }
};

export default function Home() {
  const [deckId, setDeckId] = useState();
  const [remainingCard, setRemainingCard] = useState(null);
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});

  const [disable, setDisable] = useState(false);

  const handleClick = async () => {
    const response = await fetch(
      'https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/'
    );
    const data = await response.json();
    setDeckId(data?.deck_id);
    setRemainingCard(data?.remainingCard);
  };

  const handleDraw = async () => {
    const response = await fetch(
      `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    );
    const data = await response.json();
    setPlayer1(data?.cards[0]);
    setPlayer2(data?.cards[1]);
    setRemainingCard(data?.remaining);
    setDisable(data?.remaining < 40 && !disable);
  };

  const results = identifiesWinner(player1, player2);

  return (
    <div>
      <button onClick={() => handleClick()}>New Deck, Please</button>
      <button onClick={() => handleDraw()} disabled={disable}>
        Draw
      </button>
      <img src={player1?.image} alt={`${player1?.suit}-${player1?.value}`} />

      <img src={player2?.image} alt={`${player2?.suit}-${player2?.value}`} />
      <h2>{results}</h2>
      <h3>Remaing Cards: {remainingCard}</h3>
      <p>Player 1 Score: {player1Score}</p>
      <p>Player 2 Score: {player2Score}</p>
      {console.log(player1Score)}
    </div>
  );
}
