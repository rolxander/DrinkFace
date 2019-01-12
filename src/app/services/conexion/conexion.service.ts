import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Registro} from '../../interface/registro/registro';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {


  
  constructor(private angularFirestore : AngularFirestore) {
   
   }
   registrarUsuario(user : Registro){   
    this.angularFirestore.collection("uses").doc(user.uid).set(user);    
   }


}
