import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth0Client: Auth0Client | undefined;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public token: string | undefined = undefined;

  constructor(private router: Router) { }

  async checkAuth(): Promise<void> {
    if (!this.auth0Client) {
      this.auth0Client = await createAuth0Client({
        domain: environment.auth0.domain,
        clientId: environment.auth0.clientId,
        authorizationParams: {
          redirect_uri: environment.auth0.redirectUri,
          audience: environment.auth0.audience
        }
      });
    }
    const isAuthenticated = await this.auth0Client.isAuthenticated();
    if (!isAuthenticated) {
      // Redirect user to login page if not authenticated
      await this.login();
    } else {
      // Set authentication status to true if authenticated
      this.isAuthenticatedSubject.next(true);
      this.token = await this.auth0Client.getTokenSilently();
    }
  }

  async login(): Promise<void> {
    await this.auth0Client?.loginWithRedirect({
      authorizationParams: {
        redirect_uri: `${window.location.origin}`
      },
      appState: { targetUrl: this.router.url },
    });
  }

  async logout(): Promise<void> {
    await this.auth0Client?.logout({
      clientId: environment.auth0.clientId,
      logoutParams: {
        returnTo: `${window.location.origin}`
      }
    });
    this.isAuthenticatedSubject.next(false);
  }

  async isAuthenticated(): Promise<boolean> {
    await this.checkAuth();
    const result = await this.auth0Client?.isAuthenticated() ?? false;
    return result;
  }
}
