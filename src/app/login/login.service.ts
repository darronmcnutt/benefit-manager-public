import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DatabaseService } from '../database.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  sessionID: string;
  userID: string;

  constructor(private afAuth: AngularFireAuth,
              private dbs: DatabaseService) {
      this.afAuth.user.subscribe(user => {
      if (user) {
        this.userID = user.uid;
        if (!this.sessionID) {
          this.sessionID = this.dbs.createSession(user.uid);
        }
      }
    });
  }

  logInWithEmailAndPassword(email, password) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      auth => {
        this.userID = auth.user.uid;
        this.sessionID = this.dbs.createSession(auth.user.uid);
      });
  }

  logOut() {
    // this.afAuth.auth.currentUser.updateProfile({displayName: 'Regular Guy', photoURL: ''});
    this.afAuth.auth.signOut();
    this.sessionID = null;
    this.userID = null;
  }

}
