import { Component, OnInit } from '@angular/core';
import { GlobalParamsService } from '../global-params.service';
import {UserLogin} from '../usuario/userLogin';

@Component({
  selector: 'sidebarmenu',
  templateUrl: './sidebarmenu.component.html',
  styleUrls: ['./sidebarmenu.component.css']
})
export class SidebarmenuComponent implements OnInit {

	showNavBar: boolean = false;
  usuario:UserLogin = new UserLogin();

  constructor(private globalEventsManager: GlobalParamsService) {
  	
   }

  ngOnInit() {
    //var usuario = localStorage.getItem('currentUser');
     this.globalEventsManager.showNavBarEmitter.subscribe((modo:boolean)=>{
         this.usuario = JSON.parse(localStorage.getItem('currentUser'));
          // mode will be null the first time it is created, so you need to igonore it when null
          if(modo!==null)
            this.showNavBar = modo;
      });
  }
  /*logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
         this.showNavBar = false;

    }*/
   

} 


