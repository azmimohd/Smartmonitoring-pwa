import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.services';
import * as moment from 'moment-timezone';

/*
Note that we import the moment-timezone package, not the moment package because this way
 we can use the methods of the moment-timezone package as well as the methods of the moment 
 package because the moment-timezone package exports them.
 */

export interface Event {
  id?: string;
  title: any;
  desc?: string;
  avatar?: string;
  startTime: any; //any type because Firebase uses string, but our calendar uses Date
  endTime: any; //idem
  allDay: boolean;
  alarm?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventCollection: AngularFirestoreCollection<Event>;
  private events: Observable<Event[]>;

  //Users only can access to its own events
  constructor(public db: AngularFirestore, private authService: AuthService) {
    this.eventCollection = db.collection<Event>('events');
    this.events = this.eventCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getEvents() {
    return this.events;
  }

  getEvent(id) {
    return this.eventCollection.doc<Event>(id).valueChanges();
  }

  updateEvent(event: Event, id: string) {
    return this.eventCollection.doc(id).update(event);
  }

  addEvent(event: Event) {
    return this.eventCollection.add(event);
  }

  removeEvent(id) {
    return this.eventCollection.doc(id).delete();
  }

  getNextAllDayEvents(numberOfEvents) {
    var currentDate =  moment().format("YYYY-MM-DDTHH:mm");
    console.log("currentDate:" + currentDate);
    return this.db.collection<Event>('events', ref => ref.where('startTime','>=', currentDate).limit(numberOfEvents)).snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }


}
