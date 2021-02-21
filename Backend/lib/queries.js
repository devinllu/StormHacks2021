module.exports = (db) => {
  return {
    Update: (user) => {

    },

    Login: (user, register) => {
      db.collection("Users").get().then((querySnapshot) => {
        let userFound = false;
        querySnapshot.forEach((element) => {
          if (user.profileObj.googleId == element.id) {
            userFound = true;
          }
        });
        if (!userFound) {
          register(user);
        }
      }).catch((exception) => {
        console.log("error");
        console.log(exception);
      });
    },

    Register: (user) => {
      db.collection("Users").doc(user.profileObj.googleId).set({
        Name: user.profileObj.name,
        Contacts: {},
        Friends: [],
        Games: [],
        Languages: []
      })
      .then((querySnapshot) => {
        console.log(`User ${user.profileObj.googleId} registered successfully!`);
      }).catch((exception) => {
        console.log("error");
        console.log(exception);
      });
    }

  }
}