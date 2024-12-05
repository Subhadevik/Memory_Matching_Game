import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Card from './components/Card';

const emojiList = ["🎲", "🍎", "🍌", "🍉", "🎮", "🌟", "🏆", "🎁"];

const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [theme, setTheme] = useState('dark'); // Dark theme by default
  const [gameWon, setGameWon] = useState(false); // State to track if game is won
  const [startTime, setStartTime] = useState(0); // Time when the game starts
  const [totalTime, setTotalTime] = useState(0); // Total time taken to win the game

  // Shuffle the cards when the game starts or resets
  const shuffleCards = () => {
    const shuffled = [...emojiList, ...emojiList]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji: emoji,
        flipped: false,
        matched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setGameWon(false);
    setStartTime(Date.now());
    setTotalTime(0);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  // Calculate score based on time
  const calculateScore = (matchTime) => {
    const scoreBonus = Math.max(100 - matchTime * 10, 50); // Score decreases with time but has a minimum of 50
    return Math.floor(scoreBonus);
  };

  const handleCardClick = (id) => {
    if (flippedCards.length === 2 || cards[id].flipped) return;

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);

    setFlippedCards((prevFlipped) => [...prevFlipped, id]);

    if (flippedCards.length === 1) {
      const firstCard = cards[flippedCards[0]];
      const secondCard = cards[id];

      if (firstCard.emoji === secondCard.emoji) {
        // Match found
        const matchTime = (Date.now() - startTime) / 1000; // Calculate time in seconds
        const bonus = calculateScore(matchTime);
        setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id]);
        setScore((prevScore) => prevScore + bonus); // Update the score
        setFlippedCards([]);
      } else {
        // No match, flip cards back
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstCard.id].flipped = false;
          resetCards[secondCard.id].flipped = false;
          setCards(resetCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  // Check if all cards are matched
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameWon(true);
      setTotalTime(((Date.now() - startTime) / 1000).toFixed(2)); // Calculate total time taken
    }
  }, [matchedCards, cards.length]);

  const resetGame = () => {
    shuffleCards();
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`game-container ${theme === 'dark' ? 'dark-theme' : 'light-theme'}`}>
      <h1>Memory Matching Game</h1>
      <div className="scoreboard">
        <p>Score: {score}</p>
        <p>Time: {(Date.now() - startTime) / 1000 < 0 ? 0 : ((Date.now() - startTime) / 1000).toFixed(2)}s</p>
      </div>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            emoji={card.emoji}
            flipped={card.flipped}
            matched={matchedCards.includes(card.id)}
            onClick={handleCardClick}
          />
        ))}
      </div>
      <button className="reset-button" onClick={resetGame}>Restart Game</button>
      <button className="theme-toggle-button" onClick={toggleTheme}>
        Toggle Theme
      </button>

      {/* Display Winning Message with Total Time */}
      {gameWon && (
        <div className={`winning-message ${theme === 'dark' ? 'dark-theme-message' : 'light-theme-message'}`}>
          You Won the Game in {totalTime} seconds!!!
        </div>
      )}
    </div>
  );
};

export default App;
