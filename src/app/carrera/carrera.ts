import { Grupo } from '../grupo/grupo';
export class Carrera{
	constructor(
		public _id?:string,
		public nombre?:string,	
		public abreviacion?:string,
		public _grupos?:Grupo[],
		public num?:number,
	){}
}