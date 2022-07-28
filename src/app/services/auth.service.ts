import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { map, Subscription } from 'rxjs';
import { AppState } from '../app.reducer';
import * as authActions from '../auth/auth.actions';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription!: Subscription;

  constructor(
    public auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    return this.auth.authState.subscribe(fuser => {
      if(fuser) {
        this.userSubscription = this.firestore.doc(`${fuser.uid}/usuario`).valueChanges().subscribe(firestoreUser => {
          const user = Usuario.fromFirebase(firestoreUser);
          this.store.dispatch(authActions.setUser({user}));
        });
      } else {
        this.userSubscription.unsubscribe();
        this.store.dispatch(authActions.unSetUser());
      }
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password).then(({user}) => {
      const newUser = new Usuario(user?.uid, nombre, email);
      return this.firestore.doc(`${user?.uid}/usuario`).set({...newUser});
    });
  }

  loginUsuario(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  isAuth() {
    return this.auth.authState.pipe(
      map(fbUser => fbUser !== null)
    );
  }
}
