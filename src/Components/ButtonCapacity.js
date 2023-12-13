// Importez les bibliothèques nécessaires
import React from "react";
import { useDispatch } from "react-redux";

// Composant ButtonCapacity
const ButtonCapacity = ({ player, ability }) => {
  // Obtenez le dispatch de Redux
  const dispatch = useDispatch();

  // Fonction pour infliger des dégâts au monstre
  const hitMonster = (damage) => {
    dispatch({ type: "HIT_MONSTER", payload: { monsterDamage: damage } });
  };

  // Fonction pour infliger des dégâts au joueur et réduire la mana
  const hitPlayer = (damage) => {
    dispatch({
      type: "HIT_PLAYER",
      payload: { damage, playerId: player.id, manaReduction: ability.manaCost },
    });
  };

  // Fonction pour soigner le joueur
  const healPlayer = (heal) => {
    dispatch({
      type: "HEAL_PLAYER",
      payload: { healPlayer: { heal, id: player.id, manaCost: ability.manaCost, maxHealth: 100 } },
    });
  };

  // Fonction pour lancer une boule de feu
  const castFireBall = (damage, manaCost) => {
    dispatch({
      type: "FIRE_BALL",
      payload: { fireBall: { damage, id: player.id, manaCost } },
    });
  };

  // Fonction pour récupérer de la mana
  const manaPlayer = () => {
    dispatch({
      type: "MANA_PLAYER",
      payload: { manaPlayer: { mana: 30, id: player.id, manaCost: ability.manaCost } },
    });
  };

  // Fonction pour passer au tour suivant
  const nextTurn = () => {
    dispatch({ type: "NEXT_TURN" });
  };

  // Fonction pour gérer les capacités en fonction du type
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
      case "nextTurn":
        nextTurn();
        break;
      default:
        break;
    }
  };

  // Fonction pour obtenir la classe CSS en fonction du type de capacité
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

  // Rendu du composant ButtonCapacity
  return (
    <button
      type="button"
      onClick={handleCapacity}
      className={getButtonClassName()}
      disabled={false} // Vous pouvez ajuster cela en fonction de vos besoins
    >
      {ability.name}{" "}
      <i className={ability.type === "heal" ? "fas fa-heart" : "fas fa-bomb"}></i>{" "}
      {ability.type === "heal" ? `+${ability.heal}` : ability.damage}{" "}
      <i className="fas fa-fire-alt"></i> - {ability.manaCost} Mana
    </button>
  );
};

// Exportez le composant ButtonCapacity
export default ButtonCapacity;
