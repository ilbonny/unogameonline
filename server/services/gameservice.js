const _ = require("lodash");
const utilsService = require("./utilsservice");
const playerService = require("./playerservice");
const cardDeskService = require("./carddeskservice");
const ruleService = require("./ruleservice");
const enumGame = require("../models/enum");
const messageService = require("./messagesevice");

const numCard = 7;
let games = [];

create = users => {
  const players = playerService.create(users);
  let game = {
    id: utilsService.generateQuickGuid(),
    players: players,
    currentPlayer: players[0],
    isReverse: false,
    drawPile: [],
    discardPile: [],
    currentTurn: {},
    message: ""
  };

  let cards = cardDeskService.create();
  cardDeskService.shuffle(cards);
  game.drawPile = cards;

  initialCarsToPlayer(game);
  addFirstDiscardPile(game);

  game.message =`${messageService.messages.startGame} ${game.currentPlayer.user.username}`;
  games.push(game);
  return game.id;
};

start = (gameId, userId) => {
  let game = _.find(games, game => {
    return game.id === gameId;
  });
  let player = _.find(game.players, player => {
    return player.user.id === userId;
  });

  let gameForUser = {
    currentPlayer: game.currentPlayer,
    discardPile: game.discardPile,
    players: [],
    currentTurn: game.currentTurn,
    message: game.message,
    isReverse: game.isReverse,
    isFadeUno: true
  };

  gameForUser.players.push(player);
  let playersOrder = _.sortBy(game.players, o => {
    return o.position;
  });
  let index = playersOrder.indexOf(player);

  for (let i = 1; i < playersOrder.length; i++) {
    let indexCurr = i + index;

    if (i + index >= playersOrder.length)
      indexCurr = indexCurr - playersOrder.length;

    let playerIndex = playersOrder[indexCurr];
    gameForUser.players.push(addPlayerWithCoverCards(playerIndex));
  }

  return gameForUser;
};

playerTurnExecute = turn => {
  let game = _.find(games, x => { return x.id == turn.gameId; });
  if (game == null) return;

  ruleService.apply(turn, game);
};

drawDeck = turn =>{
    let game = _.find(games, x => {
        return x.id == turn.gameId;
      });
    
    // let listDiscard = _.first(_.rest(game.discardPile,1),game.discardPile.length-1);
    // if(game.drawPile.length<5){
    //     listDiscard.forEach(element => {
    //         game.drawPile.push(element);   
    //     });
    //     game.drawPile = cardDeskService.shuffle(game.drawPile);         
    // }

    let card = game.drawPile[0];

    game.currentPlayer.hand.push(card);
    game.drawPile.splice(0,1);

    ruleService.setCurrentPlayer(game,1);
    game.message =`${messageService.messages.drawDeck} ${game.currentPlayer.user.username}`;
    return game;
}

addPlayerWithCoverCards = playerIndex => {
  let player = {
    position: playerIndex.position,
    user: playerIndex.user,
    hand: []
  };

  let countCards = playerIndex.hand.length;

  for (let j = 0; j < countCards; j++) {
    let cardCover = {
      value: "Cover",
      color: "Yellow",
      score: 0
    };

    player.hand.push(cardCover);
  }

  return player;
};

initialCarsToPlayer = game => {
  game.players.forEach(player => {
    for (let i = 0; i < numCard; i++) {
      const firstCard = game.drawPile.shift();
      player.hand.push(firstCard);
    }
  });
};

addFirstDiscardPile = game => {
  let find = _.find(game.drawPile, x => {
    return (
      x.score != enumGame.CardValue.Reverse &&
      x.score != enumGame.CardValue.Skip &&
      x.score != enumGame.CardValue.DrawTwo &&
      x.score != enumGame.CardValue.Wild &&
      x.score != enumGame.CardValue.DrawFour &&
      x.score != enumGame.CardValue.Cover
    );
  });

  game.discardPile.push(find);

  _.remove(game.drawPile, x => {
    return (
      x.value == find.value && x.score == find.score && x.color == find.color
    );
  });

  game.currentTurn = {
    card: game.discardPile[0]
  };
};

module.exports = { create, start, playerTurnExecute, drawDeck };
