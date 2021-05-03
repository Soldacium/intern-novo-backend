import { Component, OnInit } from '@angular/core';
import { PicturesService } from '@services/pictures.service';
import { Picture } from '@shared/models/picture.model';


@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.scss']
})
export class PicturesComponent implements OnInit {

  pictures: Picture[] = [];
  newPicture: Picture = {
    name: '',
    url: '',
    _id: '',
    description: ''
  };

  public imagePath!: string;
  imgURL: any;
  public message!: string;
  file!: File;

  constructor(
    private picturesService: PicturesService
  ) { }

  ngOnInit(): void {
    this.getPictures();
  }

  getPictures(){
    this.picturesService.getPictures().subscribe(res => {
      this.pictures = res;
    });
  }

  preview(files: any): void {

    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imgURL = reader.result;
    };

    this.file = files[0];
  }

  addNewPicture(): void {
    if (!this.file || this.newPicture.name.length < 3) { return; }
    this.picturesService.postPicture(this.newPicture, this.file).subscribe(res => {
      this.pictures.push(res);
    });
  }

  deletePicture(id: string): void {
    this.picturesService.deletePicture(id).subscribe(res => {
      this.pictures = this.pictures.filter(pic => pic._id !== id);
    });
  }



}
