import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, timer } from 'rxjs';
import { dataservice } from '../shared/data.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as moment from 'moment-timezone';
import { Subscription } from 'rxjs';
import { sensorread } from '../shared/sensor.read';
import { AngularFireObject } from '@angular/fire/compat/database';





@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page  implements OnInit{
  airsensor: Observable<any>;
  envsensor: Observable<any[]>;
  psensor: Observable<any[]>;
  tempsensor :Observable<any>;
  powersensor :Observable<any>;
  userData :Observable<any>;
  gsmStatus :Observable<any>;
  relayData :Observable<any>;
  dayWatt :Observable<any>;
  monitoring :Observable<any>;
  status :Observable<any>;
  r1on :Observable<any>;
  r1off :Observable<any>;
  r2on :Observable<any>;
  r2off :Observable<any>;
  r3on :Observable<any>;
  r3off :Observable<any>;
  r4on :Observable<any>;
  r4off :Observable<any>;

  r1Status :Observable<any>;
  r2Status :Observable<any>;
  r3Status :Observable<any>;
  r4Status :Observable<any>;

  weekprices :Observable<any>;
 


  timerSubscription: Subscription;
  itemRef: AngularFireObject<any>;
  itemRef2: AngularFireObject<any>;
  itemRef3: AngularFireObject<any>;
  public timeUpdate :any;
  temp: AngularFireObject<any>;
  tempUpdate : AngularFireObject<any>;
  humi: AngularFireObject<any>;
  humiUpdate : AngularFireObject<any>;
  air: AngularFireObject<any>;
  airUpdate : AngularFireObject<any>;



  public relayone : any;
  public day:string

 


  constructor(    
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    private aptService: dataservice,
    private route: Router,
    public auth: AngularFireAuth,
    public sensorread : sensorread,
 
  
   
    ) {
      
      const today = moment()
      const dayFormat = today.format("dddd");
     
      this.day = today.format("dddd, MMMM Do YYYY")
      const WattvalDay = '/wattUsage/'+dayFormat  
      console.log(WattvalDay);

  


      this.auth.onAuthStateChanged(user => {
        if (user) {
          var userid = user.uid
          console.log(user.uid)
          

          this.userData = db.object(userid+'/user').valueChanges();
          this.airsensor = db.object(userid+'/airsensor').valueChanges();
          this.envsensor = db.list(userid+'/envsensor').valueChanges();
          this.psensor = db.list(userid+'/psensor').valueChanges();
          this.tempsensor = db.object(userid+'/envsensor').valueChanges();
          this.powersensor = db.object(userid+'/psensor').valueChanges();
          this.gsmStatus =db.object(userid+'/gsmSet').valueChanges();
          this.relayData = db.object(userid+'/relaymodule').valueChanges();
          this.dayWatt = db.object(userid+'/wattUsage/total').valueChanges();
          this.monitoring = db.object(userid+'/gsmSet').valueChanges();
          this.status = db.object(userid+'/gsmSet').valueChanges();
          this.r1on = db.object(userid+'/arlarm/relay1/on').valueChanges();
          this.r1off = db.object(userid+'/arlarm/relay1/off').valueChanges();
          this.r2on = db.object(userid+'/arlarm/relay2/on').valueChanges();
          this.r2off = db.object(userid+'/arlarm/relay2/off').valueChanges();
          this.r3on = db.object(userid+'/arlarm/relay3/on').valueChanges();
          this.r3off = db.object(userid+'/arlarm/relay3/off').valueChanges();
          this.r4on = db.object(userid+'/arlarm/relay4/on').valueChanges();
          this.r4off = db.object(userid+'/arlarm/relay4/off').valueChanges();
    
          this.r1Status = db.object(userid+'/arlarm/relay1').valueChanges();
          this.r2Status = db.object(userid+'/arlarm/relay2').valueChanges();
          this.r3Status = db.object(userid+'/arlarm/relay3').valueChanges();
          this.r4Status = db.object(userid+'/arlarm/relay4').valueChanges();
    
          this.weekprices = db.object(userid+'/wattUsage/price').valueChanges();
        }
        else {
          
        }
  })

      }

     ngOnInit(){
      this.auth.onAuthStateChanged(user => {
        if (user) {

          const itemRef = this.db.object(user.uid+'/user');
          itemRef.update({ ActiveUser: user.email });
          // logged in or user exists
        }
        else {
          // not logged in
        }
  })
    
      }

    

      
      


    

      airchart(){
        this.route.navigate(['/airquality']);
      }

      airset(){
        this.route.navigate(['/air']); 
      }
    

      
      logIn() {
        this.route.navigate(['/user-sign-in']);
        //this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        //let sum =this.auth.currentUser.displayName;
      }
      logOut() {
        this.auth.signOut();
      }



}









