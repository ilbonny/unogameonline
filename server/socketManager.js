
const usersService = require('./services/usersservice');
const gameService = require('./services/gameservice');

const connect = (io) =>{
    io.sockets.on('connection', function(socket) {
        console.log("New client connected " + socket.id);

        socket.on("RELOADING_USERS", ()=>{
            const users = usersService.getUsers();
            io.emit("RELOAD_USERS", users);
        })

        socket.on("START_GAME", ()=>{
            const users = usersService.getFourPlayers();
            if(users.length === 0) return;

            const game = gameService.start(users)
        })
    });
}

module.exports = {connect}
