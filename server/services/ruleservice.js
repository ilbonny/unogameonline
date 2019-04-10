const _ = require('lodash');

apply = (turn, game) => {
    normalMatch(turn,game);
};

normalMatch = (turn, game) => {
  if ( (turn.card.color != game.currentTurn.card.color && turn.card.value == game.currentTurn.card.value) 
        ||turn.card.color == game.currentTurn.card.color) {

    removeToHandAndAddDiscard(turn, game);
    setCurrentPlayer(game, 1);

    // game.Message = MessageService.Show(
    //   MessageService.PlayPlayer,
    //   game.CurrentPlayer.User.UserName
    // );
  }
};

removeToHandAndAddDiscard = (turn, game) =>
{
     _.remove(game.currentPlayer.hand, (x)=>{
        return x.value == turn.card.value && x.score == turn.card.score && x.color == turn.card.color
     });

    turn.card.playerDiscard = game.currentPlayer.position;

    game.discardPile.push(turn.card);
    game.currentTurn.card = turn.card;

    if (game.currentPlayer.hand.Count == 1)
        game.isFadeUno = true;

    if (game.currentPlayer.hand.Count == 0)
        game.playerWin = game.currentPlayer;
}

setCurrentPlayer = (game, next) =>
{
    var currentIndex = game.players.indexOf(game.currentPlayer);
    var move = currentIndex + next;
    var count = game.players.length - 1;

    var indexPlayer = move > count ? move-count-1 : move;

    game.currentPlayer = game.players[indexPlayer];
}


module.exports = { apply };
