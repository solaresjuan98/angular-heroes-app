import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [
  ],
})
export class ListComponent implements OnInit {
  constructor(private heroesService: HeroesService) { }

  heroes: Heroe[] = [];

  ngOnInit(): void {
    this.heroesService.getHeroes()
      .subscribe(heroes =>
        this.heroes = heroes
      );
  }
}
