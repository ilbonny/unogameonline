const _ = require("lodash");
const enumGame = require("../models/enum");
const messageService = require("./messagesevice");

apply = (turn, game) => {
  switch (turn.card.score) {
    case enumGame.CardValue.Reverse:
      reverseMatch(turn, game);
      break;
    case enumGame.CardValue.Skip:
      skipMatch(turn, game);
      break;
    case enumGame.CardValue.DrawTwo:
      drawTwoMatch(turn, game);
      break;
    case enumGame.CardValue.DrawFour:
      drawFourMatch(turn, game);
      break;
    case enumGame.CardValue.Wild:
      wildMatch(turn, game);
      break;
    default:
      normalMatch(turn, game);
      break;
  }
};

drawFourMatch = (turn, game) => {
  if (turn.card.score != enumGame.CardValue.DrawFour) return;

  if(turn.isRequestChallenge){
    removeCardValue(turn, game);
    removeToHandAndAddDiscard(turn, game);
    setCurrentPlayer(game, 1);
    game.message =`${messageService.messages.challengeRequest}`;   
    return;
  }  

  if(turn.isChallenge){
    let exist = isExistColorCardPrevPlayer(game, turn.card.color);
    if(exist){
      var currentIndex = game.players.indexOf(game.currentPlayer);
      addCardsToPlayer(game, 6, currentIndex);      
      setCurrentPlayer(game, 1);
      game.message =`${messageService.messages.drawFourFailed} ${turn.card.color} play ${game.currentPlayer.user.username}`;    
    }else{        
      addCardToPrevPlayer(game, 4);
      game.message =`${messageService.messages.drawFourSuccess} ${turn.card.color} play ${game.currentPlayer.user.username}`; 
    }
  }else{
    addCardToNextPlayer(game, 4);
    game.message =`${messageService.messages.drawFour} ${turn.card.color} play ${game.currentPlayer.user.username}`;
  }   
};

reverseMatch = (turn, game) => {
  if (turn.card.score != enumGame.CardValue.Reverse) return;

  if (
    game.currentTurn.card.score == enumGame.CardValue.Reverse ||
    turn.card.color == game.currentTurn.card.color
  ) {

    removeCardValueAndColor(turn, game);
    removeToHandAndAddDiscard(turn, game);

    game.players = _.reverse(game.players);
    game.isReverse = !game.isReverse;

    setCurrentPlayer(game, 1);
    game.message =`${messageService.messages.reverse} ${game.currentPlayer.user.username}`;
  }
};

skipMatch = (turn, game) => {
  if (turn.card.score != enumGame.CardValue.Skip) return;

  if (
    game.currentTurn.card.score == enumGame.CardValue.Skip ||
    turn.card.color == game.currentTurn.card.color
  ) {
    removeCardValueAndColor(turn, game);
    removeToHandAndAddDiscard(turn, game);
    setCurrentPlayer(game, 2);

    game.message =`${messageService.messages.skipTurn} ${game.currentPlayer.user.username}`;
  }
};

drawTwoMatch = (turn, game) => {
  if (turn.card.score != enumGame.CardValue.DrawTwo) return;

  if (
    game.currentTurn.card.score == enumGame.CardValue.DrawTwo ||
    turn.card.color == game.currentTurn.card.color
  ) {

    addCardToNextPlayer(game, 2);
    removeCardValueAndColor(turn, game);
    removeToHandAndAddDiscard(turn, game);
    setCurrentPlayer(game, 2);

    game.message =`${messageService.messages.drawTwo} ${game.currentPlayer.user.username}`;
  }
};

wildMatch = (turn, game) => {
  if (turn.card.score != enumGame.CardValue.Wild) return;

  removeCardValue(turn, game);
  removeToHandAndAddDiscard(turn, game);
  setCurrentPlayer(game, 1);

  game.message =`${messageService.messages.wild} ${turn.card.color} play ${game.currentPlayer.user.username}`;
};

normalMatch = (turn, game) => {
  if (
    (turn.card.color != game.currentTurn.card.color &&
      turn.card.value == game.currentTurn.card.value) ||
    turn.card.color == game.currentTurn.card.color
  ) {
    removeCardValueAndColor(turn, game);
    removeToHandAndAddDiscard(turn, game);
    setCurrentPlayer(game, 1);

    game.message =`${messageService.messages.playPlayer} ${game.currentPlayer.user.username}`;
  }
};

removeToHandAndAddDiscard = (turn, game) => {
  turn.card.playerDiscard = game.currentPlayer.position;

  game.discardPile.push(turn.card);
  game.currentTurn.card = turn.card;

  if (game.currentPlayer.hand.length == 1) game.isFadeUno = true;

  if (game.currentPlayer.hand.length == 0) game.playerWin = game.currentPlayer;
};

setCurrentPlayer = (game, next) => {
  var currentIndex = game.players.indexOf(game.currentPlayer);
  var move = currentIndex + next;
  var count = game.players.length - 1;

  var indexPlayer = move > count ? move - count - 1 : move;

  game.currentPlayer = game.players[indexPlayer];
};

addCardToNextPlayer = (game, numCard) => {
  var currentIndex = game.players.indexOf(game.currentPlayer);
  var indexPlayer =
    currentIndex + 1 > game.players.length - 1 ? 0 : currentIndex + 1;
  addCardsToPlayer(game, numCard, indexPlayer);
};

addCardToPrevPlayer = (game, numCard) => {
  var currentIndex = game.players.indexOf(game.currentPlayer);
  var indexPlayer =
    currentIndex -1 < 0 ? game.players.length - 1 : currentIndex -1;
  addCardsToPlayer(game, numCard, indexPlayer);
};

addCardsToPlayer = (game, numCard, indexPlayer) => {
  var player = game.players[indexPlayer];
  var cards = _.take(game.drawPile, numCard);

  cards.forEach(card => {
    player.hand.push(card);
  });

  game.drawPile.splice(0, numCard);
};

removeCardValue = (turn, game)=>{
  _.remove(game.currentPlayer.hand, x => {
    return (
      x.value == turn.card.value
    );
  });
}

removeCardValueAndColor = (turn, game)=>{
  _.remove(game.currentPlayer.hand, x => {
    return (
      x.value == turn.card.value &&
      x.score == turn.card.score &&
      x.color == turn.card.color
    );
  });
}

isExistColorCardPrevPlayer = (game, color) =>{
  var currentIndex = game.players.indexOf(game.currentPlayer);
  var indexPlayer = currentIndex -1 < 0 ? game.players.length - 1 : currentIndex - 1;
  var prevPlayer = game.players[indexPlayer];
   return _.find(prevPlayer.hand, (card)=> {return card.color === color });
}

module.exports = { apply,setCurrentPlayer };
