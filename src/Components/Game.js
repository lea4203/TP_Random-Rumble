import React from "react";
import "./Game.css";
import Monster from "./Monster";
import PlayerList from "./PlayerList";
import { useDispatch, useSelector } from "react-redux";

const Game = () => {
  const dispatch = useDispatch();
  const turn = useSelector((state) => state.turn);

  const handleNextTurn = () => {
    dispatch({
      type: "NEXT_TURN",
    });
  }
  return (
    <div className='Game'>
      <Monster />
      <br></br>
      <section className='container-fluid'>
        <PlayerList />
      </section>
      <button className="btn btn-primary" onClick={handleNextTurn}>
        Next turn (Tour {turn})
      </button>
    </div>
  );
};

export default Game;
