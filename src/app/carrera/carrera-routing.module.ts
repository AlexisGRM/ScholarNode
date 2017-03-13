import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarreraComponent } from './carrera.component';
import { CarreraDetailsComponent } from './carrera-details/carrera-details.component';

const routes: Routes = [
	{ path: 'carrera', component: CarreraComponent , },  
	{ path: 'carreraDetails/:id', component: CarreraDetailsComponent },    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CarreraRoutingModule { }