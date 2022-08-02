import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { map } from 'rxjs';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) { }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    return this.firestore.doc(`${this.authService.user.uid}/ingreso-egreso`).collection('items').add({...ingresoEgreso});
  }

  initIngresosEgresosListener(uid: string = '') {
    return this.firestore.collection(`${uid}/ingreso-egreso/items`).snapshotChanges().pipe(map(snapshot => snapshot.map(doc => ({
          uid: doc.payload.doc.id,
          ...doc.payload.doc.data() as any
        })
      )
    ));
  }

  borrarIngresoEgreso(uidItem: string) {
    return this.firestore.doc(`${this.authService.user.uid}/ingreso-egreso/items/${uidItem}`).delete();
  }
}
