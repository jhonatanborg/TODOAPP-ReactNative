import firebase from "firebase";
import "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBSH2Eygnhxbwz7YsFroz3lM1iQ2R1kXnQ",
  authDomain: "todoappreact-d92be.firebaseapp.com",
  projectId: "todoappreact-d92be",
  storageBucket: "todoappreact-d92be.appspot.com",
  messagingSenderId: "55412594985",
  appId: "1:55412594985:web:5bf00d7efa301a372ebf38",
};
class Fire {
  constructor(callback) {
    this.init(callback);
  }
  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }
  getLists(callback) {
    let ref = this.ref.orderBy("name");
    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];
      snapshot.forEach((doc) => {
        lists.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      console.log(lists);
      callback(lists);
    });
  }
  addList(list) {
    let ref = this.ref;
    ref.add(list);
  }
  updateList(list) {
    let ref = this.ref;
    ref.doc(list.id).update(list);
  }
  get userId() {
    return firebase.auth().currentUser.uid;
  }
  get ref() {
    return firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");
  }
  detach() {
    this.unsubscribe();
  }
}
export default Fire;
