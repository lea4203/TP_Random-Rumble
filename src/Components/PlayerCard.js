import React from "react";
import ButtonCapacity from "./ButtonCapacity";
import ProgressBar from "./ProgressBar";
import "./Game.css";

const PlayerCard = ({ player }) => {
  return (
    <div key={player.id} className='col-sm-3 card ' id={`joueur${player.id}`}>
      <div className='card-body text-center'>
        <h5 className='card-title'>{player.name}</h5>
        <ProgressBar
          pv={player.pv}
          pvMax={player.pvMax}
          faType='fa-heart'
          barName=' : pv '
          bgType='bg-danger'
        />
        <ProgressBar
          pv={player.mana}
          pvMax={player.manaMax}
          faType='fa-fire-alt'
          barName=' : mana '
        />
        <div className='row'>
          {player.abilities.map((ability, index) => (
            <ButtonCapacity key={index} player={player} ability={ability} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
