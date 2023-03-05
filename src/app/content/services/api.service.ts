import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Data, Episode, Result } from '../helpers/interfaces/data.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  URL: string = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) {}

  public getAllCharacters( page?: number ) {
    return this.http.get<Data>(`${this.URL}/character?page=${ page }`);
  }

  getCharacterById(id: number) {
    return this.http.get<Result>(`${this.URL}/character/${id}`);
  }

  getEpisodeById(id: number) {
    return this.http.get<Episode>(`${this.URL}/episode/${id}`);
  }

  getAll(characters: string[]) {
    if (!characters) {
      return of([]);
    }
    const multiRequest: Observable<Result>[] = [];
    characters.forEach((id) => {
      const request = this.getCharacterById(parseInt(id));
      multiRequest.push(request);
    });
    return combineLatest(multiRequest);
  }
}
