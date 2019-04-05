
const usersService = require('./services/usersservice');

const connect = (io) =>{
    io.sockets.on('connection', function(socket) {
        console.log("New client connected " + socket.id);

        socket.on("RELOADING_USERS", ()=>{
            const users = usersService.getUsers();
            io.emit("RELOAD_USERS", users);
        })
    });
}

module.exports = {connect}
