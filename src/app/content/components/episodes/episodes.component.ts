import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import {
  dataEpisode,
  Episode,
  Result,
} from '../../helpers/interfaces/data.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
  styleUrls: ['./episodes.component.css'],
})
export class EpisodesComponent implements OnInit {
  public episode: Episode = dataEpisode;
  public characters: Result[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: ApiService
  ) {}

  ngOnInit(): void {
    this.getEpisode();
  }

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
