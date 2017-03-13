import { Component, OnInit } from '@angular/core';
import { Grupo } from './grupo';
import { GrupoService } from './grupo.service';
import { SimpleNotificationsComponent, NotificationsService } from 'angular2-notifications';
import { GlobalParamsService } from '../global-params.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.css']
})
export class GrupoComponent implements OnInit {
  constructor(private _grupoService : GrupoService,
    private _notificationsService : NotificationsService,
    private _globalParams:GlobalParamsService){}

  public grupos:Grupo[];
  public notifOptions = this._globalParams.notificationOptions;

  io = require("socket.io-client");
  socket = this.io(this._globalParams.domain);

  ngOnInit() {
  	this.showCarreras();
    this.socket.on('grupoCreado', function(data){
      this.grupos.push(data);
      this._notificationsService.info("Nuevo","Registro de grupo");
    }.bind(this));
  }

  showCarreras(){
  	this._grupoService.getGrupos()
  	.subscribe(
  		data=>{ this.grupos = data; },
  		error=>alert(error),
  		()=>console.log('done!')
  	);
  }

}
