import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Parameters } from 'src/app/shared/parameters';
import { LoggerService } from '../logger.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseauthService {

  constructor(public auth: AngularFireAuth, private loggerService: LoggerService) {
    // colocar lo logica de redirección si no está logueado o si lo está
    // console.log('-----> usr: ', this.getUid());
  }

  login(mail: string, pass: string) {
    // this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    return this.auth.signInWithEmailAndPassword(mail, pass);
  }
  async logout() {
    return await this.auth.signOut();
  }

  async register(mail: string, pass: string) {
    const userCredential = await this.auth.createUserWithEmailAndPassword(mail, pass);
    await userCredential.user.sendEmailVerification().then(res => {
      this.loggerService.logResponse(res, Parameters.methodNameSignUp, mail, userCredential.user.uid, Parameters.logsMessageEmailVerificationSent, Parameters.statusCodeSuccess, mail, Parameters.pathAuth);
    });
    return userCredential;
  }

  async sendEmailVerification(userCredential: Promise<firebase.auth.UserCredential>) {
    return (await userCredential).user.sendEmailVerification();
  }

  async getUid() {
    const user = await this.auth.currentUser;
    if(user === null) {
      return null;
    } else {
      return user.uid;
    }
  }

  async recoverPass(email) {
    return await this.auth.sendPasswordResetEmail(email);
  }

  stateAuth() {
    return this.auth.authState;
  }

  async signInAnonymously() {
    return await this.auth.signInAnonymously();
  }
}
