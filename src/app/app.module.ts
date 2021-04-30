import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumComponent } from './shared/components/album/album.component';
import { PictureComponent } from './shared/components/picture/picture.component';
import { PicturesComponent } from './pictures/pictures.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { InputComponent } from './shared/components/input/input.component';
import { ButtonFlatComponent } from './shared/directives/button-flat/button-flat.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumComponent,
    PictureComponent,
    PicturesComponent,
    InputComponent,
    ButtonFlatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
