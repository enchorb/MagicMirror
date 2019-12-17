import {Injectable, OnDestroy} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

/*
  6 --> 1 EST
  9 --> 4 EST
  12 --> 7 EST
  15 --> 10 EST
  18 --> 13 EST
  21 --> 16 EST
  0/24 --> 19 EST
  3 --> 22 EST
*/

@Injectable()
export class WeatherService implements OnDestroy {
  apiKey; winterval; finterval;

  sun = {
    rise: 6,
    set: 20,
  };

  constructor(private http: HttpClient) {
    this.apiKey = '566fe00299b08e9e5c149c00bfec032f';
  }

  ngOnDestroy() {
    if (this.winterval) {
      clearInterval(this.winterval);
    }
    if (this.finterval) {
      clearInterval(this.finterval);
    }
  }

  getCurrentWeather(city, code, unit): Subject<any> {
    const dataSub = new Subject<any>();

    if (this.winterval) {
      clearInterval(this.winterval);
    }

    this.winterval = setInterval(() => {
      this.http.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city},${code}&units=${unit}&APPID=${this.apiKey}`)
        .subscribe((data) => {
          dataSub.next(data);
        }, (err) => {
          console.log(err);
        });
      return dataSub;
    }, 900000); // 900000 = 15min

    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city},${code}&units=${unit}&APPID=${this.apiKey}`)
      .subscribe((data) => {
        dataSub.next(data);
      }, (err) => {
        console.log(err);
      });
    return dataSub;
  }

  getCurrentForecast(city, code, unit): Subject<any> {
    const dataSub = new Subject<any>();

    if (this.finterval) {
      clearInterval(this.finterval);
    }

    this.finterval = setInterval(() => {
      this.http.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city},${code}&units=${unit}&APPID=${this.apiKey}`)
        .subscribe((data: any) => {
          dataSub.next(data);
        }, (err) => {
          console.log(err);
        });
      return dataSub;
    }, 900000); // 900000 = 15min

    this.http.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city},${code}&units=${unit}&APPID=${this.apiKey}`)
      .subscribe((data: any) => {
        dataSub.next(data);
      }, (err) => {
        console.log(err);
      });
    return dataSub;
  }
}
