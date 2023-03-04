import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { CharacterComponent } from './components/character/character.component';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { ContentRoutingModule } from './content-routing.module';



@NgModule({
  declarations: [
    HomeComponent,
    CharacterComponent,
    EpisodesComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule
  ]
})
export class ContentModule { }
