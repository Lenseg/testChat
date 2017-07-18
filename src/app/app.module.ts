import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppComponent } from './app.component';
import { MessageComponent } from './message/message.component';
import { ControlBoardComponent } from './control-board/control-board.component';


import { PerfectScrollbarModule } from 'angular2-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'angular2-perfect-scrollbar';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

export const firebaseConfig = {
  apiKey: "AIzaSyBn9h1hSJIYkED0fkekGvwfwSwhRONtDm4",
  authDomain: "chatboxers.firebaseapp.com",
  databaseURL: "https://chatboxers.firebaseio.com",
  projectId: "chatboxers",
  storageBucket: "chatboxers.appspot.com",
  messagingSenderId: "432019098629"
};

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    ControlBoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
