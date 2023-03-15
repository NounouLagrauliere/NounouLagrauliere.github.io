import { Injectable } from '@angular/core';
import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth0Client!: Auth0Client;

  constructor() { }

  async login(): Promise<void> {
    this.auth0Client = await createAuth0Client({
      domain: environment.auth0.domain,
      clientId: environment.auth0.clientId,
      authorizationParams: {
        redirect_uri: environment.auth0.redirectUri,
        audience: environment.auth0.audience
      }
    });
    await this.auth0Client.loginWithRedirect();
  }

  async handleRedirectCallback(): Promise<void> {
    try {
      this.auth0Client = await createAuth0Client({
        domain: environment.auth0.domain,
        clientId: environment.auth0.clientId,
        authorizationParams: {
          redirect_uri: environment.auth0.redirectUri,
          audience: environment.auth0.audience
        }
      });
    } catch(err) {
      console.log(err);
    }
    
    await this.auth0Client.handleRedirectCallback();
  }

  async isAuthenticated(): Promise<boolean> {
    return await this.auth0Client.isAuthenticated();
  }

  async logout(): Promise<void> {
    return await this.auth0Client.logout({
      clientId: environment.auth0.clientId,
      logoutParams: {returnTo: `${window.location.origin}`}
    });
  }

  async getUser(): Promise<any> {
    const user = await this.auth0Client.getUser();
    return user;
  }
}
