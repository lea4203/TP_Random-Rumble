// PlayerList.jsx

import React from "react";
import PlayerCard from "./PlayerCard";
import { useSelector } from "react-redux";

const PlayerList = () => {
  const players = useSelector((state) => state.players);
  console.log(players);
  const displayPlayers = () => {
    return Object.keys(players).map((key) => {
      return <PlayerCard key={players[key].id} player={players[key]} />;
    });
  };
  return <div className='row card-container'>{displayPlayers()}</div>;
};

export default PlayerList;
