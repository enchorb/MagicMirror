/* tslint:disable:max-line-length */
import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModuleService } from './module.service';
import { Subject } from 'rxjs';

@Injectable()
export class NewsFeedService implements OnDestroy {
  apiKey; ninit; ninterval; tinit; tinterval;

  sourceList = [
    'abc-news', // 0
    'ars-technica', // 1
    'associated-press', // 2
    'bbc-news', // 3
    'bleacher-report', // 4
    'bloomberg', // 5
    'business-insider', // 6
    'cbc-news', // 7
    'cbs-news', // 8
    'cnbc', // 9
    'cnn', // 10
    'crypto-coins-news', // 11
    'engadget', // 12
    'entertainment-weekly', // 13
    'espn', // 14
    'financial-post', // 15
    'financial-times', // 16
    'fox-news', // 17
    'google-news', // 18
    'ign', // 19
    'independent', // 20
    'medical-news-today', // 21
    'national-geographic', // 22
    'nbc-news', // 23
    'new-scientist', // 24
    'nfl-news', // 25
    'nhl-news', // 26
    'polygon', // 27
    'recode', // 28
    'reddit-r-all', // 29
    'reuters', // 30
    'rt', // 31
    'techcrunch', // 32
    'the-economist', // 33
    'the-globe-and-mail', // 34
    'the-new-york-times', // 35
    'the-verge', // 36
    'the-wall-street-journal', // 37
    'time', // 38
    'wired' // 39
  ];

  constructor(private http: HttpClient, public moduleService: ModuleService) {
    this.apiKey = '334e70741be94abf93ce7c89033d598f';
  }

  ngOnDestroy() {
    if (this.ninterval) {
      clearInterval(this.ninterval);
    }

    if (this.tinterval) {
      clearInterval(this.tinterval);
    }
  }

  getTopNews(country): Subject<any> {
    const dataSub = new Subject<any>();

    if (this.tinterval) {
      clearInterval(this.tinterval);
    }

    this.tinterval = setInterval(() => {
      this.tinit = true;
      this.http.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${this.apiKey}`)
        .subscribe((data) => {
          dataSub.next(data);
        }, (err) => {
          console.log(err);
        });
    }, 1800000); // 1800000 = 30min

    this.tinit = true;
    this.http.get(`https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${this.apiKey}`)
      .subscribe((data) => {
        dataSub.next(data);
      }, (err) => {
        console.log(err);
      });

    return dataSub;
  }

  getNews(): Subject<any> {
    const dataSub = new Subject<any>();

    if (this.ninterval) {
      clearInterval(this.ninterval);
    }

    this.ninterval = setInterval(() => {
      for (let i = 0; i < this.moduleService.newsfeed.sources.length; i++) {
        if (i === 0) { this.ninit = true; }
        this.http.get(`https://newsapi.org/v2/top-headlines?sources=${this.sourceList[this.moduleService.newsfeed.sources[i]]}&apiKey=${this.apiKey}`)
          .subscribe((data) => {
            dataSub.next(data);
          }, (err) => {
            console.log(err);
          });
      }
    }, 1800000); // 1800000 = 30min

    this.moduleService.newSubject.subscribe(sources => {
      for (let i = 0; i < this.moduleService.newsfeed.sources.length; i++) {
        if (i === 0) { this.ninit = true; }
        this.http.get(`https://newsapi.org/v2/top-headlines?sources=${this.sourceList[this.moduleService.newsfeed.sources[i]]}&apiKey=${this.apiKey}`)
          .subscribe((data) => {
            dataSub.next(data);
          }, (err) => {
            console.log(err);
          });
      }
    });

    for (let i = 0; i < this.moduleService.newsfeed.sources.length; i++) {
      if (i === 0) { this.ninit = true; }
      this.http.get(`https://newsapi.org/v2/top-headlines?sources=${this.sourceList[this.moduleService.newsfeed.sources[i]]}&apiKey=${this.apiKey}`)
        .subscribe((data) => {
          dataSub.next(data);
        }, (err) => {
          console.log(err);
        });
    }

    return dataSub;
  }
}
