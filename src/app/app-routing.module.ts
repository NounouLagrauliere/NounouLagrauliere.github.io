import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryModule } from './gallery/gallery.module';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { MealModule } from './meal/meal.module';
import { UsersModule } from './users/users.module';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', loadChildren: () => HomeModule },
  { path: 'gallery', loadChildren: () => GalleryModule },
  { path: 'meal', loadChildren: () => MealModule },
  { path: 'users', loadChildren: () => UsersModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }