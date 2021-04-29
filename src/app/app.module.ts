import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { ImagesComponent } from './images/images.component';
import { AlbumComponent } from './shared/components/album/album.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    ImagesComponent,
    AlbumComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
