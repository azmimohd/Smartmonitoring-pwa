import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireObject } from '@angular/fire/compat/database';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  airmax: Observable<any>;
  itemRef: AngularFireObject<any>;
  relayData :Observable<any>;
  public TempMin;
  public TempMax;
  public humiMin;
  public humiMax;
  public phoneNum;
  public maxAirIn;
  public mode1: boolean = true;
  public mode2: boolean = true;
  public mode3: boolean = true;
  public mode4: boolean = true;
  public mode5: boolean = true;
  public mode6: boolean = true;
  public gsm: boolean = true;
  public RelaySelect;
  
  
  temperature: any = 24;
 
  public relay1Trig:boolean = false;
  public relay2Trig:boolean = false;
  public relay3Trig:boolean = false;
  public relay4Trig:boolean = false;
  public relay5Trig:boolean = true;
  public flashTrig:boolean = true;
  public gsmTrig:boolean = false;
  
  public relayone : any;

  constructor(public db:AngularFireDatabase,private afs: AngularFirestore,public toastCtrl:ToastController ,public auth: AngularFireAuth,public route:Router) 
  
  { 
    this.auth.onAuthStateChanged(user => {
      if (user) {
       // user.uid
        //console.log(user.uid)
       //var userid = user.uid
       this.airmax = db.object(user.uid+'/AirValSet').valueChanges();
        
      }
})


  }
  
  
  

  async ngOnInit() {

    this.auth.onAuthStateChanged(user => {
      if (user) {
       // user.uid
        //console.log(user.uid)
       // var userid = user.uid

        console.log(this.TempMin)
        this.relayData = this.db.object(user.uid+'/relaymodule').valueChanges();
    
        this.itemRef = this.db.object(user.uid+'relaymodule/relay1');
        this.itemRef.snapshotChanges().subscribe(action => {
          this.relayone = action.payload.val()
          console.log(this.relayone)
          if(this.relayone == "ON"){
            this.mode1 = false;
          }else{
            this.mode1 = true;
          }
        });
       
        this.itemRef = this.db.object(user.uid+'/relaymodule/relay2');
        this.itemRef.snapshotChanges().subscribe(action => {
        this.relayone = action.payload.val()
          console.log(this.relayone)
          if(this.relayone == "ON"){
            this.mode2 = false;
          }else{
            this.mode2 = true;
          }
        });
    
        this.itemRef = this.db.object(user.uid+'/relaymodule/relay3');
        this.itemRef.snapshotChanges().subscribe(action => {
          this.relayone = action.payload.val()
          console.log(this.relayone)
          if(this.relayone == "ON"){
            this.mode3 = false;
          }else{
            this.mode3 = true;
          }
        });
    
        this.itemRef = this.db.object(user.uid+'/relaymodule/relay4');
        this.itemRef.snapshotChanges().subscribe(action => {
          this.relayone = action.payload.val()
          console.log(this.relayone)
          if(this.relayone == "ON"){
            this.mode4 = false;
          }else{
            this.mode4 = true;
          }
        });
    
        this.itemRef = this.db.object(user.uid+'/gsmSet/gsm');
        this.itemRef.snapshotChanges().subscribe(action => {
          this.relayone = action.payload.val()
          console.log(this.relayone)
          if(this.relayone == "ON"){
            this.gsm = false;
          }else{
            this.gsm = true;
          }
        });
    
        this.itemRef = this.db.object(user.uid+'/gsmSet/realtime');
        this.itemRef.snapshotChanges().subscribe(action => {
          this.relayone = action.payload.val()
          console.log(this.relayone)
          if(this.relayone == "ON"){
            this.mode5 = false;
          }else{
            this.mode5 = true;
          }
        });
    
    
        this.itemRef = this.db.object(user.uid+'/espcam/flash');
        this.itemRef.snapshotChanges().subscribe(action => {
          this.relayone = action.payload.val()
          console.log(this.relayone)
          if(this.relayone == "ON"){
            this.mode6 = false;
          }else{
            this.mode6 = true;
          }
        });
      
        this.itemRef = this.db.object(user.uid+'/gsmSet/hmin');
        this.itemRef.snapshotChanges().subscribe(hmin => {
          this.humiMin = hmin.payload.val()
        });
        this.itemRef = this.db.object(user.uid+'/gsmSet/hmax');
        this.itemRef.snapshotChanges().subscribe(hmax => {
          this.humiMax = hmax.payload.val()
        });
        this.itemRef = this.db.object(user.uid+'/gsmSet/tmin');
        this.itemRef.snapshotChanges().subscribe(tmin => {
          this.TempMin = tmin.payload.val()
        });
        this.itemRef = this.db.object(user.uid+'/gsmSet/tmax');
        this.itemRef.snapshotChanges().subscribe(tmax => {
          this.TempMax = tmax.payload.val()
        });
        
      }
      else {
        this.showToast("Please Login First")
      }
})


  }


  takePhoto(){
    this.auth.onAuthStateChanged(user => {
      if (user) {
       // user.uid
       // console.log(user.uid)
       // var userid = user.uid
        const itemRef = this.db.object(user.uid+'/espcam');
        itemRef.update({ photo: "ON" }); 
        this.showToast("System Taking Up the Photo Please Wait ") 
        
      }
      else {
        this.showToast("Please Login First")
      }
})

  }

  flashCtrl(){
    this.auth.onAuthStateChanged(user => {
      if (user) {
       // user.uid
       // console.log(user.uid)
      // var userid = user.uid
       console.log(this.relayone)
       this.flashTrig = !this.flashTrig
      if (this.flashTrig){
        const itemRef = this.db.object(user.uid+'/espcam');
        itemRef.update({ flash: "ON" }); 
        this.showToast("Camera Flash is Turning on")
      }else {
        const itemRef = this.db.object(user.uid+'/espcam');
        itemRef.update({ flash: "OFF" }); 
        this.showToast("Camera Flash is Turning off")
    
      }
      console.log(this.relay1Trig);
      console.log(); 

        
      }
      else {
        this.showToast("Please Login First")
      }
})
    

  }

  controller1(){
    this.auth.onAuthStateChanged(user => {
      if (user) {
       // user.uid
      //  console.log(user.uid)
      // var userid = user.uid

       console.log(this.relayone)
       this.relay1Trig = !this.relay1Trig
      if (this.relay1Trig){
        const itemRef = this.db.object(user.uid+'/relaymodule');
        itemRef.update({ relay1: "ON" }); 
        this.showToast("Controller 1 is Turning on")
      }else {
        const itemRef = this.db.object(user.uid+'/relaymodule');
        itemRef.update({ relay1: "OFF" }); 
        this.showToast("Controller 1 is Turning off")
    
      }
      console.log(this.relay1Trig);
      console.log();
        
      }
      else {
        this.showToast("Please Login First")
      }
})

  }

  controller2(){
    this.auth.onAuthStateChanged(user => {
      if (user) {
        //user.uid
       // console.log(user.uid)
      // var userid = user.uid

       this.relay2Trig = !this.relay2Trig
 
       if (this.relay2Trig){
         const itemRef = this.db.object(user.uid+'/relaymodule');
         itemRef.update({ relay2: "ON" }); 
         this.showToast("Controller 2 is Turning on")
       }else {
         const itemRef = this.db.object(user.uid+'/relaymodule');
         itemRef.update({ relay2: "OFF" }); 
         this.showToast("Controller 2 is Turning off")
       }
       console.log(this.relay2Trig);
      }
      else {
        this.showToast("Please Login First")

      }
})

   }

   controller3(){

    this.auth.onAuthStateChanged(user => {
      if (user) {
       // user.uid
       // console.log(user.uid)
       //var userid = user.uid

       this.relay3Trig = !this.relay3Trig
 
       if (this.relay3Trig){
         const itemRef = this.db.object(user.uid+'/relaymodule');
         itemRef.update({ relay3: "ON" }); 
         this.showToast("Controller 3 is Turning on")
       }else {
         const itemRef = this.db.object(user.uid+'/relaymodule');
         itemRef.update({ relay3: "OFF" }); 
         this.showToast("Controller 3 is Turning off")
       }
       console.log(this.relay3Trig);
        
      }
      else {
        this.showToast("Please Login First")

      }
})

   }

   controller4(){

    this.auth.onAuthStateChanged(user => {
      if (user) {
       // user.uid
       // console.log(user.uid)
      // var userid = user.uid

       this.relay4Trig = !this.relay4Trig
 
       if (this.relay4Trig){
         const itemRef = this.db.object(user.uid+'/relaymodule');
         itemRef.update({ relay4: "ON" });
         this.showToast("Controller 4 is Turning on") 
       }else {
         const itemRef = this.db.object(user.uid+'/relaymodule');
         itemRef.update({ relay4: "OFF" }); 
         this.showToast("Controller 4 is Turning off")
       }
       console.log(this.relay4Trig);
      }
      else {
        this.showToast("Please Login First")

      }
})

   }

   gsmControl(){

    this.auth.onAuthStateChanged(user => {
      if (user) {
       // user.uid
       // console.log(user.uid)
       //var userid = user.uid

       this.gsmTrig = !this.gsmTrig
 
       if (this.gsmTrig){
        const itemRef = this.db.object(user.uid+'/gsmSet');
        itemRef.update({ gsm: "ON" });
        this.showToast("Notification Is Turning on,you will receive notification When Sensor is triggered")
      }else {
        const itemRef = this.db.object(user.uid+'/gsmSet');
        itemRef.update({ gsm: "OFF" });
        this.showToast("Notification is Turned Off")
      }
      console.log(this.gsmTrig);
      }
      else {
        this.showToast("Please Login First")

      }
})

    }

    controller5(){

      this.auth.onAuthStateChanged(user => {
        if (user) {
         // user.uid
         // console.log(user.uid)
        // var userid = user.uid

         this.relay5Trig = !this.relay5Trig
   
         if (this.relay5Trig){
           const itemRef = this.db.object(user.uid+'/gsmSet');
           itemRef.update({ realtime: "ON" }); 
           this.showToast("Realtime Update is ON,Make sure to Turn It OFF when not in use")
         }else {
           const itemRef = this.db.object(user.uid+'/gsmSet');
           itemRef.update({ realtime: "OFF" }); 
           this.showToast("Realtime Update is OFF")
         }
         console.log(this.relay5Trig);
          
        }
        else {
          this.showToast("Please Login First")

        }
  })

     }



restart(){
  const itemRef = this.db.object('user');
  itemRef.update({ system : "1" }); 
}

tempSet(){

  this.auth.onAuthStateChanged(user => {
    if (user) {
     // user.uid
     // console.log(user.uid)
     //var userid = user.uid

     console.log(this.TempMax)
     console.log(this.TempMin)
     console.log(this.RelaySelect)
     const itemRef = this.db.object(user.uid+'/gsmSet');
     itemRef.update({ tmin: this.TempMin });
     const itemRef2 = this.db.object(user.uid+'/gsmSet');
    itemRef2.update({ tmax: this.TempMax });
   
     const itemRef3 = this.db.object(user.uid+'/gsmSet');
     itemRef3.update({ trigArlarm1: this.RelaySelect });
     itemRef3.update({ trigArlarm2: this.RelaySelect });
     this.showToast("Temperature is set Min: "+this.TempMin+"°C Max: "+this.TempMax+"°C Relay 1 and 2 reserve ")
    }
    else {
      this.showToast("Please Login First")

    }
})
 
}
humiSet(){

  this.auth.onAuthStateChanged(user => {
    if (user) {
      //user.uid
      //console.log(user.uid)
    // var userid = user.uid

     console.log(this.humiMin)
     console.log(this.humiMax)
     const itemRef = this.db.object(user.uid+'/gsmSet');
     itemRef.update({ hmin: this.humiMin });
     const itemRef2 = this.db.object(user.uid+'/gsmSet');
     itemRef2.update({ hmax: this.humiMax });
     this.showToast("Humidity is set Min: "+this.humiMin+"% Max: "+this.humiMax+"% ")
    
    }
    else {
      this.showToast("Please Login First")

    }
})
 
}

maxiAirVal(){
  this.auth.onAuthStateChanged(user => {
    if (user) {
     // user.uid
      //console.log(user.uid)
     //var userid = user.uid


     const itemRef = this.db.object(user.uid+'/AirValSet');
     itemRef.update({ airMax: this.maxAirIn });

     this.showToast("Max Air Quality Set at : "+this.maxAirIn+"PPM ,Wait ESP will Restart")
    
     const itemRef1 = this.db.object(user.uid+'/user');
     itemRef1.update({ system: "1" });

    }
    else {
      this.showToast("Please Login First")

    }
})


}

fcmRegister(){
  this.auth.onAuthStateChanged(user => {
    if (user) {
     // user.uid
     // console.log(user.uid)
    // var userid = user.uid

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
       const itemRef = this.db.object(user.uid+'/user');
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
    else {
      this.showToast("Please Login First")

    }
})
}


async showToast(msg) {
  const toast = await this.toastCtrl.create({
    header: msg,
    position: 'top',
    duration: 3000
  });
  toast.present();
}


}

