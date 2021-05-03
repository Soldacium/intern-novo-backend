import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Picture } from '@shared/models/picture.model';

@Injectable({
  providedIn: 'root'
})
export class PicturesService {

  constructor(
    private http: HttpClient
  ) { }

  getPictures(): Observable<Picture[]>{
    return this.http.get<Picture[]>('http://localhost:3000/api/pictures/').pipe(
        map((albums: Picture[] ) => {
            return albums;
        })
    );
  }

  postPicture(picture: Picture, file: File): Observable<Picture>{
    const pictureData = this.makePostData(picture, file)
    return this.http.post('http://localhost:3000/api/pictures/',pictureData).pipe(
        map((picture: any) => {
            return picture;
        })
    );
  }

  deletePicture(id: string): Observable<any>{
    console.log(id);
    return this.http.delete('http://localhost:3000/api/pictures/'+id).pipe(
      map((picture: any) => {
        return picture;
      })
    );
  }

  updatePicture(picture: Picture, file?: File): Observable<Picture>{
    let pictureData;
    if (file) pictureData = this.makePostData(picture,file)
    return this.http.patch('http://localhost:3000/api/pictures/'+picture._id,picture).pipe(
      map((picture: any) => {
        return picture;
      })
    )
  } 

  private makePostData(picture: Picture, img: File): FormData{
    const postData = new FormData();
    console.log(picture);
    postData.append('name', picture.name);
    postData.append('description', picture.description);
    postData.append('image', img, picture.name);

    return postData;
  }

}
