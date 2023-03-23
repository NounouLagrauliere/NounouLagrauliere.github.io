import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { NavbarModule } from '../navbar/navbar.module';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    NavbarModule
  ]
})
export class HomeModule { }
