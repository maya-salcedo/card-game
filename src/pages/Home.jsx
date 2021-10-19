import React, { useState } from 'react';

export default function Home() {
  const [deckId, setDeckId] = useState();
  const [remainingCard, setRemainingCard] = useState();
  const [player1, setPlayer1] = useState({});
  const [player2, setPlayer2] = useState({});
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [disable, setDisable] = useState(false);

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
      return 'card 1 wins';
    } else if (card1ValueIndex < card2ValueIndex) {
      return 'card 2 wins';
    } else {
      return "it's a tie";
    }
  };

  const handleClick = () => {
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDeckId(data?.deck_id);
        console.log(data?.remaining);
        setRemainingCard(data?.remainingCard);
      });
  };

  const handleDraw = () => {
    fetch(
      `https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`
    )
      .then((response) => response.json())
      .then((data) => {
        setPlayer1(data?.cards[0]);
        setPlayer2(data?.cards[1]);
        setRemainingCard(data?.remaining);
        setDisable(data?.remaining < 1 && !disable);
      });
  };

  return (
    <div>
      <button onClick={() => handleClick()}>New Deck, Please</button>
      <button onClick={() => handleDraw()} disabled={disable}>
        Draw
      </button>
      <img src={player1?.image} alt={`${player1?.suit}-${player1?.value}`} />
      <p>{player1Score}</p>
      <img src={player2?.image} alt={`${player2?.suit}-${player2?.value}`} />
      <h2>{identifiesWinner(player1, player2)}</h2>
      <h3>Remaing Cards: {remainingCard}</h3>
    </div>
  );
}
