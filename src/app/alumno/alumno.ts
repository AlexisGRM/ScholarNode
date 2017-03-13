import { Carrera } from '../carrera/carrera';
import { Grupo } from '../grupo/grupo';

export class Alumno{
	constructor(
		public _id?:string,
		public Nombre?:string,
		public ApellidoP?:string,
		public ApellidoM?:string,
		public FechaNac?:string,
		public _carrera?:Carrera,
		public _grupo?:Grupo,
		public createdAt?:Date,
		public noMatricula?: String,
		public _usuario?:any,
	){ }

	public get NombreCompleto(){
		return this.ApellidoP+' '+this.ApellidoM+' '+this.Nombre;
	}
}