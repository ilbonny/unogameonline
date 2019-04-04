const io = require("./app.js").io;
const usersService = require('./services/usersservice');

module.exports = function(socket) {
    console.log("New client connected " + socket.id);

    socket.on("RELOAD_USERS", ()=>{
        const users = usersService.getUsers();
		socket.emit("RELOAD_USERS", users);
	})
};
