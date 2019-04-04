let users = []

const addUser = (user) =>{
    user.id = generateQuickGuid();
    users.push(user);
}

const getUsers = () =>{
    return users;
}

function generateQuickGuid() {
    return Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
}

module.exports = {addUser, getUsers}