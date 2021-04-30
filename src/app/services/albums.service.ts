import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Album } from '@shared/models/album.model';


@Injectable({
  providedIn: 'root'
})
export class AlbumsService {

  constructor(
    private http: HttpClient
  ) { }

  getAlbums(): Observable<Album[]>{
    return this.http.get<Album[]>('http://localhost:3000/api/albums/').pipe(
      map((albums: Album[] ) => {
        return albums;
      })
    );
  }

  postAlbum(name: string): Observable<Album>{
    const postData: Album = {name, _id: '', pictures: []};
    return this.http.post('http://localhost:3000/api/albums/', postData).pipe(
      map((post: any) => {
        return post;
      })
    );
  }

  updateAlbum(album: Album): Observable<Album>{
    return this.http.patch('http://localhost:3000/api/albums/' + album._id,album).pipe(
      map((album: any) => {
        return album;
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

}
