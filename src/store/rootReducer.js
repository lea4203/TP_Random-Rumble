const initialState = {
  players: [
    {
      name: "John",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 1,
      abilities: [
        {
          name:
            "Frapper",
          damage: 10,
          manaCost: 15,
          type: "damage"
        },
        {
          name: "Guérir",
          heal: +10,
          manaCost: 10,
          type: "heal"
        },
        {
          name: "Lancer Attaque Special",
          damage: 15,
          manaCost: 30,
          type: "fireBall"
        },
        {
          name: "Recuperation Mana",
          mana: 30,
          manaCost: 30, // Utilisez un nombre négatif pour déduire le coût de mana
          type: "mana"
        }

      ],
    },
    {
      name: "Jack",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 2,
      abilities: [
        {
          name:
            "Frapper",
          damage: 10,
          manaCost: 15,
          type: "damage"
        },
        {
          name: "Guérir",
          heal: +10,
          manaCost: 10,
          type: "heal"
        },
        {
          name: "Lancer Attaque Special",
          damage: 15,
          manaCost: 30,
          type: "fireBall"
        },
        {
          name: "Recuperation Mana",
          mana: 30,
          manaCost: 30, // Utilisez un nombre négatif pour déduire le coût de mana
          type: "mana"
        }

      ],
    },
    {
      name: "Jessy",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 3,
      abilities: [
        {
          name:
            "Frapper",
          damage: 10,
          manaCost: 15,
          type: "damage"
        },
        {
          name: "Guérir",
          heal: +10,
          manaCost: 10,
          type: "heal"
        },
        {
          name: "Lancer Attaque Special",
          damage: 15,
          manaCost: 30,
          type: "fireBall"
        },
        {
          name: "Recuperation Mana",
          mana: 30,
          manaCost: 30, // Utilisez un nombre négatif pour déduire le coût de mana
          type: "mana"
        }

      ],
    },
    {
      name: "Jenny",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 4,
      abilities: [
        {
          name:
            "Frapper",
          damage: 10,
          manaCost: 15,
          type: "damage"
        },
        {
          name: "Guérir",
          heal: +10,
          manaCost: 10,
          type: "heal"
        },
        {
          name: "Lancer Attaque Special",
          damage: 15,
          manaCost: 30,
          type: "fireBall"
        },
        {
          name: "Recuperation Mana",
          mana: 30,
          manaCost: 30, // Utilisez un nombre négatif pour déduire le coût de mana
          type: "mana"
        }

      ],
    },
  ],

  monster: {
    pv: 800,
    pvMax: 800,
  },
  currentTurnPlayer: 1,
};

function rootReducer(state = initialState, action) {
  const currentPlayerId = state.currentTurnPlayer;

  switch (action.type) {
    case "HIT_MONSTER":
      const { monsterDamage } = action.payload; // Renommez la variable
      return {
        ...state,
        monster: {
          ...state.monster,
          pv: Math.max(state.monster.pv - monsterDamage, 0),
        },
      };

    case "HIT_PLAYER":
      const { damage, playerId } = action.payload;
      const updatedPlayers = state.players.map((player) =>
        player.id === playerId
          ? {
            ...player,
            pv: Math.max(Math.min(player.pv - damage, player.pvMax), 0),
            mana: Math.max(player.mana - player.abilities.find(a => a.type === 'damage').manaCost, 0),
          }
          : player
      );

      return {
        ...state,
        players: updatedPlayers,
      };

    case "HEAL_PLAYER":
      const { healPlayer } = action.payload;
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.id === healPlayer.id) {
            return {
              ...player,
              pv: Math.min(player.pv + healPlayer.heal, player.pvMax),
            };
          }
          return player;
        }),
      };

    case "FIRE_BALL":
      const currentPlayer = state.players.find(player => player.id === currentPlayerId);

      if (currentPlayer && !currentPlayer.hasPerformedAction) {
        const { fireBall } = action.payload;
        const updatedPlayers = state.players.map(player =>
          player.id === fireBall.id
            ? {
              ...player,
              pv: Math.max(player.pv - fireBall.damage, 0),
              mana: Math.max(player.mana - fireBall.manaCost, 0),
              hasPerformedAction: true,
            }
            : player
        );

        return {
          ...state,
          players: updatedPlayers,
          monster: {
            ...state.monster,
            pv: Math.max(state.monster.pv - fireBall.damage, 0),
          },
        };
      }
      return state;

    case "MANA_PLAYER":
      const { manaPlayer } = action.payload;
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.id === manaPlayer.id) {
            return {
              ...player,
              mana: Math.min(player.mana + manaPlayer.mana, player.manaMax),
            };
          }
          return player;
        }),
      };

    case "NEXT_TURN":
      const nextTurnPlayerId = (currentPlayerId % state.players.length) + 1;

      const resetPlayers = state.players.map((player) => ({
        ...player,
        hasPerformedAction: false,
      }));

      return {
        ...state,
        players: resetPlayers,
        currentTurnPlayer: nextTurnPlayerId,
      };

    default:
      return state;
  }
}

export default rootReducer;
