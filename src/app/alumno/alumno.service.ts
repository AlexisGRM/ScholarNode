import { Injectable } from '@angular/core';
import {Http} from '@angular/http'
import 'rxjs/add/operator/map'
import { GlobalParamsService } from '../global-params.service';
import { Alumno } from './alumno';

export enum AlumnoStatus{
	EnRegistro=1, Preinscrito, Inscrito	
}

@Injectable()
export class AlumnoService {

  constructor(private _http:Http,
		private _globalParams:GlobalParamsService) {}

	private apiURL = '/api/Alumno/';
	private domain = this._globalParams.domain+this.apiURL;

	getAlumnos(soloPreinscritos){
		return this._http.get(this.domain+
			(soloPreinscritos?'soloPreinscritos/':''))
		.map(res=>res.json())
	}

	getAlumno(id){
		return this._http.get(this.domain+id)
		.map(res=>res.json())
	}

	addAlumno(Alumno,User){
		return this._http.post(this.domain,{alumno:Alumno,user:User})
		.map(res=>res.json())
	}

	deleteAlumno(id){
		return this._http.delete(this.domain+id)
		.map(res=>res.json())
	}

	updateAlumno(Alumno){
		return this._http.put(this.domain,Alumno)
		.map(res=>res.json())
	}

	registrarAlumno(id){
		return this._http.get(this.domain+'registrarAlumno/'+id)
		.map(res=>res.json())
	}
	
	sortList_createdAt_asc(AlumnosList:Alumno[]){
		AlumnosList = AlumnosList.sort(
			(a:Alumno,b:Alumno)=>{
				if(a.createdAt<b.createdAt)
					return 1;
				if(a.createdAt>b.createdAt)
					return -1;
				return 0;
			}
		);
		return AlumnosList;
	}
	
	sortList_ApellidoP_asc(AlumnosList:Alumno[]){
		AlumnosList = AlumnosList.sort(
			(a:Alumno,b:Alumno)=>{
				if(a.ApellidoP.toLowerCase()<b.ApellidoP.toLowerCase())
					return -1;
				if(a.ApellidoP.toLowerCase()>b.ApellidoP.toLowerCase())
					return 1;
				return 0;
			}
		);
		return AlumnosList;
	}

}
