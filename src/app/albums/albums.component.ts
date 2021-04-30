import { Component, OnInit } from '@angular/core';
import { AlbumsService } from '@services/albums.service';
import { Album } from '@shared/models/album.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {

  albums: Album[] = [];
  newAlbum: Album = {
      name: '',
      pictures: [],
      _id: ''
  };

  constructor(private albumsService: AlbumsService) { }

  ngOnInit(): void {
    this.getAlbums();
  }

  addNewAlbum(): void{
    if(this.newAlbum.name.length < 3) return;
    this.albumsService.postAlbum(this.newAlbum.name).subscribe(res => {
      this.albums.push(res);
    });
  }

  getAlbums(): void{
    this.albumsService.getAlbums().subscribe(res => {
      this.albums = res;
    })
  }

}
