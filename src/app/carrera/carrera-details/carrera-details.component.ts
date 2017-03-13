import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { GlobalParamsService } from '../../global-params.service';
import { SimpleNotificationsComponent, NotificationsService } from 'angular2-notifications';
import { CarreraService } from '../carrera-service.service';
import { GrupoService } from '../../grupo/grupo.service';
import { Carrera } from '../carrera';
import { Grupo } from '../../grupo/grupo';
import { SimpleListComponent } from '../../grupo/simple-list/simple-list.component';

@Component({
  selector: 'app-carrera-details',
  templateUrl: './carrera-details.component.html',
  styleUrls: ['./carrera-details.component.css']
})
export class CarreraDetailsComponent implements OnInit {
	carreraID:string;
	carrera:Carrera = new Carrera();
  grupoID1:string;
  setGrupoID1:string;
  grupoID2:string;
  setGrupoID2:string;
  alumnosEnGrupo1:any[];
  alumnosEnGrupo2:any[];
  selAlumsGrupo1:any[];
  selAlumsGrupo2:any[];
  alumnosADerecha:any[];
  alumnosAIzquierda:any[];

  testData1:string = '';
  testData2:string = '';

  io = require("socket.io-client");
  socket = this.io(this._globalParams.domain);
  
  public notifOptions = this._globalParams.notificationOptions;

  constructor(private _activatedRoute: ActivatedRoute,
    private _carreraService : CarreraService,
    private _grupoService : GrupoService,
    private _notificationsService : NotificationsService,
    private _globalParams:GlobalParamsService) {
  	// Toma el ID del registro en la URL
    this._activatedRoute.params
    .subscribe((params: Params) => {
    	this.carreraID = params['id'];
  	});

  	this._carreraService.getCarrera(this.carreraID)
  	.subscribe(
  		(data:Carrera)=>{
        this.carrera = data;
        //Se muestra un listado de alumnos en un grupo
        if(this.carrera._grupos.length>0){
          this.grupoID1 = this.carrera._grupos[0]._id;
          this.setGrupoID1 = this.grupoID1;
          //Si existe, se muestra el listado de otro grupo
          if(this.carrera._grupos.length>1){
            this.grupoID2 = this.carrera._grupos[1]._id;
            this.setGrupoID2 = this.grupoID2;
          }
        }
      },
  		error=>alert(error),
  		()=>console.log('done!')
  	);
  }

  ngOnInit() {
    //Evento de deteccion de registro creado
    this.socket.on('alumnoInscritoAGrupo', function(alumno){
      console.log(alumno);
      this._notificationsService.info("Nuevo","Alumno inscrito al grupo: "+alumno._grupo.nombre);
    }.bind(this));
  }

  crearNuevoGrupo(){
    this._grupoService.addGrupo(this.carreraID)
    .subscribe(
        (data:Grupo)=>{
          this.grupoID2 = data._id;
        },
        ()=>{}
      )
  }

  pasarDerecha(){
    if(this.selAlumsGrupo1){
      for(let alumno of this.selAlumsGrupo1){
        alumno.selected= false;
      }
      this.alumnosADerecha = this.selAlumsGrupo1;
    }
  }

  pasarIzquierda(){
    if(this.selAlumsGrupo2){
      for(let alumno of this.selAlumsGrupo2){
        alumno.selected= false;
      }
      this.alumnosAIzquierda = this.selAlumsGrupo2;
    }
  }

  rowSelectedGrupo1(alumnosSeleccionados:any[]){
    this.selAlumsGrupo1 = alumnosSeleccionados;
  }
  rowSelectedGrupo2(alumnosSeleccionados:any[]){
    this.selAlumsGrupo2 = alumnosSeleccionados;
  }

  tomarAlumnosGrupo1(alumnos:any){
    this.alumnosEnGrupo1 = alumnos;
  }

  tomarAlumnosGrupo2(alumnos:any){
    this.alumnosEnGrupo2 = alumnos; 
  }

  cambiaGrupo1(grupoID){
    this.grupoID1 = grupoID;
  }

  cambiaGrupo2(grupoID){
    this.grupoID2 = grupoID; 
  }

  guardarEdicionGrupos(){
    //Se almacenan los alumnos actualmente dentro de la lista
    this._grupoService.registrarAlumnos(this.grupoID1,this.alumnosEnGrupo1)
    .subscribe(
      (data:Grupo)=>{console.log(data)},
      (err)=>console.log(err)
    )
    this._grupoService.registrarAlumnos(this.grupoID2,this.alumnosEnGrupo2)
    .subscribe(
      (data:Grupo)=>{console.log(data)},
      (err)=>console.log(err)
    )
  }

  emitirNotificacion(grupo){
      this._notificationsService.info("Grupo Modificado",
        "Grupo "+grupo.nombre+" fue modificado");
  }

}
