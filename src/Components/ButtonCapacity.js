import React from "react";
import { useDispatch } from "react-redux";
import { isCurrentPlayerAlive } from "../store/rootReducer";

const ButtonCapacity = ({ player, ability }) => {
  const dispatch = useDispatch();

  const hitMonster = (damage) => {
    dispatch({ type: "HIT_MONSTER", payload: { monsterDamage: damage } });
  };

  const hitPlayer = (damage) => {
    dispatch({
      type: "HIT_PLAYER",
      payload: { damage, playerId: player.id, manaReduction: ability.manaCost },
    });
  };

  const healPlayer = (heal) => {
    dispatch({
      type: "HEAL_PLAYER",
      payload: { healPlayer: { heal, id: player.id, manaCost: ability.manaCost, maxHealth: 100 } },
    });
  };

  const castFireBall = (damage, manaCost) => {
    dispatch({
      type: "FIRE_BALL",
      payload: { fireBall: { damage, id: player.id, manaCost } },
    });
  };

  const manaPlayer = () => {
    dispatch({
      type: "MANA_PLAYER",
      payload: { manaPlayer: { mana: 30, id: player.id, manaCost: ability.manaCost } },
    });
  };

  const nextTurn = () => {
    dispatch({ type: "NEXT_TURN" });
  };
  const handleCapacity = () => {
    switch (ability.type) {
      case "damage":
        if (player.pv > 0) {
          hitMonster(ability.damage);
        }
        hitPlayer(ability.damage);
        break;
      case "heal":
        healPlayer(ability.heal);
        break;
      case "fireBall":
        castFireBall(ability.damage, ability.manaCost);
        break;
      case "mana":
        manaPlayer();
        break;
      case "playerIsAlive":
        break;
      case "nextTurn":
        nextTurn();
        break;
      default:
        break;
    }
  };

  const getButtonClassName = () => {
    let className = "";
  
    switch (ability.type) {
      case "heal":
        className = "btn btn-danger m-1 btn-heal";
        break;
      case "damage":
        className = "btn btn-success m-1 btn-attack";
        break;
      case "fireBall":
        className = "btn btn-warning m-1 btn-fireball";
        break;
      case "mana":
        className = "btn btn-info m-1 btn-mana";
        break;
      default:
        className = "btn btn-secondary m-1";
    }
    return className;
  };

  return (
    <button
      type="button"
      onClick={handleCapacity}
      className={getButtonClassName()}
      disabled={player.pv <= 0}
    >
      {ability.name}{" "}
      <i className={ability.type === "heal" ? "fas fa-heart" : "fas fa-bomb"}></i>{" "}
      {ability.type === "heal" ? `+${ability.heal}` : ability.damage}{" "}
      <i className="fas fa-fire-alt"></i> - {ability.manaCost} Mana
    </button>
  );
};

export default ButtonCapacity;
