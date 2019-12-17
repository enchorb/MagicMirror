import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { ModuleService } from './module.service';

@Injectable()
export class UserService {
  usersCollection: AngularFirestoreCollection<User>;
  usersDocument: AngularFirestoreDocument<User>;
  users: Observable<User[]>;

  constructor(public afs: AngularFirestore, public moduleService: ModuleService) {
    this.usersCollection = this.afs.collection('users', ref => ref.orderBy('name', 'asc'));

    this.users = this.usersCollection.snapshotChanges(['added', 'removed', 'modified']).pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as User;
          data.id = a.payload.doc.id;
          return data;
        });
      }));
  }

  getUsers() {
    return this.users;
  }

  addUser(user: User) {
    this.usersCollection.add(user);
  }

  selectUser(user: User) {
    this.moduleService.user.id = user.id;
    this.moduleService.user.name = user.name;
    this.moduleService.ui.setup = false;
    this.moduleService.datetime.display = user.datetime.display;
    this.moduleService.datetime.top = user.datetime.top;
    this.moduleService.datetime.left = user.datetime.left;
    this.moduleService.datetime.clockFormat = user.datetime.clockFormat;
    this.moduleService.greeting.display = user.greeting.display;
    this.moduleService.greeting.top = user.greeting.top;
    this.moduleService.greeting.left = user.greeting.left;
    this.moduleService.newsfeed.display = user.newsfeed.display;
    this.moduleService.newsfeed.top = user.newsfeed.top;
    this.moduleService.newsfeed.left = user.newsfeed.left;
    this.moduleService.newsfeed.sources = user.newsfeed.sources;
    this.moduleService.newsfeed.type = user.newsfeed.type;
    this.moduleService.weather.display = user.weather.display;
    this.moduleService.weather.top = user.weather.top;
    this.moduleService.weather.left = user.weather.left;
    this.moduleService.weather.city = user.weather.city;
    this.moduleService.weather.country = user.weather.country;
    this.moduleService.weather.unit = user.weather.unit;
  }

  updateUser(user: User) {
    this.usersDocument = this.afs.doc(`users/${user.id}`);
    this.usersDocument.update(user);
  }

  deleteUser(user: User) {
    this.usersDocument = this.afs.doc(`users/${user.id}`);
    this.usersDocument.delete();
  }
}
