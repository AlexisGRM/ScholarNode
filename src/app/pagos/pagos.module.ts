import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagosRoutingModule } from './pagos-routing.module';
import { PagosComponent } from './pagos.component';

@NgModule({
  imports: [
    CommonModule,
    PagosRoutingModule
  ],
  declarations: [PagosComponent]
})
export class PagosModule { }
