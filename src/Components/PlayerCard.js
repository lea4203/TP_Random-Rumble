import React, { useState } from "react";
import ButtonCapacity from "./ButtonCapacity";
import ProgressBar from "./ProgressBar";

const PlayerCard = ({ player }) => {
  const [isLarge, setIsLarge] = useState(true);

  return (
    <div className={`col-sm-3 card ${isLarge ? 'player-large' : ''}`} id={`joueur${player.id}`}>
      <div className='card-body text-center'>
        <img
          className={`player-image ${isLarge ? 'player-image-large' : ''}`}
          src={player.image ? require(`../assets/${player.image}`) : ''}
          alt={player.name}
        />

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
