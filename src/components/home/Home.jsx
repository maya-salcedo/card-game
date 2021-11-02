import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GameWrapper from './Styles';

export default function Home() {
  const [deckId, setDeckId] = useState();
  const [remainingCard, setRemainingCard] = useState(null);
  const [disable, setDisable] = useState(true);

  const [computerScore, setComputerScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [players, setPlayers] = useState({
    computer: 0,
    player: 0,
  });
  const { computer, player } = players;

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

  const handleNewDeck = async () => {
    setDisable(false);
    setRemainingCard(52);
    const { data } = await axios.get(
      'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    );
    setDeckId(data?.deck_id);
  };

  const handleDraw = async () => {
    const { data } = await axios.get(
      `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`
    );
    setPlayers({ computer: data?.cards[0], player: data?.cards[1] });
    setRemainingCard(data?.remaining);
    setDisable(data?.remaining < 1 && !disable);
  };

  useEffect(() => {
    const card1ValueIndex = valueOptions.indexOf(computer.value);
    const card2ValueIndex = valueOptions.indexOf(player.value);

    if (card1ValueIndex > card2ValueIndex) setComputerScore(computerScore + 1);
    if (card1ValueIndex < card2ValueIndex) setPlayerScore(playerScore + 1);
  }, [players]);

  return (
    <GameWrapper>
      <GameWrapper.Title>Card Game</GameWrapper.Title>
      <GameWrapper.TextSmall>
        Ace is the highest, 2 is the lowest
      </GameWrapper.TextSmall>
      {remainingCard && (
        <GameWrapper.TextMedium>
          Remaining Cards: <b>{remainingCard}</b>
        </GameWrapper.TextMedium>
      )}
      <GameWrapper.Button onClick={handleNewDeck} text="New Deck" />
      <GameWrapper.Field>
        <GameWrapper.ImageContainer>
          <div>
            <img
              src={computer?.image}
              alt={computer ? `${computer?.suit}-${computer?.value}` : ''}
            />
          </div>
          <p>
            Computer: <b>{computerScore}</b>
          </p>
        </GameWrapper.ImageContainer>
        <GameWrapper.ImageContainer>
          <div>
            <img
              src={player?.image}
              alt={player ? `${player?.suit}-${player?.value}` : ''}
            />
          </div>
          <p>
            You: <b>{playerScore}</b>
          </p>
        </GameWrapper.ImageContainer>
      </GameWrapper.Field>

      <GameWrapper.Button onClick={handleDraw} disabled={disable} text="Draw" />
    </GameWrapper>
  );
}
