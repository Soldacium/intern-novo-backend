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
    return this.http.get<Picture[]>('http://localhost:3000/api/posts/').pipe(
      map((albums: Picture[] ) => {
        return albums;
      })
    );
  }

  postPicture(name: string, file: File){
      return this.http.post('http://localhost:3000/api/posts/',name).pipe(
          map((picture: any) => {
              return picture
          })
      );
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

}
