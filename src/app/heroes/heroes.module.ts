import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
// Modules
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
// Router
import { HeroesRoutingModule } from './heroes-routing.module';
// Components
import { AddComponent } from './pages/add/add.component';
import { SearchComponent } from './pages/search/search.component';
import { HeroComponent } from './pages/hero/hero.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { HeroCardComponent } from './components/hero-card/hero-card.component';
import { ImagePipe } from './pipes/image.pipe';


@NgModule({
  declarations: [
    AddComponent,
    SearchComponent,
    HeroComponent,
    HomeComponent,
    ListComponent,
    HeroCardComponent,
    ImagePipe,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MaterialModule,
    HeroesRoutingModule,
  ],
})
export class HeroesModule {}
