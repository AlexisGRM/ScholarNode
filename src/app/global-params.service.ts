import { Injectable } from '@angular/core';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { UserLogin } from './usuario/userLogin'

@Injectable()
export class GlobalParamsService {
	private _showNavBar: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
    public showNavBarEmitter: Observable<boolean> = this._showNavBar.asObservable();
	
	public readonly notificationOptions = { //Opciones de notificacion
		position: ["top", "right"], timeOut: 4000,
		lastOnBottom: true
	};

	public readonly domain='http://localhost:8000';
	//public readonly domain='https://scholarnode.herokuapp.com';

  	constructor() { }

  	showNavBar(modo:boolean) {
        this._showNavBar.next(modo);
    }

  	//Prepara una ventana de confirmacion modal
  	//de 2 botones: OK y cancel
  	configConfirmationModal(modal:Modal){
  		return modal.confirm()
	    .size('sm')
	    .isBlocking(true)
	    .showClose(true)
	    .keyboard(27)
	    .title('Borrar')
	    .body('¿Seguro que deseas borrar este registro?')
	    .okBtn('SI')
	    .okBtnClass('btn btn-danger')
	    .cancelBtn('Cancelar');
  	}

}
