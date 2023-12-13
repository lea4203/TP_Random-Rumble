
const initialState = {
  players: [
    {
      name: "Yugi Muto",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 1,
      image: 'img/muto.gif',
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
          name: "Attaque Special",
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
      name: "Seto Kaiba",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 2,
      image: 'img/kaiba.gif',
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
          name: "Attaque Special",
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
      name: "Yuya Sakaki",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 3,
      image: 'img/sakaki.gif',
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
          name: "Attaque Special",
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
      name: "Anzu Mazaki",
      pv: 100,
      pvMax: 100,
      mana: 30,
      manaMax: 30,
      id: 4,
      image: 'img/mazaki.gif',
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
          name: "Attaque Special",
          damage: 15,
          manaCost: 30,
          type: "fireBall"
        },
        {
          name: "Recuperation Mana",
          mana: +30,
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
  turn: 1,
  currentTurnPlayer: 1, // supposez que le premier joueur commence
};

function rootReducer(state = initialState, action) {
  const currentPlayerId = state.currentTurnPlayer;

  switch (action.type) {
    case "HIT_MONSTER":
      const { monsterDamage } = action.payload;
      return {
        ...state,
        monster: {
          ...state.monster,
          pv: Math.max(state.monster.pv - monsterDamage, 0),
        },
      };



    case "HIT_PLAYER":
      const { damage, playerId, manaReduction } = action.payload;
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.id === playerId) {
            return {
              ...player,
              pv: Math.max(player.pv - damage, 0),
              mana: Math.max(player.mana - manaReduction, 0),
            };
          }
          return player;
        }),
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
      const { fireBall } = action.payload;
      return {
        ...state,
        players: state.players.map((player) => {
          if (player.id === fireBall.id) {
            return {
              ...player,
              pv: Math.max(player.pv - fireBall.damage, 0),
              mana: Math.max(player.mana - fireBall.manaCost, 0),
            };
          }
          return player;
        }),
      };


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
      const resetPlayers = state.players.map(player => ({
        ...player,
        hasPerformedAction: false,
      }));

      return {
        ...state,
        turn: state.turn + 1,
        players: resetPlayers,
      };




    default:
      return state;
  }
}

export default rootReducer;
