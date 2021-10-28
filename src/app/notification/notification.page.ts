import { Component, OnInit } from '@angular/core';
import {LocalNotifications} from "@capacitor/local-notifications"
import { Capacitor } from '@capacitor/core';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  token:string=""
  usertoken :Observable<any>;
  constructor( public db:AngularFireDatabase) {

  this.usertoken = db.object('user').valueChanges();
   }

 ngOnInit(){
  console.log('Initializing HomePage');

  // Request permission to use push notifications
  // iOS will prompt user and return if they granted permission or not
  // Android will just grant without prompting
  PushNotifications.requestPermissions().then(result => {
    if (result.receive === 'granted') {
      // Register with Apple / Google to receive push via APNS/FCM
      PushNotifications.register();
    } else {
      // Show some error
    }
  });

  PushNotifications.addListener('registration', (token: Token) => {
    alert('Push registration success, token: ' + token.value);
    const itemRef = this.db.object('user');
    itemRef.update({ token: token.value });
  });

  PushNotifications.addListener('registrationError', (error: any) => {
    alert('Error on registration: ' + JSON.stringify(error));
  });

  PushNotifications.addListener(
    'pushNotificationReceived',
    (notification: PushNotificationSchema) => {
      alert('Push received: ' + JSON.stringify(notification));
    },
  );

  PushNotifications.addListener(
    'pushNotificationActionPerformed',
    (notification: ActionPerformed) => {
      alert('Push action performed: ' + JSON.stringify(notification));
    },
  );

 }

setNoti(){
  
  LocalNotifications.requestPermissions().then((Permissions)=>{
    if(Permissions.display == 'granted'){
      LocalNotifications.schedule({
        notifications: [
          {
            title: "aaaa",
            body: "Body",
            id: 1,
            smallIcon: 'house',
            actionTypeId: 'OPEN_PRODUCT',
            
            schedule: {
              every: "minute"
            },
  
            extra: null
          }
        ]
      });
    }
  })
}
}
