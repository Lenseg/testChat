import { Component, ViewChild, ElementRef } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { PerfectScrollbarDirective } from 'angular2-perfect-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Observable<firebase.User>;
  items: FirebaseListObservable<any[]>;
  @ViewChild('chatbox') chatbox:ElementRef;
  @ViewChild('chatboxContent') chatboxContent:ElementRef;
  @ViewChild(PerfectScrollbarDirective) chatboxDir:PerfectScrollbarDirective;
  msgVal: string = '';
  uid:string;
  chatStart:Date;
  scrollbarConfig = {
    suppressScrollX:true
  };
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {

    this.items = af.list('/messages', {
      query: {
        limitToLast: 50
      }
    });
    this.items.subscribe(snapshots => {
      this.chatStart = new Date(snapshots[0].time);
      snapshots.forEach(snapshot => {
        if(this.uid !== snapshot.sender)
          this.items.update(snapshot.$key, { read: true })
      });
    })
    this.user = this.afAuth.authState;
    this.afAuth.authState.subscribe(user => this.uid = user.uid || 'Anon' );
    this.login();
  }

  login() {
    this.afAuth.auth.signInAnonymously();
  }

  logout() {
      this.afAuth.auth.signOut();
  }

  Send(desc: string) {
      let time = new Date();
      this.items.push({
        sender:this.uid,
        message: desc,
        time: time.getTime(),
        read:false
      });
      this.msgVal = '';
      this.scollDown();
  }
  isToday(message){
    let time = new Date(message.time);
    let today = new Date();
    console.log(time.getDay() === today.getDay(),'today');
    return time.getDay() === today.getDay();
  }
  newDay(message,messageprev){
    if(!messageprev)
      return false;
    let time = new Date(messageprev.time);
    let today = new Date(message.time);
    return time.getDay() === today.getDay();
  }
  scollDown(){
    this.chatbox.nativeElement.scrollTop = this.chatboxContent.nativeElement.offsetHeight - this.chatbox.nativeElement.offsetHeight;
    this.chatboxDir.update();
  }
}
