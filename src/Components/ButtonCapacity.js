import React from "react";
import { useDispatch } from "react-redux";

const ButtonCapacity = ({ player, ability }) => {
  const dispatch = useDispatch();

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

  const nextTurn = () => {
    dispatch({ type: "NEXT_TURN" });
  };

  const handleCapacity = () => {
    switch (ability.type) {
      case "damage":
        // Check if the player has health points before hitting the monster
        if (player.pv > 0) {
          hitMonster();
        }
        hitPlayer();
        break;
      case "heal":
        healPlayer();
        break;
      case "fireBall":
        // Check if the player has enough mana before casting the fireball
        const updatedManaCost = Math.min(ability.manaCost, player.mana);
        if (player.mana >= updatedManaCost) {
          attackSpecial(updatedManaCost);
          manaPlayer();
        } else {
          console.log("Not enough mana to cast the fireball.");
        }
        break;
      case "mana":
        manaPlayer();
        break;
      case "nextTurn":
        nextTurn();
        break;
      default:
        break;
    }
  };

  const getButtonClassName = () => {
    switch (ability.type) {
      case "heal":
        return "btn btn-danger m-1 btn-heal"; // Red for healing
      case "damage":
        return "btn btn-success m-1 btn-attack"; // Green for damage
      case "fireBall":
        return "btn btn-warning m-1 btn-fireball";
      case "mana":
        return "btn btn-info m-1 btn-mana";
      default:
        return "btn btn-secondary m-1";
    }
  };
  

  return (
    <button
      type="button"
      onClick={handleCapacity}
      className={getButtonClassName()}
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
