import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import {
  dataEpisode,
  Episode,
  Character,
} from '../../helpers/interfaces/data.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css'],
})
export class EpisodesComponent implements OnInit {
  /**
   * * Objeto de tipo Episode que contiene todas las 
   * * propiedades básicas del episodio.
   */
  public episode: Episode = dataEpisode;
  /**
   * * Arreglo de tipo Character que contiene las 
   * * propiedades básicas de un personaje.
   */
  public characters: Character[] = [];
  /**
   * * Importa el ActivatedRouted para obtener el param query. 
   * * Importa el ApiService para las peticiones http.
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiService
  ) {}
  /**
   * * Llama a la función que obtiene el episodio 
   * * una vez se inicializa el componente.
   */
  ngOnInit(): void {
    this.getEpisode();
  }
  /**
   * * Obtiene el episodio y todos los personajes asociados al mismo
   */
  getEpisode() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.service.getEpisodeById(id)),
        map((episode) => {
          const characters = episode.characters.map((item) =>
            item.slice(42).trim()
          );
          return { ...episode, characters };
        })
      )
      .subscribe({
        next: (episode) => {
          this.service.getAll(episode.characters).subscribe({
            next: (characters) => {
              this.characters = characters;
            },
          });
          this.episode = episode;
        },
      });
  }
}
