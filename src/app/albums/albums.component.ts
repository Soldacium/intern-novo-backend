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
      description: '',
      pictures: [],
      _id: ''
  };

  viewedAlbumId = '';
  updatedAlbum: Album = {
    name: '',
    description: '',
    pictures: [],
    _id: ''
  };

  pictureId = '';

  constructor(private albumsService: AlbumsService) { }

  ngOnInit(): void {
    this.getAlbums();
  }

  getAlbums(): void{
    this.albumsService.getAlbums().subscribe(res => {
      this.albums = res;
    });
  }

  addAlbum(): void{
    if (this.newAlbum.name.length < 3) { return; }
    this.albumsService.postAlbum(this.newAlbum).subscribe(res => {
      this.albums.push(res);
    });
  }

  updateAlbum(): void {
    this.albumsService.updateAlbum(this.updatedAlbum).subscribe(res => {
      console.log(res);
    });
  }

  deleteAlbum(albumId: string): void{
    this.albumsService.deleteAlbum(albumId).subscribe(res => {
      console.log(res);
    });
  }
  addPictureToAlbum(pictureId: string, albumId: string): void {
    this.albumsService.addPictureToAlbum(pictureId, albumId).subscribe(res => {
      console.log(res);
    });
  }

  deletePictureFromAlbum(pictureId: string, albumId: string): void {
    this.albumsService.deletePictureFromAlbum(pictureId, albumId).subscribe(res => {
      console.log(res);
    });
  }

}
