
const create = users => {

  let players = [];

  for (let i = 1; i < users.length+1; i++) {
    const user = users[i - 1];
    let player = {
      user: user,
      hand: [],
      position: i,
      isAutomatic: user.isAutomatic
    };

    players.push(player);
  }

  return players;
};

module.exports = {create}
