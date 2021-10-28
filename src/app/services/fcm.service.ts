import { Injectable, OnInit } from '@angular/core';
import {PushNotifications} from '@capacitor/push-notifications'
import { Router } from '@angular/router';
import { addListener } from 'process';





@Injectable({
  providedIn: 'root'
})
export class FcmService implements OnInit{
  token:string="";
  

  constructor(private router: Router) { }

  ngOnInit(){
   /* PushNotifications.addListener("registration",(token)=>{
      this.token = token.value;
    })


    PushNotifications.addListener("pushNotificationReceived",(notification)=>{
      alert(JSON.stringify(notification));
    })
    PushNotifications.register();
  }
*/
}
}
