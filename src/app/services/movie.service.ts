import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { MovieSearch, MovieById } from '../models/movie.interface';

const API: string = 'http://www.omdbapi.com/';
const KEY: string = '';

@Injectable({
    providedIn: 'root'
})
export class MovieService {
    constructor(private http: HttpClient) {}

    searchMovie(query: string): Observable<MovieSearch[]> {
        return this.http
            .get<MovieSearch[]>(`${API}?s=${query}&${KEY}`)
            .pipe(pluck('Search'));
    }

    searchById(query: string): Observable<MovieById> {
        return this.http.get<MovieById>(`${API}?i=${query}&${KEY}`);
    }
}
