import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
// import { promise } from 'protractor';
// import { resolve } from 'q';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid : string;

  constructor(private angularFireAuth : AngularFireAuth) {
  }

  
  createUserWhitEmailAndPassword(email,password){
    return new Promise((resolve,reject)=>{           
      this.angularFireAuth.auth.createUserWithEmailAndPassword(email,password)
      .then(result =>{ 
              resolve(result.user.uid)
              this.angularFireAuth.auth.signOut();
              
            })
      .catch(error=>reject(error));      
    });
       
  }
 

     
}  
       
   
  


   
