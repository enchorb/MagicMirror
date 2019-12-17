/* tslint:disable:max-line-length triple-equals */
import {Component, OnInit, ViewChild, ElementRef, Renderer2, OnDestroy} from '@angular/core';
import { animate, transition, style, trigger, state } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { ModuleService } from '../../../../services/module.service';
import { CdkDragEnd } from '@angular/cdk/drag-drop';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user.model';
import { ComplimentService } from '../../../../services/compliment.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.css'],
  // tslint:disable-next-line:use-host-property-decorator no-host-metadata-property
  host: {
    '(window:resize)': 'onWindowResize()'
  },
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 1
      })),
      state('init', style({
        opacity: 1
      })),
      state('new', style({
        opacity: 1
      })),
      transition('void => init, new => init', [
        style({opacity: '0', transition: 'opacity 1s ease-in-out'}),
        animate(2000)
      ]),
      transition('init => new', [
        style({opacity: '0', transition: 'opacity 1s ease-in-out'}),
        animate(2000)
      ]),
    ]),
  ]
})

export class GreetingComponent implements OnInit, OnDestroy {
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

  compliment; currTimeHour; currTimeMin; currTime; prevIndex;

  isAnimate: boolean; interval;

  @ViewChild('greeting', {static: true}) greeting: ElementRef;
  @ViewChild('comp', {static: true}) comp: ElementRef;

  constructor(public moduleService: ModuleService, private userService: UserService, private complimentService: ComplimentService, private renderer: Renderer2, private datePipe: DatePipe) {}

  ngOnInit() {
    this.isAnimate = true;
    this.prevIndex = null;

    this.renderer.setStyle(this.greeting.nativeElement, 'transform',
      ('translate(' + (this.moduleService.greeting.left * window.innerWidth).toString() + 'px,'
        + (this.moduleService.greeting.top * window.innerHeight).toString() + 'px').toString());

    this.currTimeHour = (parseFloat((this.datePipe.transform(new Date(), 'H')).toString()));
    this.currTimeMin = (((parseFloat((this.datePipe.transform(new Date(), 'mm')).toString())) * (5 / 3)).toString());
    this.currTime = ((parseFloat((this.currTimeHour + '.' + this.currTimeMin).toString())).toFixed(2));
    this.compliment = this.randomCompliment(this.currTime);

    this.interval = setInterval(() => {
      this.isAnimate = !this.isAnimate;
      this.currTimeHour = (parseFloat((this.datePipe.transform(new Date(), 'H')).toString()));
      this.currTimeMin = (((parseFloat((this.datePipe.transform(new Date(), 'mm')).toString())) * (5 / 3)).toString());
      this.currTime = ((parseFloat((this.currTimeHour + '.' + this.currTimeMin).toString())).toFixed(2));
      this.compliment = this.randomCompliment(this.currTime - 0.85);
    }, 300000); // 300000 = 5 Min
  }

  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  randomCompliment(currTime) {
    let carray; let cindex;

    if ((currTime >= this.complimentService.timing.morningStartTime) && (currTime <= this.complimentService.timing.morningEndTime)) {
      carray = this.complimentService.compliments.anytime.concat(this.complimentService.compliments.morning);
    } else
    if (currTime == 12) { // Error? Test On Noon
      carray = this.complimentService.compliments.noon;
    } else
    if ((currTime >= this.complimentService.timing.afternoonStartTime) && (currTime <= this.complimentService.timing.afternoonEndTime)) {
      carray = this.complimentService.compliments.anytime.concat(this.complimentService.compliments.afternoon);
    } else
    if ((currTime >= this.complimentService.timing.eveningStartTime) && (currTime <= this.complimentService.timing.eveningEndTime)) {
      carray = this.complimentService.compliments.anytime.concat(this.complimentService.compliments.evening);
    } else
    if (((currTime >= this.complimentService.timing.nightStartTime) && (currTime <= 24)) || ((currTime <= this.complimentService.timing.nightEndTime))) {
      carray = this.complimentService.compliments.anytime.concat(this.complimentService.compliments.night);
    }

    cindex = Math.floor(Math.random() * carray.length);

    if (this.prevIndex === cindex) {
      this.prevIndex = Math.floor(Math.random() * carray.length);
      return carray[this.prevIndex];
    } else {
      this.prevIndex = cindex;
      return carray[cindex];
    }
  }

  onWindowResize() {
    this.renderer.setStyle(this.greeting.nativeElement, 'transform',
      ('translate(' + (this.moduleService.greeting.left * window.innerWidth).toString() + 'px,'
        + (this.moduleService.greeting.top * window.innerHeight).toString() + 'px').toString());
  }

  onDragEnd(event: CdkDragEnd) {
    if (Math.floor(this.greeting.nativeElement.getBoundingClientRect().y) > 0) {
      this.moduleService.greeting.top = (((Math.floor(this.greeting.nativeElement.getBoundingClientRect().y)) / window.innerHeight));
    } else { this.moduleService.greeting.top = 0; }
    if (Math.floor(this.greeting.nativeElement.getBoundingClientRect().x) > 0) {
      this.moduleService.greeting.left = (((Math.floor(this.greeting.nativeElement.getBoundingClientRect().x)) / window.innerWidth));
    } else { this.moduleService.greeting.left = 0; }

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
