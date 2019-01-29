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
  //Validador de stado de registrado o no registrado
  stateRegister(){    
    return this.register ? this.register=false : this.register=true;
  }

  //Ingreso con email y contraseña
  signInWithEmailPassword(){
    this.auth.SignInEmailAndPassword(this.email,this.password)
    .then(()=>{this.router.navigate(['home']);
              
            })
    .catch(()=>{alert("La informacion no es correcta")});
  }
  //Enviar informacion de formulario  a firebase
  enviarRegistro(){
  
    if(this.validarPassword()){
      this.auth.createUserWhitEmailAndPassword(this.email,this.password,this.nombre)
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
  //validar si la confirmacion de contraseña es correcta
  validarPassword(){
    return this.password == this.passConfirm
  }
  //inicio de seccion con google
  authGoogle(){
    this.auth.createUserGoogle()
    .then((response)=>{
      //prueva de resevocion de usuario
      console.log(response);
      this.router.navigate(['home'])})
    .catch()
  }
  //incicio de seccion con facebook
  authFacebook(){
    this.auth.createFacebookUser()
    .then(()=>{this.router.navigate(['home'])})
    .catch();
  }
  ngOnInit() {
  }

}
