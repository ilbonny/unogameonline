const usersService = require('./usersservice');
const utilsService = require('./utilsservice');
const playerService = require('./playerservice');
const cardDeskService = require('./carddeskservice');

start = (users)=>{
    const players = playerService.create(users);
    let game  = {
        id : utilsService.generateQuickGuid(),
        players : players,
        currentPlayer : players[0],
        isReverse : false
    }

    let cards = cardDeskService.create();
}

module.exports = {start}

