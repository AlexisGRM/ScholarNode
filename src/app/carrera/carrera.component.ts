import { Component, OnInit } from '@angular/core';
import { Carrera } from './carrera';
import { CarreraService } from './carrera-service.service';
import { SimpleNotificationsComponent, NotificationsService } from 'angular2-notifications';

//Importanciones para hacer funcionar modal.
import { ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRenderer } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

//Importacion de parametros globales
import { GlobalParamsService } from '../global-params.service';

@Component({
	templateUrl: 'carreraIndex.html'
})
export class CarreraComponent implements OnInit {
  constructor(private _globalParams:GlobalParamsService,
    private _carreraService : CarreraService,
    private _notificationsService : NotificationsService,
    //Instancias para hacer funcionar modal
    overlay: Overlay, vcRef: ViewContainerRef, public modal:Modal){
      overlay.defaultViewContainer = vcRef;
  }

  carreras:Carrera[];
  public carreraSelected:Carrera;
  public accionForm='Agregar';
  public notifOptions = this._globalParams.notificationOptions;

  io = require("socket.io-client");
  socket = this.io(this._globalParams.domain);

  ngOnInit(){

    var usuario = JSON.parse(localStorage.getItem('currentUser'));
    //var usuario = localStorage.getItem('currentUser');
     if(usuario){
       alert("Si estas logeado");

     }else{

       alert("NO estas logeado");
     }

  	this.showCarreras();
    //Evento de deteccion de registro creado
    this.socket.on('carreraCreada', function(data){
      this.carreras.push(data);
      this._notificationsService.info("Nuevo","Registro de carrera");
    }.bind(this));

    //Evento de deteccion de registro elminado
    this.socket.on('carreraEliminada', function(id){
      var carreraBorrada = this.carreras.filter(car=>car._id==id)[0];
      this.carreras.splice(this.carreras.indexOf(carreraBorrada), 1);
      this._notificationsService.info("Eliminado","Registro de carrera");
    }.bind(this));

    //Evento de deteccion de registro editado
    this.socket.on('carreraEditada', function(carrera){
      this.showCarreras();
      this._notificationsService.info("Editado","Registro de carrera");
    }.bind(this));
  }

  showCarreras(){
  	this._carreraService.getCarreras()
  	.subscribe(
  		(data:Carrera[])=>{
        this.carreras = data;
        this.sortCarreras();
      },
  		error=>alert(error),
  		()=>console.log('done!')
  	);
  }

  sortCarreras(){
    this.carreras = this._carreraService
      .sortList_nombre_asc(this.carreras)
  }
  //Abre modal para confirmacion de eliminacion de registro
  confirmBorrarCarrera(id){
    this._globalParams.configConfirmationModal(this.modal)
    .open().then((resultPromise)=>{
      resultPromise.result.then(
          (result)=>{
            if(result)
              this.borrarCarrera(id);
          },()=>{}
        )
    })
  }

  //Prepara la forma de creación para funcionar como una forma de edicion
  confirmEditarCarrera(carrera){
    this.carreraSelected = carrera;
    this.accionForm = 'Editar';
  }

  borrarCarrera(id){
    this._carreraService.deleteCarrera(id)
    .subscribe(
      data=>{ },
      error=>alert(error),
      ()=>console.log('done!')
    );
  }  

  recibirAccion(accion){
    this.accionForm=accion;
    this.carreraSelected = null;
  }
}