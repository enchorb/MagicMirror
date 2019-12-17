/* tslint:disable:max-line-length */
import {Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, HostListener} from '@angular/core';
import { ModuleService } from '../../../../services/module.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user.model';
import { NewsFeedService } from '../../../../services/newsfeed.service';
import { MatDialog } from '@angular/material';
import { NewsFeedDialogComponent } from '../dialogs/newsfeed/newsfeed-dialog.component';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css'],
})

export class NewsFeedComponent implements OnInit, OnDestroy {
  user: User  = {
    id: '',
    name: '',
    datetime: {
      display: false,
      top: 0,
      left: 0,
      clockFormat: false,
    },
    greeting: {
      display: false,
      top: 0,
      left: 0,
    },
    newsfeed: {
      display: false,
      top: 0,
      left: 0,
      sources: [],
      type: false,
    },
    weather: {
      display: false,
      top: 0,
      left: 0,
      city: '',
      country: '',
      unit: ''
    },
  };

  newSub; topSub;

  newsArray: Array<any> = []; topArray: Array<any> = [];

  @ViewChild('newsfeed', {static: true}) newsfeed: ElementRef;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.renderer.setStyle(this.newsfeed.nativeElement, 'transform',
      ('translate(' + (this.moduleService.newsfeed.left * window.innerWidth).toString() + 'px,'
        + (this.moduleService.newsfeed.top * window.innerHeight).toString() + 'px').toString());
  }

  constructor(public moduleService: ModuleService, private userService: UserService, private newsfeedService: NewsFeedService, private renderer: Renderer2, private dialog: MatDialog) {}

  ngOnInit() {
    this.renderer.setStyle(this.newsfeed.nativeElement, 'transform',
      ('translate(' + (this.moduleService.newsfeed.left * window.innerWidth).toString() + 'px,'
        + (this.moduleService.newsfeed.top * window.innerHeight).toString() + 'px').toString());

    this.topSub = this.newsfeedService.getTopNews(this.moduleService.weather.country).subscribe((data: any) => {
      if (this.newsfeedService.tinit === true) {
        this.topArray = [];
      }
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data.articles.length; i++) {
        this.newsfeedService.tinit = false;
        this.topArray.push({
          article: data.articles[i],
        });
      }
    });

    this.newSub = this.newsfeedService.getNews().subscribe((data: any) => {
      if (this.newsfeedService.ninit === true) {
        this.newsArray = [];
      }
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data.articles.length; i++) {
        this.newsfeedService.ninit = false;
        this.newsArray.push({
          article: data.articles[i],
        });
      }
      this.newsArray.sort(() => Math.random() - 0.5);
    });
  }

  ngOnDestroy() {
    this.newSub.unsubscribe();
    this.topSub.unsubscribe();
  }

  onSetup() {
    this.dialog.open(NewsFeedDialogComponent, {
      width: '40%',
      height: '60%'
    });
  }

  onDragEnd(event: CdkDragEnd) {
    if (Math.floor(this.newsfeed.nativeElement.getBoundingClientRect().y) > 0) {
      this.moduleService.newsfeed.top = (((Math.floor(this.newsfeed.nativeElement.getBoundingClientRect().y)) / window.innerHeight));
    } else { this.moduleService.newsfeed.top = 0; }
    if (Math.floor(this.newsfeed.nativeElement.getBoundingClientRect().x) > 0) {
      this.moduleService.newsfeed.left = (((Math.floor(this.newsfeed.nativeElement.getBoundingClientRect().x)) / window.innerWidth));
    } else { this.moduleService.newsfeed.left = 0; }

    this.user.id = this.moduleService.user.id;
    this.user.name = this.moduleService.user.name;
    this.user.datetime.display = this.moduleService.datetime.display;
    this.user.datetime.top = this.moduleService.datetime.top;
    this.user.datetime.left = this.moduleService.datetime.left;
    this.user.datetime.clockFormat = this.moduleService.datetime.clockFormat;
    this.user.greeting.display = this.moduleService.greeting.display;
    this.user.greeting.top = this.moduleService.greeting.top;
    this.user.greeting.left = this.moduleService.greeting.left;
    this.user.newsfeed.display = this.moduleService.newsfeed.display;
    this.user.newsfeed.top = this.moduleService.newsfeed.top;
    this.user.newsfeed.left = this.moduleService.newsfeed.left;
    this.user.newsfeed.sources = this.moduleService.newsfeed.sources;
    this.user.newsfeed.type = this.moduleService.newsfeed.type;
    this.user.weather.display = this.moduleService.weather.display;
    this.user.weather.top = this.moduleService.weather.top;
    this.user.weather.left = this.moduleService.weather.left;
    this.user.weather.city = this.moduleService.weather.city;
    this.user.weather.country = this.moduleService.weather.country;
    this.user.weather.unit = this.moduleService.weather.unit;

    this.userService.updateUser(this.user);
  }
}
