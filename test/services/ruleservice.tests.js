const expect = require('chai').expect;
const ruleservice = require('../../server/services/ruleservice')
const utilsService = require('../../server/services/utilsService')

describe('RuleService', function () {
    describe('#apply()', function () {
        it('normalMatch', function () {            
            let players = generateFourPlayers();
            let discardCard = {
                color : 'Red',
                value : 0,
                score : 0
            }

            let game = {
                id: utilsService.generateQuickGuid(),
                players: players,
                currentPlayer: players[0],
                isReverse: false,
                drawPile: [],
                discardPile: [],
                currentTurn: {card : discardCard},
                message: ""
              };

            let turn  = {
                card : players[0].hand[0]
            }

            ruleservice.apply(turn, game);

            // remove card discard
            expect(game.players[0].hand.length).to.equal(4);
            // current turn discard card player
            expect(game.currentTurn.card).to.equal(turn.card);
            // discardPile content card turn
            expect(game.discardPile[0]).to.equal(turn.card);
            // set current player
            expect(game.currentPlayer).to.equal(players[1])
        });
    });    

    describe('#apply()', function () {
        it('wildMatch', function () {            
            let players = generateFourPlayers();
            let discardCard = {
                color : 'Red',
                value : 0,
                score : 0
            }
            let game = {
                id: utilsService.generateQuickGuid(),
                players: players,
                currentPlayer: players[0],
                isReverse: false,
                drawPile: [],
                discardPile: [],
                currentTurn: {card : discardCard},
                message: ""
            };

            let turn  = {
                card : players[0].hand[1]
            }

            ruleservice.apply(turn, game);

            // remove card discard
            expect(game.players[0].hand.length).to.equal(4);
            // current turn discard card player
            expect(game.currentTurn.card).to.equal(turn.card);
            // discardPile content card turn
            expect(game.discardPile[0]).to.equal(turn.card);
            // set current player
            expect(game.currentPlayer).to.equal(players[1])
        });
    });    

    describe('#apply()', function () {
        it('skipMatch', function () {            
            let players = generateFourPlayers();
            let discardCard = {
                color : 'Red',
                value : 0,
                score : 0
            }
            let drawPile = [{
                color : 'Red',
                value : 1,
                score : 1
            },
            {
                color : 'Blue',
                value : 1,
                score : 1
            }]            
            let game = {
                id: utilsService.generateQuickGuid(),
                players: players,
                currentPlayer: players[0],
                isReverse: false,
                drawPile: drawPile,
                discardPile: [],
                currentTurn: {card : discardCard},
                message: ""
            };

            let turn  = {
                card : players[0].hand[3]
            }

            ruleservice.apply(turn, game);

            // remove card discard
            expect(game.players[0].hand.length).to.equal(4);
            // current turn discard card player
            expect(game.currentTurn.card).to.equal(turn.card);
            // discardPile content card turn
            expect(game.discardPile[0]).to.equal(turn.card);
            // set current player
            expect(game.currentPlayer.user.username).to.equal(players[2].user.username)            
        });
    });  
    
    describe('#apply()', function () {
        it('drawTwoMatch', function () {            
            let players = generateFourPlayers();
            let discardCard = {
                color : 'Red',
                value : 0,
                score : 0
            }
            let drawPile = [{
                color : 'Red',
                value : 1,
                score : 1
            },
            {
                color : 'Blue',
                value : 1,
                score : 1
            }]            
            let game = {
                id: utilsService.generateQuickGuid(),
                players: players,
                currentPlayer: players[0],
                isReverse: false,
                drawPile: drawPile,
                discardPile: [],
                currentTurn: {card : discardCard},
                message: ""
            };

            let turn  = {
                card : players[0].hand[2]
            }

            ruleservice.apply(turn, game);

            // remove card discard
            expect(game.players[0].hand.length).to.equal(4);
            // current turn discard card player
            expect(game.currentTurn.card).to.equal(turn.card);
            // discardPile content card turn
            expect(game.discardPile[0]).to.equal(turn.card);
            // set current player
            expect(game.currentPlayer.user.username).to.equal(players[2].user.username)
            // draw two cards    
            expect(game.players[1].hand.length).to.equal(4);
        });
    });  

    describe('#apply()', function () {
        it('reverseMatch', function () {            
            let players = generateFourPlayers();
            let discardCard = {
                color : 'Red',
                value : 0,
                score : 0
            }
            let drawPile = [{
                color : 'Red',
                value : 1,
                score : 1
            },
            {
                color : 'Blue',
                value : 1,
                score : 1
            }]            
            let game = {
                id: utilsService.generateQuickGuid(),
                players: players,
                currentPlayer: players[0],
                isReverse: false,
                drawPile: drawPile,
                discardPile: [],
                currentTurn: {card : discardCard},
                message: ""
            };

            let turn  = {
                card : players[0].hand[4]
            }

            ruleservice.apply(turn, game);

            // player 0 reverse is equal player 4
            // remove card discard
            expect(game.players[0].hand.length).to.equal(2);
            // current turn discard card player
            expect(game.currentTurn.card).to.equal(turn.card);
            // discardPile content card turn
            expect(game.discardPile[0]).to.equal(turn.card);
            // set current player
            expect(game.currentPlayer.user.username).to.equal(players[0].user.username)            
        });
    });  


    
});


generateFourPlayers = ()=>{
    let player1 = {
        user: {username : 'player1'},
        hand: [{
            color : 'Red',
            value : 1,
            score : 1
        },
        {
            color : 'Red',
            value : 40, // WILD
            score : 40
        },
        {
            color : 'Red',
            value : 25, // DRAWTWO
            score : 25
        },
        {
            color : 'Red',
            value : 22, // SKIP
            score : 22
        },
        {
            color : 'Red',
            value : 21, // REVERSE
            score : 21
        }
    ],
        
        position: 0
    };

    let player2 = {
        user: {username : 'player2'},
        hand: [{
            color : 'Red',
            value : 8,
            score : 8
        },
        {
            color : 'Blue',
            value : 1,
            score : 1
        }],
        position : 1
    };

    let player3 = {
        user: {username : 'player3'},
        hand: [{
            color : 'Red',
            value : 3,
            score : 3
        },
        {
            color : 'Blue',
            value : 4,
            score : 4
        }],
        position : 2
    };

    let player4 = {
        user: {username : 'player4'},
        hand: [{
            color : 'Yellow',
            value : 3,
            score : 3
        },
        {
            color : 'Green',
            value : 4,
            score : 4
        }],
        position : 3
    };

    return [ player1, player2, player3, player4];
}