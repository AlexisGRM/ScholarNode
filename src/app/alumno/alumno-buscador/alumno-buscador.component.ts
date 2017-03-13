import { Component, OnInit } from '@angular/core';
import { Alumno } from '../alumno'
import { AlumnoService } from '../alumno.service';

@Component({
  selector: 'app-alumno-buscador',
  templateUrl: './alumno-buscador.component.html',
  styleUrls: ['./alumno-buscador.component.css']
})
export class AlumnoBuscadorComponent implements OnInit {
	Alumnos:Alumno[];
  constructor(private _alumnoService:AlumnoService) { }

  ngOnInit() {
	this.Alumnos = new Array();
  }

}
