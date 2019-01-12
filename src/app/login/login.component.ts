import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Registro } from '../interface/registro/registro';
import { ConexionService } from '../services/conexion/conexion.service';

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
  constructor(private auth : AuthService,private conexion : ConexionService) { }


  enviarRegistro(){
  
    if(this.validarPassword()){
      this.auth.createUserWhitEmailAndPassword(this.email,this.password)
      .then(res=>{
        const user :Registro = {
            nombre : this.nombre,
            correo : this.email,
            uid    : res 
        };
        this.conexion.registrarUsuario(user);
         
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
  ngOnInit() {
  }

}
