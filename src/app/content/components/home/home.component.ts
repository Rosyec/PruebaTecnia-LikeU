import { Component, OnInit } from '@angular/core';
import { Result } from '../../helpers/interfaces/data.interface';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
public characters: Result[] = [];

  constructor(private service: ApiService) {}

  ngOnInit(): void {
    this.showCharacters();
  }

  showCharacters() {
    this.service.getInfo().subscribe({
      next: (value) => {
        console.log(value.results);
      },
    });
  }
}
