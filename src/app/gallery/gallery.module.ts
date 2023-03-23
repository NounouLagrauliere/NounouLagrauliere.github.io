import { NgModule } from '@angular/core';
import { GalleryComponent } from './gallery.component';
import { NavbarModule } from '../navbar/navbar.module';



@NgModule({
  declarations: [
    GalleryComponent
  ],
  imports: [
    NavbarModule
  ]
})
export class GalleryModule { }
