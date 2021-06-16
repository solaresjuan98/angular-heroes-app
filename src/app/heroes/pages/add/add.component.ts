import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../components/confirm/confirm.component';


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
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    //
    // console.log(this.router.url) 
    // console.log(this.router.url.includes('edit')) 

    if (!this.router.url.includes('edit')) {
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
        .subscribe(hero => this.showSnackbar('Hero Updated!!'))
      this.router.navigate(['/heroes'])
    } else {
      // create
      this.heroesService.addHero(this.hero)
        .subscribe(hero => {
          this.router.navigate(['/heroes', hero.id])
          this.showSnackbar('Hero Updated!!')
        });

    }


  }

  delete() {

    const dialog = this.dialog.open(ConfirmComponent,
      {
        width: '250px',
        data: this.hero
      })

    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this.heroesService.deleteHero(this.hero.id!)
          .subscribe(resp => {
            this.router.navigate(['/heroes'])
          })
      }
    })

  }

  showSnackbar(message: string) {

    this.snackBar.open(message, 'ok!', {
      duration: 2500,

    });
  }
}
