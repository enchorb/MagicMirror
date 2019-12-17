import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

// Material
import {
  MatButtonModule,
  MatRippleModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MAT_DIALOG_DEFAULT_OPTIONS,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatCheckboxModule,
  MatSlideToggleModule
} from '@angular/material';

// Components
import { SetupComponent } from './components/setup/setup.component';
import { WeatherComponent } from './components/weather/weather.component';
import { GreetingComponent } from './components/greeting/greeting.component';
import { DateTimeComponent } from './components/datetime/datetime.component';
import { ModuleDialogComponent } from './components/dialogs/module/module-dialog.component';
import { NewsFeedComponent } from './components/newsfeed/newsfeed.component';
import { NewsFeedDialogComponent } from './components/dialogs/newsfeed/newsfeed-dialog.component';

// Pipes
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    DragDropModule,
    ScrollingModule,
  ],
  declarations: [
    SetupComponent,
    WeatherComponent,
    NewsFeedComponent,
    GreetingComponent,
    DateTimeComponent,
    ModuleDialogComponent,
    NewsFeedDialogComponent,
    CapitalizePipe,
  ],
  entryComponents: [
    ModuleDialogComponent,
    NewsFeedDialogComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    DragDropModule,
    ScrollingModule,
    SetupComponent,
    WeatherComponent,
    NewsFeedComponent,
    GreetingComponent,
    DateTimeComponent,
    ModuleDialogComponent,
    NewsFeedDialogComponent,
    CapitalizePipe,
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}}]
})

export class SharedModule { }
