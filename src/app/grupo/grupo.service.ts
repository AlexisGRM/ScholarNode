import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { GlobalParamsService } from '../global-params.service';
import { Grupo } from './grupo';

@Injectable()
export class GrupoService{
	constructor(private _http:Http,
		private _globalParams:GlobalParamsService) { }

	private apiURL = '/api/grupo/';
	private domain=this._globalParams.domain+this.apiURL;

	getGrupos(){
		return this._http.get(this.domain)
		.map(res=>res.json())
	}

	getGrupo(id){
		return this._http.get(this.domain+id)
		.map(res=>res.json())
	}

	addGrupo(carreraID){
		return this._http.post(this.domain,new Grupo('','',[],carreraID))
		.map(res=>res.json())
	}

	registrarAlumno(alumno){
		return this._http.post(this.domain+'registrarAlumno/',alumno)
		.map(res=>res.json())
	}

	/*Dado el ID del grupo y los alumnos a registrar,
	reemplaza todos los alumnos ya guardados por nuevos*/
	registrarAlumnos(id,alumnos){
		return this._http.post(this.domain+'registrarAlumnos/'+id,{"alumnos":alumnos})
		.map(res=>res.json())
	}
}
