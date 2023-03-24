import { Injectable, NgZone } from '@angular/core';
import { Auth, authState, signInWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { traceUntilFirst } from '@angular/fire/performance';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { EMPTY, map, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly userDisposable: Subscription|undefined;
  public readonly user: Observable<User | null> = EMPTY;

  showLoginButton = false;
  showLogoutButton = false;

  constructor(
    public afs: Firestore,
    public auth: Auth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.user = authState(this.auth);
    this.userDisposable = authState(this.auth).pipe(
      traceUntilFirst('auth'),
      map(u => !!u)
    ).subscribe(isLoggedIn => {
      this.showLoginButton = !isLoggedIn;
      this.showLogoutButton = isLoggedIn;
    });
  }

  // Sign in with email/password
  async SignIn(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
      this.user.subscribe((user) => {
        if (user) {
          this.router.navigate(['home']);
        }
      });
    } catch (error: any) {
      window.alert(error.message);
    }
  }

  // Sign out
  async SignOut() {
    await signOut(this.auth);
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }
}
