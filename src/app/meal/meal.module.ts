import { NgModule } from '@angular/core'
import { MealComponent } from './meal.component';
import { NavbarModule } from '../navbar/navbar.module';



@NgModule({
  declarations: [
    MealComponent
  ],
  imports: [
    NavbarModule
  ]
})
export class MealModule { }
