// Importez les bibliothèques nécessaires
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { isCurrentPlayerAlive } from "../store/rootReducer";

// Composant ButtonCapacity
const ButtonCapacity = ({ player, ability }) => {
  // Obtenez le dispatch de Redux
  const dispatch = useDispatch();

  // Obtenez l'état global
  const gameState = useSelector((state) => state);
  const isAlive = useSelector((state) => isCurrentPlayerAlive(state));

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

  const handleCapacity = () => {
    const isAlive = isCurrentPlayerAlive(gameState);
    if (isAlive) {
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
          // Notez que je n'ai pas ajouté de fonction pour "playerIsAlive" car cela ne semble pas nécessaire ici
          break;
        case "nextTurn":
          nextTurn();
          break;
        default:
          break;
      }
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
    
    // Ajoutez la classe "dead" si le joueur est mort
    if (player.pv <= 0) {
      className += " dead"; // Ajoutez la classe dead pour indiquer que le joueur est mort
    }
  
    // Ajoutez la classe floue si le joueur est mort
    if (!isAlive) {
      className += " blurred"; // Ajoutez la classe blurred pour appliquer le flou
    }
    
    console.log("Button class:", className); // Vérifiez la classe dans la console
    
    return className;
  };
  

  return (
    <button
      type="button"
      onClick={handleCapacity}
      className={getButtonClassName()}
      disabled={!isAlive}
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
