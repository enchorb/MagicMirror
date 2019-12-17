/* tslint:disable:max-line-length */
import {Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy, HostListener} from '@angular/core';
import { ModuleService } from '../../../../services/module.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user.model';
import { WeatherService } from '../../../../services/weather.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
})

export class WeatherComponent implements OnInit, OnDestroy {
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
      unit: '',
    }
  };

  weatherSub; forecastSub;

  weatherArray: Array<any> = []; forecastArray: Array<any> = [];

  @ViewChild('weather', {static: true}) weather: ElementRef;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.renderer.setStyle(this.weather.nativeElement, 'transform',
      ('translate(' + (this.moduleService.weather.left * window.innerWidth).toString() + 'px,'
        + (this.moduleService.weather.top * window.innerHeight).toString() + 'px').toString());
  }

  constructor(public moduleService: ModuleService, private userService: UserService, private weatherService: WeatherService, private renderer: Renderer2, private datePipe: DatePipe) {}

  ngOnInit() {
    this.renderer.setStyle(this.weather.nativeElement, 'transform',
      ('translate(' + (this.moduleService.weather.left * window.innerWidth).toString() + 'px,'
        + (this.moduleService.weather.top * window.innerHeight).toString() + 'px').toString());

    this.weatherSub = this.weatherService.getCurrentWeather(this.moduleService.weather.city, this.moduleService.weather.country, this.moduleService.weather.unit)
      .subscribe((data: any) => {
        this.weatherArray = [];
        const date = new Date();
        this.weatherService.sun.rise = new Date(data.sys.sunrise * 1000).getHours();
        this.weatherService.sun.set = new Date(data.sys.sunset * 1000).getHours();

        if (this.weatherService.sun.rise > this.weatherService.sun.set) {
          const temp = this.weatherService.sun.rise;
          this.weatherService.sun.rise = this.weatherService.sun.set;
          this.weatherService.sun.set = temp;
       }

        this.weatherArray.push({
         api: data,
         date: {
           month: date.getMonth() + 1,
            day: date.getDate(),
            hour_24: date.getHours(),
           hour_12: ((date.getHours() % 12 === 0) ? 12 : (date.getHours() % 12)),
           meridiem: ((date.getHours() / 12 >= 1) ? 'pm' : 'am'),
          },
          image: ((date.getHours() >= this.weatherService.sun.rise) && (date.getHours() <= this.weatherService.sun.set)) ?
            `./../../../../../assets/weather-icons/day/${data.weather[0].id}.png` :
            `./../../../../../assets/weather-icons/night/${data.weather[0].id}.png`,
        });
    });

    this.forecastSub = this.weatherService.getCurrentForecast(this.moduleService.weather.city, this.moduleService.weather.country, this.moduleService.weather.unit)
      .subscribe((data: any) => {
        this.forecastArray = [];
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < data.list.length; i++) {
          const date = new Date(data.list[i].dt * 1000);

          this.forecastArray.push({
            api: data.list[i],
            date: {
              month: date.getMonth() + 1,
              day: date.getDate(),
              hour_24: date.getHours(),
              hour_12: ((date.getHours() % 12 === 0) ? 12 : (date.getHours() % 12)),
              meridiem: ((date.getHours() / 12 >= 1) ? 'pm' : 'am'),
            },
            image: ((date.getHours() >= this.weatherService.sun.rise) && (date.getHours() <= this.weatherService.sun.set)) ?
              `./../../../../../assets/weather-icons/day/${data.list[i].weather[0].id}.png` :
              `./../../../../../assets/weather-icons/night/${data.list[i].weather[0].id}.png`,
          });
        }

        if (this.weatherArray[0].date.hour_24 === this.forecastArray[0].date.hour_24) {
        this.forecastArray.splice(this.forecastArray[0], 1);
      }
    });
  }

  ngOnDestroy() {
    this.weatherSub.unsubscribe();
    this.forecastSub.unsubscribe();
  }

  onDragEnd(event: CdkDragEnd) {
    if (Math.floor(this.weather.nativeElement.getBoundingClientRect().y) > 0) {
      this.moduleService.weather.top = (((Math.floor(this.weather.nativeElement.getBoundingClientRect().y)) / window.innerHeight));
    } else { this.moduleService.weather.top = 0; }
    if (Math.floor(this.weather.nativeElement.getBoundingClientRect().x) > 0) {
      this.moduleService.weather.left = (((Math.floor(this.weather.nativeElement.getBoundingClientRect().x)) / window.innerWidth));
    } else { this.moduleService.weather.left = 0; }

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
