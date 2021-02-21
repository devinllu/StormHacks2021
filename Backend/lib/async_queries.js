module.exports = (db, firebase) => {
  return {

    GamesPlayed: async (userId) => {
      var DocumentSnapshot = await db.collection("Users").doc(userId).get();
      return await DocumentSnapshot.get("Games");
    },

    GamePlayers: async (gameId) => {
      var DocumentSnapshot = await db.collection("Games").doc(gameId).get();
      return filterObjectByKeys(['Players'], DocumentSnapshot.data())['Players'];
    },

    GamePlayedInfo: async (userId, gameId) => {
      var DocumentSnapshot = await db.collection("Users").doc(userId).get();
      var games = await DocumentSnapshot.get("Games");
      for (let game of games) {
        if (game.Name == gameId) {
          return game;
        }
      }
    }

  }
}

function filterObjectByKeys(filterList, obj) {
  return Object.keys(obj)
            .filter(key => filterList.includes(key))
            .reduce((newObj, key) => {
              newObj[key] = obj[key];
              return newObj;
            }, {})
}