import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { animate, transition, style, trigger } from '@angular/animations';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user.model';
import { ModuleService } from '../../../../services/module.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css'],
  animations: [
    trigger('flyInOut', [
      transition('void => user', [
        style({webkitTransform: 'translateX(-100%)', transform: 'translateX(-100%)'}),
        animate(250),
      ]),
      transition('user => name, user => exist, name => weather, weather => user', [
        animate(300, style({webkitTransform: 'translateX(100%)', transform: 'translateX(100%)'})),
        style({display: 'none'}),
        animate(1, style({webkitTransform: 'translateX(-200%)', transform: 'translateX(-200%)'})),
        style({display: 'inherit'}),
        animate(300, style({webkitTransform: 'translateX(0)', transform: 'translateX(0)'})),
      ]),
      transition('name => user, exist => user, weather => name', [
        animate(300, style({webkitTransform: 'translateX(-100%)', transform: 'translateX(-100%)'})),
        style({display: 'none'}),
        animate(1, style({webkitTransform: 'translateX(200%)', transform: 'translateX(200%)'})),
        style({display: 'inherit'}),
        animate(300, style({webkitTransform: 'translateX(0)', transform: 'translateX(0)'})),
      ]),
    ]),
  ]
})

export class SetupComponent implements OnInit {
  user: User  = {
    name: '',
    datetime: {
      display: true,
      top: 0,
      left: 0.5,
      clockFormat: false,
    },
    greeting: {
      display: true,
      top: 0.75,
      left: 0,
    },
    newsfeed: {
      display: false,
      top: 0,
      left: 0,
      sources: [25, 27, 36], // NFL, Polygon, Verge
      type: false,
    },
    weather: {
      display: true,
      top: 0,
      left: 0,
      city: '',
      country: '',
      unit: ''
    }
  };

  animateState: string;
  animateTimer = timer(0, 300); tick; animateSub;

  newUserForm: FormGroup; weatherForm: FormGroup;

  @ViewChild('userPage', {static: true}) userPage: ElementRef;
  @ViewChild('namePage', {static: true}) namePage: ElementRef;
  @ViewChild('weatherPage', {static: true}) weatherPage: ElementRef;
  @ViewChild('existPage', {static: true}) existPage: ElementRef;

  constructor(private userService: UserService, private renderer: Renderer2, public moduleService: ModuleService) {
    this.newUserForm = new FormGroup({
      name: new FormControl('', [Validators.required])
    });

    this.weatherForm = new FormGroup({
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]{2}')]),
      unit: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.animateState = 'user';
    this.renderer.setStyle(this.userPage.nativeElement, 'display', 'inherit');
    this.renderer.setStyle(this.namePage.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.weatherPage.nativeElement, 'display', 'none');
    this.renderer.setStyle(this.existPage.nativeElement, 'display', 'none');
  }

  onNewClk() {
    this.animateState = 'name';
    this.animateSub = this.animateTimer.subscribe(t => {
      this.tick = t;
      if (this.tick === 1) {
        this.renderer.setStyle(this.userPage.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.namePage.nativeElement, 'display', 'inherit');
        this.renderer.setStyle(this.weatherPage.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.existPage.nativeElement, 'display', 'none');
        this.tick = 0;
        this.animateSub.unsubscribe();
      }
    });
  }

  onNewDone() {
    this.animateState = 'weather';
    this.animateSub = this.animateTimer.subscribe(t => {
      this.tick = t;
      if (this.tick === 1) {
        this.renderer.setStyle(this.userPage.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.namePage.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.weatherPage.nativeElement, 'display', 'inherit');
        this.renderer.setStyle(this.existPage.nativeElement, 'display', 'none');
        this.tick = 0;
        this.animateSub.unsubscribe();
      }
    });
  }

  onDone() {
    this.userService.addUser(this.user);

    this.animateState = 'user';
    this.animateSub = this.animateTimer.subscribe(t => {
      this.tick = t;
      if (this.tick === 1) {
        this.renderer.setStyle(this.userPage.nativeElement, 'display', 'inherit');
        this.renderer.setStyle(this.namePage.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.weatherPage.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.existPage.nativeElement, 'display', 'none');
        this.tick = 0;
        this.newUserForm.reset();
        this.weatherForm.reset();
        this.user.name = '';
        this.user.weather.city = '';
        this.user.weather.country = '';
        this.user.weather.unit = '';
        this.animateSub.unsubscribe();
      }
    });
  }

  onExistClk() {
    this.animateState = 'exist';
    this.animateSub = this.animateTimer.subscribe(t => {
      this.tick = t;
      if (this.tick === 1) {
        this.renderer.setStyle(this.userPage.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.namePage.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.weatherPage.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.existPage.nativeElement, 'display', 'inherit');
        this.tick = 0;
        this.newUserForm.reset();
        this.weatherForm.reset();
        this.user.name = '';
        this.user.weather.city = '';
        this.user.weather.country = '';
        this.user.weather.unit = '';
        this.animateSub.unsubscribe();
      }
    });
  }

  onSelectUser(event, user) {
    this.userService.selectUser(user);
  }

  onDeleteUser(event, user) {
    this.userService.deleteUser(user);
  }

  onFaceClk() {
    this.newUserForm.reset();
    this.weatherForm.reset();
    this.user.name = '';
    this.user.weather.city = '';
    this.user.weather.country = '';
    this.user.weather.unit = '';
  }

  onPrevName() {
    this.animateState = 'user';
    this.animateSub = this.animateTimer.subscribe(t => {
      this.tick = t;
      if (this.tick === 1) {
        this.renderer.setStyle(this.userPage.nativeElement, 'display', 'inherit');
        this.renderer.setStyle(this.namePage.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.weatherPage.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.existPage.nativeElement, 'display', 'none');
        this.tick = 0;
        this.newUserForm.reset();
        this.weatherForm.reset();
        this.user.name = '';
        this.user.weather.city = '';
        this.user.weather.country = '';
        this.user.weather.unit = '';
        this.animateSub.unsubscribe();
      }
    });
  }

  onPrevWeather() {
    this.animateState = 'name';
    this.animateSub = this.animateTimer.subscribe(t => {
      this.tick = t;
      if (this.tick === 1) {
        this.renderer.setStyle(this.userPage.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.namePage.nativeElement, 'display', 'inherit');
        this.renderer.setStyle(this.weatherPage.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.existPage.nativeElement, 'display', 'none');
        this.tick = 0;
        this.animateSub.unsubscribe();
      }
    });
  }

  onPrevExist() {
    this.animateState = 'user';
    this.animateSub = this.animateTimer.subscribe(t => {
      this.tick = t;
      if (this.tick === 1) {
        this.renderer.setStyle(this.userPage.nativeElement, 'display', 'inherit');
        this.renderer.setStyle(this.namePage.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.weatherPage.nativeElement, 'display', 'none');
        this.renderer.setStyle(this.existPage.nativeElement, 'display', 'none');
        this.tick = 0;
        this.animateSub.unsubscribe();
      }
    });
  }
}
