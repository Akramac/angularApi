import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import {Movie} from '../Model/Movie';

const API_URL: string = 'http://localhost:8000';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private headers;
  constructor(private http:Http) {
    this.init();
   }

   async init() {
           this.headers = new Headers({
               Authorization: 'Bearer '
           });
       }
   getMovies():Observable<Movie[]>{

     return this.http.get(API_URL+'/movies',
      new RequestOptions({headers:this.headers}))
      .map(res=>{
        let modifiedResult=res.json();
        modifiedResult=modifiedResult.map(function(movie){
          movie.isUpdating=false;
          return movie;
        });
        return modifiedResult;
      });
   }
   increaseCount(id):Observable<Movie>{
     return this.http.post(API_URL+'/movies/'+id+'/count',{},
            new RequestOptions({headers:this.headers}))
            .map(res=>res.json());
   }

   addMovie(movie):Observable<Movie>{
     return this.http.post(API_URL+'/movies',movie,
      new RequestOptions({headers:this.headers}))
      .map(res=>res.json())


   }

}
