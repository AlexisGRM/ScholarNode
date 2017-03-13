import { Alumno } from '../alumno/alumno';
export class Grupo{
	constructor(
		public _id?:string,
		public nombre?: string,
		public _alumnos?: Alumno[],
		public _carrera?: string
	){}
}