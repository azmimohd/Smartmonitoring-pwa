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

      this.userData = db.object('user').valueChanges();
      this.airsensor = db.object('airsensor').valueChanges();
      this.envsensor = db.list('envsensor').valueChanges();
      this.psensor = db.list('psensor').valueChanges();
      this.tempsensor = db.object('envsensor').valueChanges();
      this.powersensor = db.object('psensor').valueChanges();
      this.gsmStatus =db.object('gsmSet').valueChanges();
      this.relayData = db.object('relaymodule').valueChanges();
      this.dayWatt = db.object('wattUsage/total').valueChanges();
      this.monitoring = db.object('gsmSet').valueChanges();
      this.status = db.object('gsmSet').valueChanges();
      this.r1on = db.object('arlarm/relay1/on').valueChanges();
      this.r1off = db.object('arlarm/relay1/off').valueChanges();
      this.r2on = db.object('arlarm/relay2/on').valueChanges();
      this.r2off = db.object('arlarm/relay2/off').valueChanges();
      this.r3on = db.object('arlarm/relay3/on').valueChanges();
      this.r3off = db.object('arlarm/relay3/off').valueChanges();
      this.r4on = db.object('arlarm/relay4/on').valueChanges();
      this.r4off = db.object('arlarm/relay4/off').valueChanges();

      this.r1Status = db.object('arlarm/relay1').valueChanges();
      this.r2Status = db.object('arlarm/relay2').valueChanges();
      this.r3Status = db.object('arlarm/relay3').valueChanges();
      this.r4Status = db.object('arlarm/relay4').valueChanges();

      this.weekprices = db.object('wattUsage/price').valueChanges();



      }

     ngOnInit(){

      
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




