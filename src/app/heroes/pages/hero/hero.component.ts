import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [
    `
      img {
        width: 100%;
      }
    `
  ]
})
export class HeroComponent implements OnInit {

  hero!: Heroe;

  constructor(private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router) { }

  ngOnInit(): void {
    //this.activatedRoute.params.subscribe(({ id }) => console.log(id))
    this.activatedRoute.params.pipe(
      switchMap(({ id }) => this.heroesService.getHeroById(id))
    )
      .subscribe(hero => this.hero = hero)

  }

  goBack() {
    this.router.navigate(['/heroes/list']);
  }


}
