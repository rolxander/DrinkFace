import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Registro } from '../interface/registro/registro';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseFirestore, FirebaseStorage } from '@angular/fire';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  register:boolean = false;
  email : string;
  password : string;
  nombre : string;
  passConfirm:string;
  constructor(private auth : AuthService){
   
   }


  enviarRegistro(){
  
    if(this.validarPassword()){
      this.auth.createUserWhitEmailAndPassword(this.email,this.password)
      .then(res=>{
        const user :Registro = {
            nombre : this.nombre,
            correo : this.email,
            uid    : res 
        };
       
        
         
      })
      .catch(error=>console.error(error));
    }
    else{
      alert("Las contraseñas no coinciden");
    }
     
  }
  validarPassword(){
    return this.password == this.passConfirm
  }
  authGoogle(){
    this.auth.createUserGoogle()
    .then()
    .catch()
  }
  authFacebook(){
    this.auth.createFacebookUser()
    .then()
    .catch();
  }
  ngOnInit() {
  }

}
