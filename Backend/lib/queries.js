module.exports = (db, firebase) => {
  return {
    Update: (user) => {

    },

    Login: (userId, done) => {
      db.collection("Users").get().then((querySnapshot) => {
        let userFound = false;
        querySnapshot.forEach((element) => {
          if (userId == element.id) {
            done(200);
            userFound = true;
          }
        });
        if (!userFound) {
          done(204);
        }
      }).catch((exception) => {
        console.log("error");
        console.log(exception);
      });
    },

    Register: (user, done) => {
      db.collection("Users").doc(user.googleId).set({
        Avatar: user.imageUrl,
        Name: user.name,
        Contacts: {},
        Friends: [],
        FriendRequests: [],
        Games: [],
        Languages: []
      })
      .then((_) => {
        console.log(`User ${user.googleId} registered successfully!`);
        done(201);
      }).catch((exception) => {
        console.log("error");
        console.log(exception);
        done(500);
      });
    },

    Profile: (userid, done) => {
      db.collection("Users").doc(userid).get().then((DocumentSnapshot) => {
        done(DocumentSnapshot.data());
      })
    },

    UpdateProfile: (userId, updatedInfo, done) => {
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
          db.collection("Users").doc(userId).update({
            Languages: firebase.firestore.FieldValue.arrayUnion(value)
          }).catch((exception) => {
            console.log("error");
            console.log(exception);
            done(500);
          });
        })
      }
      db.collection("Users").doc(userId).update(newInfo).then(() => {
        console.log(`User ${updatedInfo.userId}'s updated successfully!`)
        done(201);
      }).catch((exception) => {
        console.log("error");
        console.log(exception);
        done(500);
      });
    },

    SendFriendRequest: (senderId, receiverId, done) => {
      db.collection("Users").doc(receiverId).update({
        FriendRequests: firebase.firestore.FieldValue.arrayUnion(senderId)
      }).then(() => {
        console.log(`${senderId} sent a friend request to ${receiverId}!`)
        done(200);
      }).catch((exception) => {
        console.log("error");
        console.log(exception);
        done(500);
      });
    },

    AcceptFriendRequest: (senderId, receiverId, done) => {
      console.log(`${receiverId} accepted ${senderId} friend request!`)
      db.collection("Users").doc(receiverId).update({
        Friends: firebase.firestore.FieldValue.arrayUnion(senderId)
      }).then(() => {
        console.log(`${receiverId} added ${senderId}!`)
        db.collection("Users").doc(senderId).update({
          Friends: firebase.firestore.FieldValue.arrayUnion(receiverId)
        }).then(() => {
          console.log(`${senderId} added ${receiverId}!`)
          db.collection("Users").doc(receiverId).update({
            FriendRequests: firebase.firestore.FieldValue.arrayRemove(senderId)
          }).then(() => {
            console.log(`${senderId} are now ${receiverId} friends!`)
            done(200);
          })
        })
      }).catch((exception) => {
        console.log("error");
        console.log(exception);
        done(500);
      });
    },

    DeclineFriendRequest: (senderId, receiverId, done) => {
      db.collection("Users").doc(receiverId).update({
        FriendRequests: firebase.firestore.FieldValue.arrayRemove(senderId)
      }).then(() => {
        console.log(`${receiverId} declined ${senderId} friend request!`)
        done(200);
      }).catch((exception) => {
        console.log("error");
        console.log(exception);
        done(500);
      });
    },

    DeleteFriend: (senderId, receiverId, done) => {
      db.collection("Users").doc(receiverId).update({
        Friends: firebase.firestore.FieldValue.arrayRemove(senderId)
      }).then(() => {
        console.log(`${senderId} removed ${receiverId} as a friend!`)
        db.collection("Users").doc(senderId).update({
          Friends: firebase.firestore.FieldValue.arrayRemove(receiverId)
        }).then(() => {
          console.log(`${senderId} and ${receiverId} are no longer friends!`)
          done(200);
        })
      }).catch((exception) => {
        console.log("error");
        console.log(exception);
        done(500);
      });
    }
  }
}