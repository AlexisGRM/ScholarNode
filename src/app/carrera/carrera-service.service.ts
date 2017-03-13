import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import { GlobalParamsService } from '../global-params.service';
import { Carrera } from './carrera';
import 'rxjs/add/operator/map'

@Injectable()
export class CarreraService{
	constructor(private _http:Http,
		private _globalParams:GlobalParamsService) {}
	
	private apiURL = '/api/carrera/';
	private domain=this._globalParams.domain+this.apiURL;

	getCarreras(){
		return this._http.get(this.domain)
		.map(res=>res.json())
	}

	getCarrera(id){
		return this._http.get(this.domain+id)
		.map(res=>res.json())
	}

	addCarrera(carrera){
		return this._http.post(this.domain,carrera)
		.map(res=>res.json())
	}

	deleteCarrera(id){
		return this._http.delete(this.domain+id)
		.map(res=>res.json())
	}

	updateCarrera(carrera){
		return this._http.put(this.domain,carrera)
		.map(res=>res.json())
	}

	sortList_nombre_asc(CarrerasList:Carrera[]){
		CarrerasList = CarrerasList.sort(
			(a:Carrera,b:Carrera)=>{
				if(a.nombre<b.nombre)
					return -1;
				if(a.nombre>b.nombre)
					return 1;
				return 0;
			}
		);
		return CarrerasList;
	}
}
