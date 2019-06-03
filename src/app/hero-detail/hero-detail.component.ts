import { HeroService } from './../services/hero.service';
import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../heroes/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  hero: Hero;

  constructor(private route: ActivatedRoute, private service: HeroService, private location: Location ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.service.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack() {
    this.location.back();
  }

  save() {
    this.service.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
