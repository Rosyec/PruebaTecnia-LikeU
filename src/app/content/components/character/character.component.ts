import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { dataCharacter, Result } from '../../helpers/interfaces/data.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css'],
})
export class CharacterComponent implements OnInit {
  public character: Result = dataCharacter;

  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private service: ApiService
  ) {}

  ngOnInit(): void {
    this.getInfoFromCharacter();
  }

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

  onClickEpisode(id: string) {
    this.route.navigateByUrl(`/app/episodes/${parseInt(id)}`);
  }
}
