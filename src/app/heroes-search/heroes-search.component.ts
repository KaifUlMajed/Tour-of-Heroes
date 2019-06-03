import { HeroService } from './../services/hero.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Hero } from '../heroes/hero';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-heroes-search',
  templateUrl: './heroes-search.component.html',
  styleUrls: ['./heroes-search.component.css']
})
export class HeroesSearchComponent implements OnInit {

  heroes$: Observable<Hero[]>;
  private searchName = new Subject<string>();

  constructor(private service: HeroService) { }

  ngOnInit() {
    this.heroes$ = this.searchName
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((name: string) => this.service.searchHeroes(name))
      );
  }

  searchHeroes(name: string) {
    this.searchName.next(name);
  }
}
