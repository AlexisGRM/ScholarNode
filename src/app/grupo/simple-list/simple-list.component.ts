import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Grupo } from '../grupo';
import { Carrera } from '../../carrera/carrera';
import { GrupoService } from '../grupo.service';
import { AlumnoService } from '../../alumno/alumno.service'
import { CarreraService } from '../../carrera/carrera-service.service'
import { GlobalParamsService } from '../../global-params.service';

@Component({
  selector: 'grupo-simple-list',
  templateUrl: './simple-list.component.html',
  styleUrls: ['./simple-list.component.css']
})
export class SimpleListComponent implements OnInit {
	@Input() grupoID:string;
	@Input() _grupoIDIgnorar:string;
	@Output() onRowSelected = new EventEmitter<any[]>();
	@Output() onBindingAlumnos = new EventEmitter<any[]>();
	@Output() onGroupModifiedBySocket = new EventEmitter<any[]>();
	@Output() onGroupChanged = new EventEmitter<string>();

	grupo:Grupo = new Grupo();
	grupos:Grupo[];
	selectListGrupos:Grupo[];

	vmAlumnos:any[]; //Alumnos del grupo
	private _vmAlumnosIn:any[]; //Alumnos ingresados de otro grupo

	io = require("socket.io-client");
	socket = this.io(this._globalParams.domain);

	constructor(private _grupoService:GrupoService,
		private _alumnoService:AlumnoService,
    	private _globalParams:GlobalParamsService) {
	    //Evento de deteccion de registro creado
	    this.socket.on('alumnoInscritoAGrupo', function(alumno){
	    	if(alumno._grupo._id==this.grupoID){
		      this.grupo._alumnos.push(alumno);
		      this.grupo._alumnos = this._alumnoService.
		      	sortList_ApellidoP_asc(this.grupo._alumnos);
		      this.vmAlumnos = this.grupo._alumnos;
		      this.onBindingAlumnos.emit(this.vmAlumnos);
	      	}
	    }.bind(this));

	    this.socket.on('alumnosRegistrados', function(grupoID){
	    	if(grupoID==this.grupoID){
	    		this.cargarAlumnos();
		      	this.onGroupModifiedBySocket.emit(this.grupo);
	      	}
	    }.bind(this));

    }

	ngOnInit() {
		this.cargarAlumnos();
	}

	//Carga todos los grupos de esta carrera
	cargarGrupos(){
		this._grupoService.getGrupos()
		.subscribe(
			(data:Grupo[])=>{
				if(this.grupo._carrera)
					this.grupos = data.filter(grp=>grp._carrera == this.grupo._carrera);
				else
					this.grupos = data;

				this.ignorarGrupo();
			},
			(error)=>{
				console.log(error);
			}
		)
	}

	ignorarGrupo(){
		this.selectListGrupos = this.grupos.slice();
		//Remueve el grupo que ya se encuentra seleccionado en la otra lista
		let grupoIgnorado = this.selectListGrupos.filter(grp=>grp._id == this._grupoIDIgnorar)[0];
		let idx = this.selectListGrupos.indexOf(grupoIgnorado);
		this.selectListGrupos.splice(idx,1);
	}

	cargarAlumnos(){
		if(this.grupoID){
			this._grupoService.getGrupo(this.grupoID)
			.subscribe(
		  		(data)=>{
		  			//Se toman y se ordenan por matricula
			        this.grupo = data;
			        this.vmAlumnos = this._alumnoService.sortList_ApellidoP_asc(this.grupo._alumnos);
					this.onBindingAlumnos.emit(this.vmAlumnos);
					if(!this.grupos){
						this.cargarGrupos();
					}
		      	},
		  		error=>console.log(error),
		  		()=>console.log('done!')
		  	);
		}
	}

	cambiaGrupo(){
		this.grupoID = this.grupo._id;
		this.onGroupChanged.emit(this.grupoID);
		this.cargarAlumnos();
	}

	//Selecciona un estudiante de la lista y emite un evento
	seleccionarAlumno(alumnoID){
		var index = this.vmAlumnos.
		indexOf(this.vmAlumnos
			.find(al=>al._id==alumnoID)
		);
		//Toggle seleccion del renglon
		this.vmAlumnos[index].selected = !this.vmAlumnos[index].selected;
		//Si se selecciona algun renglon, se emite al padre los renglones seleccionados
		this.onRowSelected.emit(this.vmAlumnos.filter(al=>al.selected));
	}

	@Input()
	set grupoIDIgnorar(grupoIDIgnorar){
		this._grupoIDIgnorar = grupoIDIgnorar;
		if(this.grupos)
			this.ignorarGrupo();
		this.cargarAlumnos();
	}

	/*SE RECIBEN LOS ESTUDIANTES SELECCIONADOS DE UN GRUPO DIFERENTE*/
	@Input()
	set vmAlumnosIn(vmAlumnosIn:any[]){
		if(vmAlumnosIn){
			this._vmAlumnosIn = vmAlumnosIn;
			this.vmAlumnos = this.vmAlumnos.concat(vmAlumnosIn);
			this.vmAlumnos = this._alumnoService.sortList_ApellidoP_asc(this.vmAlumnos);
			this.onBindingAlumnos.emit(this.vmAlumnos);
		}
	}

	/*SE reciben los estudiantes que se pasan a otro grupo y se eliminan de este*/
	@Input()
	set alumnosRemove(alumnosRemove:any[]){
		if(alumnosRemove){
			for(let alumno of alumnosRemove){
				var alumnoBorrar = this.vmAlumnos.filter(al=>al._id==alumno._id)[0];
				var index = this.vmAlumnos.indexOf(alumnoBorrar);
				this.vmAlumnos.splice(index,1);
			}
			this.onBindingAlumnos.emit(this.vmAlumnos);
		}
	}
}
