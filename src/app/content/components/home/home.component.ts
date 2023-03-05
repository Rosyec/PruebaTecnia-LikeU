import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from '../../helpers/interfaces/data.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public characters: Result[] = [];
  public current: number = 1;
  public end: number = 42;

  constructor(private service: ApiService, private route: Router) {}

  ngOnInit(): void {
    this.showCharacters();
  }

  showCharacters() {
    this.service.getAllCharacters(this.current).subscribe({
      next: (value) => {
        this.characters = [...value.results];
      },
    });
  }
  viewInfo(id: number) {
    this.route.navigateByUrl(`/app/character/${id}`);
  }

  onNext() {
    if ( this.current !== 42 ) {
      this.current ++;
      this.showCharacters();
    }
  }

  onPrev() {
    if (this.current !== 1) {
      this.current --;
      this.showCharacters();
    }
  }
}
