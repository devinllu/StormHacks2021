module.exports = (db) => {
  return {
    Update: (user) => {

    },

    Login: (user) => {
      db.collection("Users").get().then((querySnapshot) => {
        querySnapshot.forEach((element) => {
          console.log(element.id);
          console.log(element.data());
        });

      }).catch((exception) => {
        console.log("error");
        console.log(exception);
      });
    }

  }
}