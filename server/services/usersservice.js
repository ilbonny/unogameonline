const utilsService = require('./utilsservice');

const numPlayer = 4;
let users = []

const addUser = (user) =>{
    user.id = utilsService.generateQuickGuid();
    users.push(user);
}

const getUsers = () =>{
    return users;
}

const getFourPlayers = ()=>{
    if(users.length < numPlayer) return [];
    return users.slice(0,numPlayer);
}

module.exports = {addUser, getUsers, getFourPlayers}