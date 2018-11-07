import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private dbs: DatabaseService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.afAuth.user.pipe(
        switchMap(user => !user ? of(false) : this.dbs.isAdmin(user.uid)),
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigate(['/home']);
          }
        }));
  }
}



