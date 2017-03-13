/*NATIVOS*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

/*MODULOS*/
import { AlumnoModule } from './alumno/alumno.module';
import { GrupoModule } from './grupo/grupo.module';
import { CarreraModule } from './carrera/carrera.module';
import { PagosModule } from './pagos/pagos.module';
import { UsuarioModule } from './usuario/usuario.module';


/*COMPONENTES*/
import { AppComponent } from './app.component';
import { SidebarmenuComponent } from './sidebarmenu/sidebarmenu.component';

/*SERVICIOS*/
import { GlobalParamsService } from './global-params.service';

const routes: Routes = [
  { path:'appRoot', component:AppComponent },
  { path: '',   redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    SidebarmenuComponent,
  ],
  imports: [
    AlumnoModule,
    BrowserModule,
    CarreraModule,
    FormsModule,
    GrupoModule,
    HttpModule,
    PagosModule,
    UsuarioModule,
    RouterModule.forRoot(routes)
  ],
  providers: [GlobalParamsService],
  bootstrap: [AppComponent,SidebarmenuComponent]
})
export class AppModule { }
