import { Injectable } from '@angular/core';
import { ModuleService } from './module.service';

@Injectable()
export class ComplimentService {
  constructor(public moduleService: ModuleService) {}

  timing = {
    morningStartTime: 5,
    morningEndTime: 11.99,
    afternoonStartTime: 12.01,
    afternoonEndTime: 17.99,
    eveningStartTime: 18,
    eveningEndTime: 20.99,
    nightStartTime: 21,
    nightEndTime: 4.99,
  };

  weather = {};

  compliments = {
    anytime: [
      `Looking Good, ${this.moduleService.user.name}!`,
      `${this.moduleService.user.name} Is The Fairest Of Them All!`,
      'You Make My Data Circuits Skip A Clock Cycle!',
      'Being Awesome Is Hard, But You\'ll Manage.',
      'I Could Just Hang Here All Day!',
    ],
    morning: [
      `Good Morning, ${this.moduleService.user.name}!`,
      `Have A Great Day, ${this.moduleService.user.name}!`,
      `Top Of The Morning To You, ${this.moduleService.user.name}!`,
    ],
    noon: [
      `Good Noon, ${this.moduleService.user.name}!`,
    ],
    afternoon: [
      `Good Afternoon, ${this.moduleService.user.name}!`,
    ],
    evening: [
      `Good Evening, ${this.moduleService.user.name}!`,
      `Going Out Tonight, ${this.moduleService.user.name}?`,
    ],
    night: [
      `Good Night, ${this.moduleService.user.name}!`,
      `Sleep Tight, ${this.moduleService.user.name}!`
    ],
    birthday: [
      `Happy Birthday, ${this.moduleService.user.name}!`,
    ]
  };
}
