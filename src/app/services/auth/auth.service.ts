import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase';
import { resolve, reject } from 'q';
// import { promise } from 'protractor';
// import { resolve } from 'q';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  uid : string;

  constructor(private angularFireAuth : AngularFireAuth) {
  }  
  createUserWhitEmailAndPassword(email,password,nombre){
    return new Promise((resolve,reject)=>{           
      this.angularFireAuth.auth.createUserWithEmailAndPassword(email,password)
      .then(result =>{ 
              //this.angularFireAuth.auth.currentUser.displayName = nombre;
              resolve(result.user.uid)
              this.angularFireAuth.auth.signOut();              
            })
      .catch(error=>reject(error));      
    });       
  }
  createUserGoogle(){
    return new Promise((resolve,reject)=>{
      this.angularFireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then((res)=>{
        resolve(this.angularFireAuth.auth.currentUser);
        this.angularFireAuth.auth.signOut();
      })
      .catch(error=>reject(error));
    });
  }

  createFacebookUser(){
    return new Promise((resolve,reject)=>{
        this.angularFireAuth.auth.signInWithPopup(new auth.FacebookAuthProvider())
        .then((res)=>{
          resolve(this.angularFireAuth.auth.currentUser);
          this.angularFireAuth.auth.signOut();
        })
        .catch(error=>reject(error));
    });
  }
  SignInEmailAndPassword(email,passowrd){
    return new Promise((resolve,reject)=>{
        this.angularFireAuth.auth.signInWithEmailAndPassword(email,passowrd)
        .then((res)=>{resolve('exito')})
        .catch(error=>reject(error));
    })    
  }
  signOut(){
    return new Promise((resolve,reject)=>{
      this.angularFireAuth.auth.signOut()
      .then(res => resolve('exito') )
      .catch(error=> reject(error));
    })
    
  }
 

     
}  
       
   
  


   
