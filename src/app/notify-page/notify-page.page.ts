import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireObject } from '@angular/fire/compat/database';
import { ToastController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Moment } from 'moment';
import * as moment from 'moment';
@Component({
  selector: 'app-notify-page',
  templateUrl: './notify-page.page.html',
  styleUrls: ['./notify-page.page.scss'],
})





export class NotifyPagePage implements OnInit {
  itemRef: AngularFireObject<any>;
  itemRef1: AngularFireObject<any>;
  relayData :Observable<any>;
  
  public mode1: boolean = true;
  public mode2: boolean = true;
  public mode3: boolean = true;
  public mode4: boolean = true;
  public gsm: boolean = true;
  public control1Hour 
  public control1Minute
  public control1HourOff
  public control1MinuteOff

  //ctrl2
  public control2Hour 
  public control2Minute
  public control2HourOff
  public control2MinuteOff
//ctrl3
public control3Hour 
public control3Minute
public control3HourOff
public control3MinuteOff
//ctrl4
public control4Hour 
public control4Minute
public control4HourOff
public control4MinuteOff
  //update
public timer1hour:number;
  //updte
  temperature: any = 24;
 
  public relay1Trig:boolean = false;
  public relay2Trig:boolean = false;
  public relay3Trig:boolean = false;
  public relay4Trig:boolean = false;
  public gsmTrig:boolean = false;
  
  public relayone : any;

  constructor(public db:AngularFireDatabase,private afs: AngularFirestore,public toastCtrl:ToastController,public auth:AngularFireAuth) {
  
   }
  
   async ngOnInit() {

    this.auth.onAuthStateChanged(user => {
      if (user) {
       // user.uid
       // console.log(user.uid)
      // var userid = user.uid

       this.relayData = this.db.object(user.uid+'/relaymodule').valueChanges();
       this.itemRef = this.db.object(user.uid+'/relaymodule/relay1');
       this.itemRef.snapshotChanges().subscribe(action => {
         this.relayone = action.payload.val()
         console.log(this.relayone)
         if(this.relayone == "ON"){
           this.mode1 = true;
         }else{
           this.mode1 = false;
   
         }
       });
      
       this.itemRef = this.db.object(user.uid+'/relaymodule/relay2');
       this.itemRef.snapshotChanges().subscribe(action => {
         this.relayone = action.payload.val()
         console.log(this.relayone)
         if(this.relayone == "ON"){
           this.mode2 = true;
         }else{
           this.mode2 = false;
         }
       });
   
       this.itemRef = this.db.object(user.uid+'/relaymodule/relay3');
       this.itemRef.snapshotChanges().subscribe(action => {
         this.relayone = action.payload.val()
         console.log(this.relayone)
         if(this.relayone == "ON"){
           this.mode3 = true;
         }else{
           this.mode3 = false;
         }
       });
   
       this.itemRef = this.db.object(user.uid+'/relaymodule/relay4');
       this.itemRef.snapshotChanges().subscribe(action => {
         this.relayone = action.payload.val()
         console.log(this.relayone)
         if(this.relayone == "ON"){
           this.mode4 = true;
         }else{
           this.mode4 = false;
         }
       });
   
       this.itemRef = this.db.object(user.uid+'/gsmSet/gsm');
       this.itemRef.snapshotChanges().subscribe(action => {
         this.relayone = action.payload.val()
         console.log(this.relayone)
         if(this.relayone == "ON"){
           this.gsm = true;
         }else{
           this.gsm = false;
         }
       });
        
      }
      else {
        this.showToast("Please Login First")

      }
})
    




  
  
  
  }


  initRelay(){
    
  }

  controller1(){

    this.auth.onAuthStateChanged(user => {
      if (user) {
       // user.uid
       // console.log(user.uid)
      // var userid = user.uid

       console.log(this.relayone)
       this.relay1Trig = !this.relay1Trig
       var hour = parseInt(this.control1Hour);
       var minute = parseInt(this.control1Minute)
       var hourOff = parseInt(this.control1HourOff)
       var minuteOff = parseInt(this.control1MinuteOff)
    
      if (this.relay1Trig){
        const itemRef4 = this.db.object(user.uid+'/arlarm/relay1/');
        itemRef4.update({ status : "ON" }); 
     
        const itemRef = this.db.object(user.uid+'/arlarm/relay1/on');
        itemRef.update({ hour : hour }); 
        const itemRef1 = this.db.object(user.uid+'/arlarm/relay1/on');
        itemRef1.update({ minute : minute }); 
    
        const itemRef2 = this.db.object(user.uid+'/arlarm/relay1/off');
        itemRef2.update({ hour : hourOff  }); 
    
        const itemRef3 = this.db.object(user.uid+'/arlarm/relay1/off');
        itemRef3.update({ minute : minuteOff }); 
        this.showToast("Controller 1 is Set from"+hour+":"+minute+" untill "+hourOff+":"+minuteOff); 
    
    
    
    
      }else {
    
        const itemRef4 = this.db.object(user.uid+'/arlarm/relay1/');
        itemRef4.update({ status : "OFF" }); 
        this.showToast("Controller 1 Timer is OFF");
    
    
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
       // user.uid
       // console.log(user.uid)
       //var userid = user.uid

       this.relay2Trig = !this.relay2Trig
       var hour = parseInt(this.control2Hour);
      var minute = parseInt(this.control2Minute)
      var hourOff = parseInt(this.control2HourOff)
      var minuteOff = parseInt(this.control2MinuteOff)
      if (this.relay2Trig){
       const itemRef4 = this.db.object(user.uid+'/arlarm/relay2/');
       itemRef4.update({ status : "ON" }); 
   
       const itemRef = this.db.object(user.uid+'/arlarm/relay2/on');
       itemRef.update({ hour : hour }); 
       const itemRef1 = this.db.object(user.uid+'/arlarm/relay2/on');
       itemRef1.update({ minute : minute }); 
   
       const itemRef2 = this.db.object(user.uid+'/arlarm/relay2/off');
       itemRef2.update({ hour : hourOff  }); 
   
       const itemRef3 = this.db.object(user.uid+'/arlarm/relay2/off');
       itemRef3.update({ minute : minuteOff });  
       this.showToast("Controller 2 is Set from"+hour+":"+minute+" untill "+hourOff+":"+minuteOff); 
      }else {
       const itemRef4 = this.db.object(user.uid+'/arlarm/relay2/');
       itemRef4.update({ status : "OFF" }); 
       this.showToast("Controller 2 Timer is OFF");
   
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
        //console.log(user.uid)
       //var userid = user.uid

       this.relay3Trig = !this.relay3Trig
  
       var hour = parseInt(this.control3Hour);
       var minute = parseInt(this.control3Minute)
       var hourOff = parseInt(this.control3HourOff)
       var minuteOff = parseInt(this.control3MinuteOff)
       if (this.relay3Trig){
        const itemRef4 = this.db.object(user.uid+'/arlarm/relay3/');
        itemRef4.update({ status : "ON" }); 
    
        const itemRef = this.db.object(user.uid+'/arlarm/relay3/on');
        itemRef.update({ hour : hour }); 
        const itemRef1 = this.db.object(user.uid+'/arlarm/relay3/on');
        itemRef1.update({ minute : minute }); 
    
        const itemRef2 = this.db.object(user.uid+'/arlarm/relay3/off');
        itemRef2.update({ hour : hourOff  }); 
    
        const itemRef3 = this.db.object(user.uid+'/arlarm/relay3/off');
        itemRef3.update({ minute : minuteOff });  
        this.showToast("Controller 3 is Set from"+hour+":"+minute+" untill "+hourOff+":"+minuteOff); 
       }else {
        const itemRef4 = this.db.object(user.uid+'/arlarm/relay3/');
        itemRef4.update({ status : "OFF" }); 
        this.showToast("Controller 3 Timer is OFF");
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
        //user.uid
        //console.log(user.uid)
      // var userid = user.uid

       this.relay4Trig = !this.relay4Trig
       var hour = parseInt(this.control4Hour);
       var minute = parseInt(this.control4Minute)
       var hourOff = parseInt(this.control4HourOff)
       var minuteOff = parseInt(this.control4MinuteOff)
      if (this.relay4Trig){
       const itemRef4 = this.db.object(user.uid+'/arlarm/relay4/');
       itemRef4.update({ status : "ON" }); 
   
       const itemRef = this.db.object(user.uid+'/arlarm/relay4/on');
       itemRef.update({ hour : hour }); 
       const itemRef1 = this.db.object(user.uid+'/arlarm/relay4/on');
       itemRef1.update({ minute : minute }); 
   
       const itemRef2 = this.db.object(user.uid+'/arlarm/relay4/off');
       itemRef2.update({ hour : hourOff  }); 
   
       const itemRef3 = this.db.object(user.uid+'/arlarm/relay4/off');
       itemRef3.update({ minute : minuteOff }); 
       this.showToast("Controller 4 is Set from"+hour+":"+minute+" untill "+hourOff+":"+minuteOff); 
      }else {
       const itemRef4 = this.db.object(user.uid+'/arlarm/relay4/');
       itemRef4.update({ status : "OFF" }); 
       this.showToast("Controller 4 Timer is OFF");
      }
      console.log(this.relay4Trig);
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
        duration: 5000
      });
      toast.present();
    }
 


  
  }
export interface Item { name: string; }
