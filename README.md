# InternNovomaticBackend

This is example usage of created nodeJS/express backend in angular app. It uses mongoDB as it's database.

# Backend files
- server.js
- backend/*

# How to start server
Run `npm run server.js`

# Config
1. Provide your own mongo database at backend/app

2. Install dependiecies (if not downloading whole project and running `npm install`)
- express `npm i express`
- mongoose `npm i mongoose`
- body-parser `npm i body-parser`
- multer `npm i multer`

3. Optional
- nodemon `npm i nodemon` for automatic server restart on change, then `nodemon run server.js`
- running dev server on localhost:3000 then go to server js and change
```
const port = normalizePort(process.env.PORT || "3000");
```
to
```
const port = normalizePort("4000");
```

# How it works
1. Options
<b>server.js</b> and <b>app.js</b> are the main files for making changes to all

2. Files uploading
The files are always uploaded to "local" folder, but this folder becomes our storage as soon as we host the website on the web. Server will be using hosting's storage space for all images, those are available always to those visiting the websites, but will be lost should the hosting change and not move /img files to the new one. Alternative to this would be storing files in MongoDB with GridFS, but for most cases "local" upload will suffice.

# Usage
1. TS Example (Angular) - get()
```
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Picture } from '@shared/models/picture.model';

// [...your class, injectable etc.]
  constructor(
    private http: HttpClient
  ) { }

// returns observable wherever needed, subscribe later
  getPosts(): Observable<Album[]>{
    return this.http.get<Album[]>('http://localhost:3000/api/posts/').pipe(
      map((albums: Album[] ) => {
        return albums;
      })
    );
  }
```

2. TS Example (angular) - post()
```

// need to make your picture into FormData for multer
  private makePostData(picture: Picture, img: File): FormData{
    const postData = new FormData();
    postData.append('title', picture.name);
    postData.append('description', picture.description);
    postData.append('image', img, picture.name);

    return postData;
  }
```

2. JS Exaple
```

```

# Endpoints
1. Albums
getAll: get('albums')

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.


