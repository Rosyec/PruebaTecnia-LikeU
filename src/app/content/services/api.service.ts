import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '../helpers/interfaces/data.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  URL: string = 'https://rickandmortyapi.com/api/character';

  constructor( private http:HttpClient ) { }

  public getInfo() {
      return this.http.get<Data>(this.URL);
  }


}
