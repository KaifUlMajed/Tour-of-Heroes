import { MessageService } from './message.service';
import { Hero } from './../heroes/hero';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  url = 'api/heroes';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(message);
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.url)
      .pipe(
        tap(_ => this.log('HeroService: Fetching heroes')),
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.url}/${id}`)
      .pipe(
        tap(_ => this.log('HeroService: Fetching hero with id=' + id)),
        catchError(this.handleError<Hero>('getHero', new Hero(0,'Unknown')))
      );
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.url, hero, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(_ => this.log(`updated hero with id: ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  createHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.url, hero, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(newHero => this.log(`created hero with id: ${newHero.id}`)),
      catchError(this.handleError<Hero>('createHero'))
    );
  }

  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    return this.http.delete<Hero>(`${this.url}/${id}`, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(_ => this.log(`deleted hero with id: ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(name: string): Observable<Hero[]> {
    if (!name.trim()) return of([]);
    return this.http.get<Hero[]>(`${this.url}/?name=${name}`)
      .pipe(
        tap(_ => this.log(`found heroes matching the name: ${name}`)),
        catchError(this.handleError<Hero[]>('searchHeroes', []))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
