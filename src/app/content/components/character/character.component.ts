import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import {
  dataCharacter,
  Character,
} from '../../helpers/interfaces/data.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit {
  /**
   * * Objeto de tipo Character que contiene todas las
   * * propiedades básicas de un personaje.
   */
  public character: Character = dataCharacter;
  /**
   * * Importa el ActivatedRouted para obtener el param query.
   * * Importa el Router para manejar la navegación.
   * * Importa el ApiService para las peticiones http.
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private service: ApiService
  ) {}
  /**
   * * Llama a la función que obtiene toda la información del
   * * personaje una vez se inicializa el componente.
   */
  ngOnInit(): void {
    this.getInfoFromCharacter();
  }
  /**
   * * Obtiene toda la información del personaje
   */
  getInfoFromCharacter() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.service.getCharacterById(id)),
        map((custom) => {
          const episode = custom.episode.map((item) => {
            return item.slice(40).trim();
          });
          return { ...custom, episode };
        })
      )
      .subscribe({
        next: (character) => {
          this.character = { ...character };
        },
      });
  }
  /**
   * * Redirecciona a la ruta '/episodes' con el id
   * * del episodio seleccionado.
   */
  onClickEpisode(id: string) {
    this.route.navigateByUrl(`/app/episodes/${parseInt(id)}`);
  }
}
