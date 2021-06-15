import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styles: [
    `
      img {
        width: 100%;
      }
    `
  ]
})
export class AddComponent implements OnInit {

  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]


  hero: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }

  constructor(private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    //
    // console.log(this.router.url) 
    // console.log(this.router.url.includes('edit')) 

    if(!this.router.url.includes('edit')){
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroesService.getHeroById(id))
      )
      .subscribe(hero => this.hero = hero);
  }

  save() {
    //console.log(this.hero);

    if (this.hero.superhero.trim().length == 0) {
      return;
    }

    if (this.hero.id) {
      // update
      this.heroesService.updateHero(this.hero)
        .subscribe(hero => console.log('Updating...', hero))
        this.router.navigate(['/heroes'])
    } else {
      // create
      this.heroesService.addHero(this.hero)
        .subscribe(hero => {
          this.router.navigate(['/heroes', hero.id])
        });

    }


  }


  delete() {
    this.heroesService.deleteHero(this.hero.id!)
    .subscribe(resp => {
      this.router.navigate(['/heroes'])
    })
  }
}
