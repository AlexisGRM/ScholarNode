import { Component, OnInit } from '@angular/core';
import { AlumnoService } from './alumno.service';
import { SimpleNotificationsComponent, NotificationsService } from 'angular2-notifications';

//Importanciones para hacer funcionar modal.
import { ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRenderer } from 'angular2-modal';
import { Modal } from 'angular2-modal/plugins/bootstrap';

//Clase modelo
import { Alumno } from './alumno';

//Importacion de parametros globales
import { GlobalParamsService } from '../global-params.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
	Alumnos:Alumno[];//Contenedor de datos

	constructor(private _globalParams:GlobalParamsService,
		private _alumnoService:AlumnoService,
    	private _notificationsService : NotificationsService,
	    //Instancias para hacer funcionar modal
	    overlay: Overlay, vcRef: ViewContainerRef, public modal:Modal) {
      overlay.defaultViewContainer = vcRef;
        }

    //Parametros de configuracion de notificaciones emergentes
	public notifOptions = this._globalParams.notificationOptions;

	//Se inicializan servicios de websockets
	io = require("socket.io-client");
	socket = this.io(this._globalParams.domain);

	ngOnInit() {
		this.showAlumnos();

	    //Evento de deteccion de registro creado
	    this.socket.on('AlumnoCreado', function(data){
	      //this.Alumnos.push(data);
	      this.showAlumnos();
	      this.sortAlumnosByDate();
	      let carrera = data._carrera.abreviacion;
	      this._notificationsService.info("Nuevo",
	      	"Registro de preinscripción en "+carrera);
	    }.bind(this));

	    //Evento de deteccion de registro editado
	    this.socket.on('AlumnoEditado', function(data){
			this.showAlumnos();
			this.sortAlumnosByDate();
			let carrera = data._carrera.abreviacion;
			this._notificationsService.info("Editado",
				"Registro de preinscripción editado");
	    }.bind(this));

	    //Evento de deteccion de registro eliminado
	    this.socket.on('AlumnoEliminado', function(alumnoBorradoID){
			var alumnoBorrado = this.Alumnos.filter(alu=>alu._id==alumnoBorradoID)[0];
			this.Alumnos.splice(this.Alumnos.indexOf(alumnoBorrado), 1);
			//let carrera = data._carrera.abreviacion;
			this._notificationsService.info("Eliminado",
				"Registro de preinscripción eliminado");
	    }.bind(this));
	}

	//Toma datos del servidor y los pone a disposicion del componente
	showAlumnos(){
		//Tomar solo preinscritos
		this._alumnoService.getAlumnos(true)
		.subscribe(
			(data:Alumno[])=>{
				this.Alumnos = data;
				console.log(this.Alumnos);
				this.sortAlumnosByDate();
			},
			(error)=>{console.log(error)}
		);
	}

	//Metodo para organizar registros por fecha de creacion
	sortAlumnosByDate(){
		this.Alumnos = this._alumnoService.
			sortList_createdAt_asc(this.Alumnos);
	}

	confirmBorrarPreinscrito(id){
	    this._globalParams.configConfirmationModal(this.modal)
	    .open().then((resultPromise)=>{
	      resultPromise.result.then(
	          (result)=>{
	            if(result)
	              this.borrarPreinscrito(id);
	          },()=>{}
	        )
	    })
	}

	borrarPreinscrito(id){
	    this._alumnoService.deleteAlumno(id)
	    .subscribe(
	      data=>{ },
	      error=>alert(error),
	      ()=>console.log('done!')
	    );
	}

}