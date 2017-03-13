import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../userLogin';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../usuario-service.service';
import { GlobalParamsService } from '../../global-params.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../_services/index';



@Component({
  selector: 'app-login',
  moduleId: module.id,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	userLogin:UserLogin = new UserLogin();
	model: any = {};
    loading = false;
    returnUrl: string;

	constructor(
		private _usuarioService:UsuarioService,
		private _globalEventsManager: GlobalParamsService,
		private router: Router,
		//private authenticationService: AuthenticationService	
        //private alertService: AlertService
		 ) { }

	ngOnInit() {
		//this.authenticationService.logout();
		
		
	}

	autenticar(){
		this.loading = true;
        
        //this.authenticationService.login(this.model.username, this.model.password)
		this._usuarioService.autenticar(this.userLogin)
		.subscribe(
			(data:UserLogin)=>{
				alert(JSON.stringify(data));

				//Se guarda el usuario que responde el server
				localStorage.setItem('currentUser',JSON.stringify(data));
				if(data._id){
					if(data.rol=='admin'){
						this.returnUrl = 'carrera';
					}else if(data.rol=='alumno'){
						this.returnUrl = 'carreraDetails/:id';
						
					}else if(data.rol=='finanzas'){
						this.returnUrl = 'pagosList';
					}
					
					console.log("LOGEADO!");
					this._globalEventsManager.showNavBar(true);
					this.router.navigate([this.returnUrl]);

					//this.router.navigate([this.returnUrl]);
				}else{
					console.log("Nel no entras");
					this._globalEventsManager.showNavBar(false);
					//this.loading = false;
				}
			},
			error=>{
				console.log(error);
				//this.alertService.error(error);
                    //this.loading = false;
			}
		)
	} 

	
	

}
