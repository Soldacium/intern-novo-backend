# InternNovomaticBackend

This is example usage of created nodeJS/express backend in angular app. It uses mongoDB as it's database.

## Backend files
- server.js
- backend/*

## How to start server
Run `npm run server.js`

## Config
1. Provide your own mongo database at backend/app.js like so:
```
`mongodb+srv://{LOGIN}:${PASSWORD}@testingcluster.rgayz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, { useNewUrlParser: true , useUnifiedTopology: true}
```
and delete keys.js import, it's there for development security reasons while uploading to github.

2. Install dependiecies (if you're just downloading server files and inserting them into project)
- express `npm i express`
- mongoose `npm i mongoose`
- body-parser `npm i body-parser`
- multer `npm i multer`
OR insert dependencies into package.json and `npm install`
```
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "mongoose": "^5.12.7",
    "multer": "^1.4.2",
    "nodemon": "^2.0.7",
```

3. Optional
- nodemon `npm i nodemon` for automatic server restart on change, then `nodemon run server.js`
- if you're running your app's dev server on localhost:3000 then go to server.js and change
```
const port = normalizePort(process.env.PORT || "3000");
```
to
```
const port = normalizePort("4000");
```


## How it works
1. Options
<b>server.js</b> and <b>app.js</b> are the main files for making changes to all

2. Files uploading
The files are always uploaded to "local" folder, but this folder becomes our storage as soon as we host the website on the web. Server will be using hosting's storage space for all images, those are available always to those visiting the websites, but will be lost should the hosting change and not move /img files to the new one. Alternative to this would be storing files in MongoDB with GridFS, but for most cases "local" upload will suffice.

## Usage
1. TS Example (Angular) - get() and post()
```
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Picture } from '@shared/models/picture.model';

  // <<< [...your class, injectable etc.]

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

  postPicture(picture: Picture, file: File): Observable<Picture>{
    const pictureData = this.makePostData(picture, file)
    return this.http.post('http://localhost:3000/api/pictures/',pictureData).pipe(
        map((picture: any) => {
            return picture;
        })
    );
  }
  // need to make your picture into FormData for multer
  private makePostData(picture: Picture, img: File): FormData{
    const postData = new FormData();
    postData.append('title', picture.name);
    postData.append('description', picture.description);
    postData.append('image', img, picture.name);

    return postData;
  }
```

2. JS Exaple using axios
```
import axios from 'axios';

  let albums = [];
  let pictures = [];

  getAlbums(){
    axios.get('http://localhost:3000/api/albums/')
    .then(albums => {
        albums = albums;
    }); 
  }

  postPicture(picture, file){
    const pictureData = this.makePostData(picture, file)
    axios.post('http://localhost:3000/api/albums/',pictureData).then(picture => {
        pictures.push(picture);
    });
  }

  private makePostData(picture: Picture, img: File){
    const postData = new FormData();
    postData.append('title', picture.name);
    postData.append('description', picture.description);
    postData.append('image', img, picture.name);

    return postData;
  }


```

## Endpoints
1. Albums
POST
- `/albums/` - adds new album to database
- `/albums/:id/pictures` - adds new picure to album
GET
- `/albums/` - returns all albums
- `/albums/:id` - returns album
DELETE
- `/albums/` - deletes album
- `/albums/:id/pictures/:pictureId` - deletes picture ref from album
PATCH
- `/album/:id` - updates whole album (name, desc)

2. Pictures
POST
- `/pictures/` - adds new picture to database
GET
- `/pictures/` - returns all pictures
- `/pictures/:id` - returns picture
DELETE
- `/pictures/:id` - deletes picture and all references to it
PATCH
- `/pictures/:id` - update picture (name, desc)

You can also check the endpoints by un-commenting the following code:
```
let route, routes = [];

app._router.stack.forEach(function(middleware){
    if(middleware.route){ // routes registered directly on the app
        routes.push(middleware.route);
    } else if(middleware.name === 'router'){ // router middleware 
        middleware.handle.stack.forEach(function(handler){
            route = handler.route;
            route && routes.push(route);
        });
    }
});

console.log(routes);
```
and restarting server, routes will be visible in the console.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


