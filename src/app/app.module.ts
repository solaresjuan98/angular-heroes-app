import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components
import { AppComponent } from './app.component';
// Modules
import { ErrorPageComponent } from './shared/error-page/error-page.component';
// Router
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent, ErrorPageComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
