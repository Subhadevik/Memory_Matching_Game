import React from "react";

const Scoreboard = ({ score, onRestart }) => {
  return (
    <div className="scoreboard">
      <p>Score: {score}</p>
      <button onClick={onRestart}>Restart Game</button>
    </div>
  );
};

export default Scoreboard;
