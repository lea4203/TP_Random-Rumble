import React from "react";
import { useDispatch } from "react-redux";

const ButtonCapacity = ({ player, ability }) => {
  const dispatch = useDispatch();
;
const hitMonster = () => {
  dispatch({ type: "HIT_MONSTER", payload: { monsterDamage: 10 } });
};

  const hitPlayer = () => {
    dispatch({
      type: "HIT_PLAYER",
      payload: { damage: ability.damage, playerId: player.id },
    });
  };

  const healPlayer = () => {
    dispatch({
      type: "HEAL_PLAYER",
      payload: {
        healPlayer: {
          heal: 10,
          id: player.id,
          manaCost: ability.manaCost,
          maxHealth: 100,
        },
      },
    });
  };

  const attackSpecial = () => {
    dispatch({
      type: "FIRE_BALL",
      payload: { fireBall: { damage: 20, id: player.id, manaCost: ability.manaCost } },
    });
  };
   const manaPlayer = () => {
    dispatch({
      type: "MANA_PLAYER",
      payload: {
        manaPlayer: {
          mana: 10,
          id: player.id,
          manaCost: ability.manaCost,
        },
      },
    });
  };

  
  const handleCapacity = () => {
    switch (ability.type) {
      case "damage":
        // Vérifiez si le joueur a des points de vie avant de frapper le monstre
        if (player.pv > 0) {
          hitMonster();
        }
        hitPlayer();
        break;
      case "heal":
        healPlayer();
        break;
      case "fireBall":
        // Vérifiez si le joueur a suffisamment de mana avant de lancer la boule de feu
        if (player.mana >= ability.manaCost) {
          attackSpecial();
          manaPlayer();
        } else {
          console.log("Mana insuffisant pour lancer la boule de feu.");
        }
        break;
      case "mana":
        manaPlayer();
        break;
      
      default:
        break;
    }
  };


  return (
    <button
      type="button"
      onClick={handleCapacity}
      className={`btn btn-success m-1 ${ability.type === "heal" ? "btn-heal" : "btn-attack"
        }`}
      disabled={false}
    >
      {ability.name}{" "}
      <i className={ability.type === "heal" ? "fas fa-heart" : "fas fa-bomb"}></i>{" "}
      {ability.type === "heal" ? `+${ability.heal}` : ability.damage}{" "}
      <i className="fas fa-fire-alt"></i> - {ability.manaCost} Mana
    </button>
  );
};


export default ButtonCapacity;
