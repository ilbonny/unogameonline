
const usersService = require('./services/usersservice');
const gameService = require('./services/gameservice');

const connect = (io) =>{
    io.sockets.on('connection', function(socket) {
        console.log("New client connected " + socket.id);

        socket.on("disconnect", (reason)=>{
            console.log('Disconnect! '+ socket.id + reason);
            io.emit("DISCONNECT", socket.id);
        })

        socket.on("RELOADING_USERS", ()=>{
            const users = usersService.getUsers();
            io.emit("RELOAD_USERS", users);
        })

        socket.on("CREATING_GAME", ()=>{
            const users = usersService.getFourPlayers();
            if(users.length === 0) return;

            const game = gameService.create(users);
            io.emit("CREATE_GAME", game);
        })

        socket.on("STARTING_GAME", (params)=>{
            const game = gameService.start(params.gameId,params.userId);
            socket.emit("START_GAME", game);
        })

        socket.on("PLAYTURNING", (turn)=>{
            gameService.playerTurnExecute(turn);
            io.emit("PLAYTURN");
        })

        socket.on("DRAWING_DECK", (turn)=>{
            gameService.drawDeck(turn);
            io.emit("PLAYTURN");
        })

        socket.on("REQUESTING_CHALLENGE", (turn)=>{
            gameService.playerTurnExecute(turn);
            io.emit("REQUEST_CHALLENGE");
        })  
        
        socket.on("CHALLENGE", (turn)=>{
            gameService.playerTurnExecute(turn);
            io.emit("PLAYTURN");
        })
        
    });

}

module.exports = {connect}
