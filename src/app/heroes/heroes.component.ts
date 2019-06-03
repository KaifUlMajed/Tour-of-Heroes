import { HeroService } from './../services/hero.service';
import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  constructor(private service: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.service.getHeroes()
      .subscribe((heroes: Hero[]) => this.heroes = heroes);
  }

  createHero(name: string) {
    name = name.trim();
    if (!name) { return; }
    this.service.createHero({ name } as Hero)
      .subscribe(hero => this.heroes.push(hero));
  }

  deleteHero(hero: Hero) {
    this.service.deleteHero(hero)
      .subscribe(() => {
        this.heroes = this.heroes.filter(h => h.id != hero.id);
      });
  }
}
