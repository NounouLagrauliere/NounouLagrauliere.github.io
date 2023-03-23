import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { UserPopupComponent } from '../user-popup/user-popup.component';
import { NavbarModule } from '../navbar/navbar.module';



@NgModule({
  declarations: [
    UsersComponent,
    UserPopupComponent
  ],
  imports: [
    NavbarModule
  ]
})
export class UsersModule { }
