import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(public auth: AngularFireAuth) {
    // colocar lo logica de redirección si no está logueado o si lo está
    // this.getUid();
  }

  login(mail: string, pass: string) {
    // this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.auth.signInWithEmailAndPassword(mail, pass);
  }
  logout() {
    return this.auth.signOut();
  }

  register(mail: string, pass: string) {
    return this.auth.createUserWithEmailAndPassword(mail, pass);
  }

  async getUid() {
    const user = await this.auth.currentUser;
    if(user === null) {
      return null;
    } else {
      return user.uid;
    }
  }

  stateAuth() {
    return this.auth.authState;
  }
}
