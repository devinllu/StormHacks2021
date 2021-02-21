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
    },

    Profile: (userid, done) => {
      db.collection("Users").doc(userid).get().then((DocumentSnapshot) => {
        done(DocumentSnapshot.data());
      })
    },

    UpdateProfile: (updatedInfo, done) => {
      let newInfo = {};
      if (updatedInfo.Name != null || updatedInfo.Name.length > 0) {
        newInfo['Name'] = updatedInfo.Name;
      }
      if (updatedInfo.Contacts != null) {
        Object.keys(updatedInfo.Contacts).forEach((key) => {
          newInfo[`Contacts.${key}`] = updatedInfo.Contacts[key];
        })
      }
      if (updatedInfo.Languages != null) {
        updatedInfo.Languages.forEach((value) => {
          db.collection("Users").doc(updatedInfo.userId).update({
            Languages: firebase.firestore.FieldValue.arrayUnion(value)
          }).catch((exception) => {
            console.log("error");
            console.log(exception);
            done(500);
          });
        })
      }
      db.collection("Users").doc(updatedInfo.userId).update(newInfo).then(() => {
        console.log(`User ${updatedInfo.userId}'s updated successfully!`)
        done(201);
      }).catch((exception) => {
        console.log("error");
        console.log(exception);
        done(500);
      });
    }
  }
}