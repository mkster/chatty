import { auth } from "../services/firebase";
import { dbAddUserEntry } from "./usersStore";

export function signup(email, password) {
    console.log("singup");
    auth().createUserWithEmailAndPassword(email, password).then((res)=>{
      console.log("add user");
      dbAddUserEntry(res.user.uid)
    })
}

export function signin(email, password) {
  return auth().signInWithEmailAndPassword(email, password);
}

