import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.verifyAuth()
      .pipe(
        tap(isAuthenticated => {
          if (!isAuthenticated) {
            this.router.navigate(['./auth/login'])
          }
        })
      );

    // if (this.authService.auth.id) {
    //   return true;
    // }
    // // console.log('canLoad ', false);
    // // console.log(route);
    // // console.log(segments);
    // console.log('Blocked by the AuthGuard - canActivate');
    // return false;

  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

    return this.authService.verifyAuth()
      .pipe(
        tap(isAuthenticated => {
          if (!isAuthenticated) {
            this.router.navigate(['./auth/login'])
          }
        })
      );;

    // if (this.authService.auth.id) {
    //   return true;
    // }
    // // console.log('canLoad ', false);
    // // console.log(route);
    // // console.log(segments);
    // console.log('Blocked by the AuthGuard - canLoad');
    // return false;
  }
}
