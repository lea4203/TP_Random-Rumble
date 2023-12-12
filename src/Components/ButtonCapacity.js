import React from "react";
import { useDispatch } from "react-redux";

const ButtonCapacity = ({ player, ability }) => {
  const dispatch = useDispatch();

  const hitMonster = (damage) => {
    dispatch({ type: "HIT_MONSTER", payload: { monsterDamage: damage } });
  };

  const hitPlayer = (damage) => {
    dispatch({ type: "HIT_PLAYER", payload: { damage, playerId: player.id } });
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
      payload: { manaPlayer: { mana:   30, id: player.id, manaCost: ability.manaCost } },
    });
  };
  

  const nextTurn = () => {
    dispatch({ type: "NEXT_TURN" });
  };

  const playerDead = () => {
    dispatch({ type: "PLAYER_DEAD", payload: { playerId: player.id } });
  }
  const closePlayerDeadModal = () => ({
    type: "CLOSE_PLAYER_DEAD_MODAL",
  });
  
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
        // Vérifie si le joueur a assez de mana pour lancer la fireball
        const updatedManaCostFireBall = Math.min(ability.manaCost, player.mana);
        if (player.mana >= updatedManaCostFireBall) {
          castFireBall(ability.damage, updatedManaCostFireBall);
          // Réduit le mana après avoir vérifié que le joueur a assez de mana
          manaPlayer(updatedManaCostFireBall);
        } else {
          console.log("Not enough mana to cast the fireball.");
        }
        break;
      case "mana":
        manaPlayer(); // Peut-être que vous devez ajuster cela en fonction de vos besoins
        break;
      case "nextTurn":
        nextTurn();
        break;
      case "playerDead":
        playerDead();
        break;
      case "closePlayerDeadModal":
        closePlayerDeadModal();
        break;
      default:
        break;
    }
  };
  

  const getButtonClassName = () => {
    switch (ability.type) {
      case "heal":
        return "btn btn-danger m-1 btn-heal";
      case "damage":
        return "btn btn-success m-1 btn-attack";
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