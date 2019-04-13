const utilsService = require('./utilsservice');
const _ = require("lodash");
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
    let fourUsers = _.take(users,numPlayer);

    fourUsers.forEach(user => {
        _.remove(users, u => u.id === user.id)
    });

    return fourUsers;
}

module.exports = {addUser, getUsers, getFourPlayers}