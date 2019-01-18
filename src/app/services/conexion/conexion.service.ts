import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Registro} from '../../interface/registro/registro';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  userRegister : AngularFirestoreCollection<Registro>
  
  constructor(private angularFirestore : AngularFirestore) {
    this.userRegister = this.angularFirestore.collection("users");
   

   }
   registrarUsuario(user : Registro){   
    this.userRegister.doc(user.uid).set(user);
           
   }


}
