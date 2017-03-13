import { Component, OnInit, DoCheck, EventEmitter } from '@angular/core';
import { CarreraService } from '../carrera-service.service';
import { Carrera } from '../carrera';

@Component({
  selector: 'app-carrera-create',
  templateUrl: './carrera-create.component.html',
  styleUrls: ['./carrera-create.component.css'],
  inputs:['accionForm','carreraSelected'],
  outputs: ['emitirAccion']
})
export class CarreraCreateComponent implements OnInit,DoCheck {
  public nuevaCarrera = new Carrera();
  public carreraSelected:Carrera;
  public carreraTemp:Carrera;
  public testData:string;
  public accionForm;

  emitirAccion = new EventEmitter<string>();

  constructor(private _carreraService : CarreraService ) { }

  ngOnInit() {
  }

  ngDoCheck() {
    if(this.accionForm == "Editar"){
      this.nuevaCarrera = this.carreraSelected;
      this.carreraTemp = this.carreraSelected;
    }
  }

  get diagnostic() { return JSON.stringify(this.nuevaCarrera); }

  guardar(){
    if(this.accionForm=="Agregar"){
      this._carreraService.addCarrera(this.nuevaCarrera)
      .subscribe(
        (data:Carrera)=>{ this.nuevaCarrera = data; },
        error=>alert(error),
        ()=>console.log('done!')
      );
    }else if(this.accionForm=="Editar"){
      this._carreraService.updateCarrera(this.nuevaCarrera)
      .subscribe(
        (data:Carrera)=>{ this.nuevaCarrera = data; },
        error=>alert(error),
        ()=>console.log('done!')
      );
    }
  }

  cancelar(){
    this.accionForm = "Agregar";
    this.emitirAccion.emit(this.accionForm);
    this.carreraSelected = null;
    this.nuevaCarrera = new Carrera('','','');
  }
}
