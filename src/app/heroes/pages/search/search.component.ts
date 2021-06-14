import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  term: string = '';
  heroes: Heroe[] = [];
  heroSelected!: Heroe | undefined;


  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  searching() {
    this.heroesService.getSuggets(this.term.trim())
      .subscribe(heroes => this.heroes = heroes)
  }

  selectedOption(event: MatAutocompleteSelectedEvent) {


    if (!event.option.value) {
      this.heroSelected = undefined;
      //console.log('There is not value')
      return;
    }

    const hero: Heroe = event.option.value;
    console.log(hero);
    this.term = hero.superhero;

    this.heroesService.getHeroById(hero.id!).subscribe(hero => this.heroSelected = hero)
  }

}
