import {Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy, HostListener} from '@angular/core';
import { ModuleService } from '../../../../services/module.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user.model';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.component.html',
  styleUrls: ['./datetime.component.css'],
})

export class DateTimeComponent implements OnInit, OnDestroy {
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
    }
  };

  Clock; interval;

  @ViewChild('datetime', {static: true}) datetime: ElementRef;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.renderer.setStyle(this.datetime.nativeElement, 'transform',
      ('translate(' + (this.moduleService.datetime.left * window.innerWidth).toString() + 'px,'
        + (this.moduleService.datetime.top * window.innerHeight).toString() + 'px').toString());
  }

  constructor(public moduleService: ModuleService, private userService: UserService, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.setStyle(this.datetime.nativeElement, 'transform',
      ('translate(' + (this.moduleService.datetime.left * window.innerWidth).toString() + 'px,'
        + (this.moduleService.datetime.top * window.innerHeight).toString() + 'px').toString());

    this.Clock = new Date();

    this.interval = setInterval(() => {
      this.Clock = Date.now();
    }, 1000);
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  onClockFormat() {
    this.moduleService.datetime.clockFormat = !this.moduleService.datetime.clockFormat;
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

  onDragEnd(event: CdkDragEnd) {
    if (Math.floor(this.datetime.nativeElement.getBoundingClientRect().y) > 0) {
      this.moduleService.datetime.top = (((Math.floor(this.datetime.nativeElement.getBoundingClientRect().y)) / window.innerHeight));
    } else { this.moduleService.datetime.top = 0; }
    if (Math.floor(this.datetime.nativeElement.getBoundingClientRect().x) > 0) {
      this.moduleService.datetime.left = (((Math.floor(this.datetime.nativeElement.getBoundingClientRect().x)) / window.innerWidth));
    } else { this.moduleService.datetime.left = 0; }

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
