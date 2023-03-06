import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Character } from '../../helpers/interfaces/data.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  /**
   * * Arreglo de tipo Character que contiene las 
   * * propiedades básicas de un personaje.
   */
  public characters: Character[] = [];
  /**
   * * Número inicial del paginador.
   */
  public current: number = 1;
  /**
   * * Número final del paginador.
   */
  public end: number = 42;
  /**
   * * Importa el ApiService para las peticiones http.
   * * Importa el Router para manejar la navegación.
   */
  constructor(private service: ApiService, private route: Router) {}
  /**
   * * Llama a la función que obtiene todos los 
   * * personajes una vez se inicializa el componente.
   */
  ngOnInit(): void {
    this.showCharacters();
  }
  /**
   * * Obtiene todos los personajes mediante el ApiService.
   */
  showCharacters() {
    this.service.getAllCharacters(this.current).subscribe({
      next: (value) => {
        this.characters = [...value.results];
      },
    });
  }
  /**
   * * Redirecciona a la ruta '/character' con el id 
   * * del personaje seleccionado.
   */
  viewInfo(id: number) {
    this.route.navigateByUrl(`/app/character/${id}`);
  }
  /**
   * * Incrementa el número inicial del paginador 
   * * y obtiene todos los personajes con la página actual.
   */
  onNext() {
    if (this.current !== 42) {
      this.current++;
      this.showCharacters();
    }
  }
  /**
   * * Decrementa el número inicial del paginador y 
   * * obtiene todos los personajes con la página actual.
   */
  onPrev() {
    if (this.current !== 1) {
      this.current--;
      this.showCharacters();
    }
  }
}
