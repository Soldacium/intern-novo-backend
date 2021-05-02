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

  postPicture(picture: Picture, file: File){
    const pictureData = this.makePostData(picture, file)
    return this.http.post('http://localhost:3000/api/pictures/',pictureData).pipe(
        map((picture: any) => {
            return picture
        })
    );
  }

  deletePicture(id: string){
    console.log(id);
    return this.http.delete('http://localhost:3000/api/pictures/'+id).pipe(
      map((picture: any) => {
        return picture;
      })
    )
  }

  /*

  getPost(postID: string): Observable<Post>{
    return this.http.get<Post>('http://localhost:3000/api/posts/' + postID).pipe(
      map((post: Post) => {
        return post;
      })
    );
  }

  postPost(post: Post, img: File){
    const postData = this.makePostData(post, img);
    console.log(postData, img);
    return this.http.post('http://localhost:3000/api/posts/', postData).pipe(
      map((post: any) => {
        return post;
      })
    );
  }

  deletePost(postID: string): Observable<Post>{
    return this.http.delete<Post>('http://localhost:3000/api/posts/' + postID).pipe(
      map((post) => {
        return post;
      })
    );
  }
  */

  private makePostData(picture: Picture, img: File): FormData{
    const postData = new FormData();
    console.log(picture);
    postData.append('name', picture.name);
    postData.append('description', picture.description);
    postData.append('image', img, picture.name);

    return postData;
  }

}
