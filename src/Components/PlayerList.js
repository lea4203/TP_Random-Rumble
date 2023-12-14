import React from "react";
import PlayerCard from "./PlayerCard";
import { useSelector } from "react-redux";

const PlayerList = () => {
  const players = useSelector((state) => state.players);

  // Assurez-vous de définir onPlayerHit ici
  const onPlayerHit = (player) => {
    // Logique à exécuter lorsque le joueur est touché
    console.log("Player hit:", player);
  };

  const displayPlayers = () => {
    return Object.keys(players).map((key) => {
      return <PlayerCard key={players[key].id} player={players[key]} onPlayerHit={onPlayerHit} />;
    });
  };

  return <div className='row card-container'>{displayPlayers()}</div>;
};


export default PlayerList;
