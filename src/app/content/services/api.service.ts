import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Data, Episode, Character } from '../helpers/interfaces/data.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   * * Url base de la api Rick & Marty
   */
  URL: string = 'https://rickandmortyapi.com/api';
  /**
   * * Importar el HttpClient para peticiones http
   */
  constructor(private http: HttpClient) {}
  /**
   * * Obtener todos los personajes pasandole el número de cada página
   */
  public getAllCharacters(page?: number) {
    return this.http.get<Data>(`${this.URL}/character?page=${page}`);
  }
  /**
   * * Obtener un personaje por su id
   */
  getCharacterById(id: number) {
    return this.http.get<Character>(`${this.URL}/character/${id}`);
  }
  /**
   * * Obtener un episodio por su id
   */
  getEpisodeById(id: number) {
    return this.http.get<Episode>(`${this.URL}/episode/${id}`);
  }
  /**
   * * Obtener todos los personajes de un episodio mediante su id al mismo tiempo
   */
  getAll(characters: string[]) {
    if (!characters) {
      return of([]);
    }
    const multiRequest: Observable<Character>[] = [];
    characters.forEach((id) => {
      const request = this.getCharacterById(parseInt(id));
      multiRequest.push(request);
    });
    return combineLatest(multiRequest);
  }
}
