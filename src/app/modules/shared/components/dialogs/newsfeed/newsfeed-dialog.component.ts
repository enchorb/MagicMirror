/* tslint:disable:max-line-length */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { ModuleService } from '../../../../../services/module.service';
import { User } from '../../../../../models/user.model';
import { UserService } from '../../../../../services/user.service';
import { NewsFeedService } from '../../../../../services/newsfeed.service';

@Component({
  selector: 'app-newsfeed-dialog',
  templateUrl: 'newsfeed-dialog.component.html',
  styleUrls: ['./newsfeed-dialog.component.css'],
})

export class NewsFeedDialogComponent implements OnInit, OnDestroy {
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

  newsfeedArray: Array<any> = []; selectCnt; loading;

  constructor(public moduleService: ModuleService, private userService: UserService, private newsfeedService: NewsFeedService, private dialogRef: MatDialogRef<NewsFeedDialogComponent>) {}

  ngOnInit() {
    this.newsfeedArray = [];
    this.selectCnt = 0;
    this.loading = true;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.newsfeedService.sourceList.length; i++) {
      this.newsfeedArray.push({
        display: false,
        name: this.newsfeedService.sourceList[i].split('-').join(' ').toUpperCase(),
        image: `./../../../../../../assets/news-icons/${this.newsfeedService.sourceList[i]}.png`,
      });
    }
    // tslint:disable-next-line:prefer-for-of
    for (let j  = 0; j < this.moduleService.newsfeed.sources.length; j++) {
      this.newsfeedArray[this.moduleService.newsfeed.sources[j]].display = true;
      this.selectCnt++;
    }
    this.newsfeedArray.sort();
  }

  ngOnDestroy() {
    this.moduleService.newsfeed.sources = [];
    for (let i = 0; i < this.newsfeedArray.length; i++) {
      if (this.newsfeedArray[i].display === true) {
        this.moduleService.newsfeed.sources.push(i);
      }
    }

    this.moduleService.emit(this.moduleService.newsfeed.sources);

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

  onLoad() {
    this.loading = false;
  }

  onCheck(check, i) {
    if (check) {
      this.selectCnt++;
    } else if (!check) {
      this.selectCnt--;
    }
  }
}
