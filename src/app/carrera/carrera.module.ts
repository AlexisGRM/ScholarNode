import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarreraRoutingModule } from './carrera-routing.module';
import { CarreraComponent } from './carrera.component';
import { CarreraService } from './carrera-service.service';
import { SimpleNotificationsModule, NotificationsService} from 'angular2-notifications';
import { CarreraCreateComponent } from './carrera-create/carrera-create.component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';
import { CarreraDetailsComponent } from './carrera-details/carrera-details.component';
import { SimpleListComponent } from '../grupo/simple-list/simple-list.component';

@NgModule({
  imports: [
  	BootstrapModalModule,
    CommonModule,
    CarreraRoutingModule,
    SimpleNotificationsModule,
    FormsModule,
    ModalModule.forRoot(),
  ],
  declarations: [
    CarreraComponent, CarreraCreateComponent, CarreraDetailsComponent,
    SimpleListComponent],
  providers: [CarreraService, NotificationsService],
})
export class CarreraModule { }
