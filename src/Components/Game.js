import React from "react";
import "./Game.css";
import { useSelector } from "react-redux";
import Monster from "./Monster";
import PlayerList from "./PlayerList";
import GameOver from "./GameOver";

const Game = () => {
  const isGameOver = useSelector((state) => state.gameOver);

  return (
    <div className='Game'>
      {isGameOver ? (
        <GameOver />
      ) : (
        <>
          <Monster />
          <br></br>
          <section className='container-fluid'>
            <PlayerList />
          </section>
        </>
      )}
    </div>
  );
};

export default Game;
