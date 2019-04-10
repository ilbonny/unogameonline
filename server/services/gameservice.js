const _ = require('lodash');
const utilsService = require('./utilsservice');
const playerService = require('./playerservice');
const cardDeskService = require('./carddeskservice');
const ruleService = require('./ruleservice');
const enumGame = require('../models/enum');

const numCard = 7;
let games = []

create = (users)=>{
    const players = playerService.create(users);
    let game  = {
        id : utilsService.generateQuickGuid(),
        players : players,
        currentPlayer : players[0],
        isReverse : false,
        drawPile : [],
        discardPile : [],
        currentTurn : {},
        message : ''
    }

    let cards = cardDeskService.create();
    cardDeskService.shuffle(cards);    
    game.drawPile = cards;

    initialCarsToPlayer(game);
    addFirstDiscardPile(game);

    //game.Message = MessageService.Show(MessageService.StartGame, game.CurrentPlayer.User.UserName);
    games.push(game);
    return game.id;
}

start = (gameId, userId) =>{
    let game = _.find(games, (game)=>{return game.id === gameId});
    let player = _.find(game.players, (player) =>{ return player.user.id === userId});

    let gameForUser  = {
        currentPlayer : game.currentPlayer,
        discardPile : game.discardPile,
        players : [],
        currentTurn : game.currentTurn,
        message : game.message,
        isReverse : game.isReverse,
        isFadeUno : true
    }

    gameForUser.players.push(player);
    let playersOrder = _.sortBy(game.players, (o) => {return o.position });
    let index = playersOrder.indexOf(player);

    for (let i = 1; i < playersOrder.length; i++) {
        let indexCurr = i + index;

        if(i + index >= playersOrder.length)
            indexCurr = indexCurr - playersOrder.length;

        let playerIndex = playersOrder[indexCurr];
        gameForUser.players.push(addPlayerWithCoverCards(playerIndex))
    }

    return gameForUser;
}

playerTurnExecute = turn => {
    let game = _.find(games, (x)=>{return x.id == turn.gameId});
    if (game == null) return;
  
    ruleService.apply(turn, game);
  };  

addPlayerWithCoverCards = (playerIndex)=>{
    let player = {
        position : playerIndex.position,
        user : playerIndex.user,
        hand : []
    };

    let countCards = playerIndex.hand.length;

    for (let j = 0; j < countCards; j++) {

        let cardCover = {
            value : "Cover",
            color : "Yellow",
            score : 0 
        }

        player.hand.push(cardCover)        
    }

    return player;
}

initialCarsToPlayer = (game) =>{
    game.players.forEach(player => {
        for (let i = 0; i < numCard; i++) {
            const firstCard = game.drawPile.shift();
            player.hand.push(firstCard);
        }        
    });
}

addFirstDiscardPile = (game) =>{
    let find = _.find(game.drawPile,(x)=>{
        return x.value != enumGame.CardValue.Reverse 
        && x.value != enumGame.CardValue.DrawFour
        && x.value != enumGame.CardValue.DrawTwo
        && x.value != enumGame.CardValue.Wild});

    game.discardPile.push(find);
    
    _.remove(game.drawPile, (x)=>{
       return x.value == find.value && x.score == find.score && x.color == find.color
    });

    game.currentTurn = {
         card : game.discardPile[0]
    };
}

module.exports = {create, start, playerTurnExecute}

