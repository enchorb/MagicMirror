/* tslint:disable:max-line-length */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ModuleService } from '../../../../../services/module.service';
import { User } from '../../../../../models/user.model';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-module-dialog',
  templateUrl: 'module-dialog.component.html',
  styleUrls: ['./module-dialog.component.css'],
})

export class ModuleDialogComponent implements OnInit, OnDestroy {
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

  constructor(public moduleService: ModuleService, private userService: UserService, private dialogRef: MatDialogRef<ModuleDialogComponent>) {}

  ngOnInit() {
  }

  ngOnDestroy() {
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

  onDblClkDateTime() {
    this.moduleService.datetime.display = !this.moduleService.datetime.display;
    this.moduleService.datetime.top = 0;
    this.moduleService.datetime.left = 0.5;
  }

  onDblClkGreeting() {
    this.moduleService.greeting.display = !this.moduleService.greeting.display;
    this.moduleService.greeting.top = 0.75;
    this.moduleService.greeting.left = 0;
  }

  onDblClkNewsFeed() {
    this.moduleService.newsfeed.display = !this.moduleService.newsfeed.display;
    this.moduleService.newsfeed.top = 0.35;
    this.moduleService.newsfeed.left = 0.4;
  }

  onDblClkWeather() {
    this.moduleService.weather.display = !this.moduleService.weather.display;
    this.moduleService.weather.top = 0;
    this.moduleService.weather.left = 0;
  }
}
