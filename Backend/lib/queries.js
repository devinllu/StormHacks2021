module.exports = (db) => {
  return {
    Update: (user) => {

    },

    Login: (user, register) => {
      db.collection("Users").get().then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          if (user.id == element.id) {
            return;
          }
        });
        register(user);

      }).catch((exception) => {
        console.log("error");
        console.log(exception);
      });
    },

    Register: (user) => {
      db.collection("Users").doc(user.id).set({
        Name: user.profileObj.name
      })
      .then((querySnapshot) => {
        console.log("document written successfully")
      }).catch((exception) => {
        console.log("error");
        console.log(exception);
      });
    }

  }
}