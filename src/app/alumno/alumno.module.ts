import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnoRoutingModule } from './alumno-routing.module';
import { AlumnoComponent } from './alumno.component';
import { AlumnoCreateComponent } from './alumno-create/alumno-create.component';
import { SimpleNotificationsModule, NotificationsService} from 'angular2-notifications';
import { AlumnoService } from './alumno.service';
import { FormsModule } from '@angular/forms';
import { Ng2TableModule } from 'ng2-table/ng2-table';
import { CarreraService } from '../carrera/carrera-service.service';
import { AlumnoBuscadorComponent } from './alumno-buscador/alumno-buscador.component';

@NgModule({
  imports: [
    AlumnoRoutingModule,
    CommonModule,
    FormsModule,
    Ng2TableModule,
    SimpleNotificationsModule
  ],
  declarations: [AlumnoComponent, AlumnoCreateComponent, AlumnoBuscadorComponent],
  providers: [AlumnoService, CarreraService]
})
export class AlumnoModule { }
