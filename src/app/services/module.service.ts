import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import {Subject} from 'rxjs';

@Injectable()
export class ModuleService {
  users: User[];

  user = { // User Data
    id: '',
    name: '',
  };
  ui = { // UI Preferences
    setup: true,
    screenOrientation: true, // True: Horizontal, False: Vertical
  };
  datetime = { // Date-Time Module Preferences
    display: false, // Toggle Module Display/Render On Screen
    top: 0, // Module Top-Left Y Coordinate
    left: 0, // Module Top-Left X Coordinate
    clockFormat: false, // True: 24 Hour Clock, False: Standard
  };
  greeting = { // Message-Of-The-Day Module Preferences
    display: false,
    top: 0,
    left: 0,
  };
  newsfeed = { // News Feed Module Preferences
    display: false,
    top: 0,
    left: 0,
    sources: [], // Index List Of Sources
    type: true, // False: Selected News, True: Top News
  };
  weather = { // Weather Module Preferences
    display: false,
    top: 0,
    left: 0,
    city: '', // City Name
    country: '', // 2-Digit Country Code
    unit: '' // Metric Or Imperial Units
  };

  newSubject = new Subject<Array<any>>();

  emit(value) {
    this.newSubject.next(value);
  }
}
