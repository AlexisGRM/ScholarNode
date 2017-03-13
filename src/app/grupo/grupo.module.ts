import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoRoutingModule } from './grupo-routing.module';
import { GrupoComponent } from './grupo.component';
import { GrupoService } from './grupo.service';
import { SimpleNotificationsModule, NotificationsService} from 'angular2-notifications';
import { SimpleListComponent } from './simple-list/simple-list.component';

@NgModule({
  imports: [
    CommonModule,
    GrupoRoutingModule,
    SimpleNotificationsModule
  ],
  declarations: [GrupoComponent],
  providers: [GrupoService, NotificationsService],
})
export class GrupoModule { }
