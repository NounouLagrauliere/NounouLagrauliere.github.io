import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserPopupComponent } from './user-popup/user-popup.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersComponent } from './users/users.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MealComponent } from './meal/meal.component';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { RouterModule } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth'
import { getAuth } from 'firebase/auth';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsersComponent,
    MealComponent,
    HomeComponent,
    GalleryComponent,
    NavbarComponent,
    UserPopupComponent
  ],
  imports: [
    BrowserModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
