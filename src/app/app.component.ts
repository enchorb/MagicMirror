import {Component, OnInit, OnDestroy, HostListener} from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModuleService } from './services/module.service';
import { ModuleDialogComponent } from './modules/shared/components/dialogs/module/module-dialog.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

/*
ng build --prod

TO FIX/DO:

Weather Final Layout + Responsive Design
Dialogs Responsive Design [Put Height/Width Control In CSS Of Dialog, Not Component]
*/

export class AppComponent implements OnInit, OnDestroy {
  screenWidth; screenHeight; userSub;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.moduleService.ui.screenOrientation = this.screenWidth >= this.screenHeight;
  }

  constructor(public moduleService: ModuleService, private dialog: MatDialog, private userService: UserService) {}

  ngOnInit() {
    this.userSub = this.userService.getUsers().subscribe(users => {
      this.moduleService.users = users;
    });

    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.moduleService.ui.screenOrientation = this.screenWidth >= this.screenHeight;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onSetup() {
    this.moduleService.ui.setup = true;
  }

  onAddModule() {
    this.dialog.open(ModuleDialogComponent, {
      width: '40%',
      height: '60%'
    });
  }
}
