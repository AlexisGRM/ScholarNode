import { Injectable } from '@angular/core';
import { Http } from '@angular/http'
import 'rxjs/add/operator/map'
import { GlobalParamsService } from '../global-params.service';
import { UserLogin } from './userLogin';

@Injectable()
export class UsuarioService {
  	constructor(private _http:Http,
		private _globalParams:GlobalParamsService) { }

	private apiURL = '/api/usuario/';
	private domain=this._globalParams.domain+this.apiURL;

	autenticar(userLogin:UserLogin){
		return this._http.post(this.domain+'authenticate', userLogin)
		.map((res)=>{

            // login successful if there's a jwt token in the response
            let user = res.json();
            if (user && user._id) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                //alert('Si te dejo entrar.')
            }
             return user;
		})
	}
}
