import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Registro } from '../interface/registro/registro';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseFirestore, FirebaseStorage } from '@angular/fire';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';


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
  

  constructor(private auth : AuthService,private router :Router){
   
   }
  
  stateRegister(){    
    return this.register ? this.register=false : this.register=true;
  }

  
  signInWithEmailPassword(){
    this.auth.SignInEmailAndPassword(this.email,this.password)
    .then(()=>{this.router.navigate(['home'])})
    .catch(()=>{alert("La informacion no es correcta")});
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
       this.register = false;
        
         
      })
      .catch(error=>{
        console.error(error)
        alert("La informacion no es correcta o la cuenta ya esta en uso")
      });
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
    .then(()=>{this.router.navigate(['home'])})
    .catch()
  }
  authFacebook(){
    this.auth.createFacebookUser()
    .then(()=>{this.router.navigate(['home'])})
    .catch();
  }
  ngOnInit() {
  }

}
