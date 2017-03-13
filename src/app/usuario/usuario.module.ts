import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UsuarioComponent } from './usuario.component';
import { UsuarioService } from './usuario-service.service';


@NgModule({
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    FormsModule
  ],
  declarations: [LoginComponent, RegisterComponent, UsuarioComponent],
  providers: [UsuarioService ]
})
export class UsuarioModule { }
