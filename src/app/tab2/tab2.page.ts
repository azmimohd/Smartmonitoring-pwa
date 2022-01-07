import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireObject } from '@angular/fire/compat/database';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  itemRef: AngularFireObject<any>;
  relayData :Observable<any>;
  public TempMin;
  public TempMax;
  public humiMin;
  public humiMax;
  public phoneNum;
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

  constructor(public db:AngularFireDatabase,private afs: AngularFirestore,public toastCtrl:ToastController ) { }
  
   async ngOnInit() {
     console.log(this.TempMin)
    this.relayData = this.db.object('relaymodule').valueChanges();

    this.itemRef = this.db.object('relaymodule/relay1');
    this.itemRef.snapshotChanges().subscribe(action => {
      this.relayone = action.payload.val()
      console.log(this.relayone)
      if(this.relayone == "ON"){
        this.mode1 = false;
      }else{
        this.mode1 = true;
      }
    });
   
    this.itemRef = this.db.object('relaymodule/relay2');
    this.itemRef.snapshotChanges().subscribe(action => {
    this.relayone = action.payload.val()
      console.log(this.relayone)
      if(this.relayone == "ON"){
        this.mode2 = false;
      }else{
        this.mode2 = true;
      }
    });

    this.itemRef = this.db.object('relaymodule/relay3');
    this.itemRef.snapshotChanges().subscribe(action => {
      this.relayone = action.payload.val()
      console.log(this.relayone)
      if(this.relayone == "ON"){
        this.mode3 = false;
      }else{
        this.mode3 = true;
      }
    });

    this.itemRef = this.db.object('relaymodule/relay4');
    this.itemRef.snapshotChanges().subscribe(action => {
      this.relayone = action.payload.val()
      console.log(this.relayone)
      if(this.relayone == "ON"){
        this.mode4 = false;
      }else{
        this.mode4 = true;
      }
    });

    this.itemRef = this.db.object('gsmSet/gsm');
    this.itemRef.snapshotChanges().subscribe(action => {
      this.relayone = action.payload.val()
      console.log(this.relayone)
      if(this.relayone == "ON"){
        this.gsm = false;
      }else{
        this.gsm = true;
      }
    });

    this.itemRef = this.db.object('gsmSet/realtime');
    this.itemRef.snapshotChanges().subscribe(action => {
      this.relayone = action.payload.val()
      console.log(this.relayone)
      if(this.relayone == "ON"){
        this.mode5 = false;
      }else{
        this.mode5 = true;
      }
    });


    this.itemRef = this.db.object('espcam/flash');
    this.itemRef.snapshotChanges().subscribe(action => {
      this.relayone = action.payload.val()
      console.log(this.relayone)
      if(this.relayone == "ON"){
        this.mode6 = false;
      }else{
        this.mode6 = true;
      }
    });
  
    this.itemRef = this.db.object('gsmSet/hmin');
    this.itemRef.snapshotChanges().subscribe(hmin => {
      this.humiMin = hmin.payload.val()
    });
    this.itemRef = this.db.object('gsmSet/hmax');
    this.itemRef.snapshotChanges().subscribe(hmax => {
      this.humiMax = hmax.payload.val()
    });
    this.itemRef = this.db.object('gsmSet/tmin');
    this.itemRef.snapshotChanges().subscribe(tmin => {
      this.TempMin = tmin.payload.val()
    });
    this.itemRef = this.db.object('gsmSet/tmax');
    this.itemRef.snapshotChanges().subscribe(tmax => {
      this.TempMax = tmax.payload.val()
    });
  }


  takePhoto(){
    const itemRef = this.db.object('espcam');
    itemRef.update({ photo: "ON" }); 
    this.showToast("System Taking Up the Photo Please Wait ") 
  }

  flashCtrl(){
    console.log(this.relayone)
    this.flashTrig = !this.flashTrig
   if (this.flashTrig){
     const itemRef = this.db.object('espcam');
     itemRef.update({ flash: "ON" }); 
     this.showToast("Camera Flash is Turning on")
   }else {
     const itemRef = this.db.object('espcam');
     itemRef.update({ flash: "OFF" }); 
     this.showToast("Camera Flash is Turning off")
 
   }
   console.log(this.relay1Trig);
   console.log(); 
  }

  controller1(){
    console.log(this.relayone)
   this.relay1Trig = !this.relay1Trig
  if (this.relay1Trig){
    const itemRef = this.db.object('relaymodule');
    itemRef.update({ relay1: "ON" }); 
    this.showToast("Controller 1 is Turning on")
  }else {
    const itemRef = this.db.object('relaymodule');
    itemRef.update({ relay1: "OFF" }); 
    this.showToast("Controller 1 is Turning off")

  }
  console.log(this.relay1Trig);
  console.log();
  }

  controller2(){
    this.relay2Trig = !this.relay2Trig
 
   if (this.relay2Trig){
     const itemRef = this.db.object('relaymodule');
     itemRef.update({ relay2: "ON" }); 
     this.showToast("Controller 2 is Turning on")
   }else {
     const itemRef = this.db.object('relaymodule');
     itemRef.update({ relay2: "OFF" }); 
     this.showToast("Controller 2 is Turning off")
   }
   console.log(this.relay2Trig);
   }

   controller3(){
    this.relay3Trig = !this.relay3Trig
 
   if (this.relay3Trig){
     const itemRef = this.db.object('relaymodule');
     itemRef.update({ relay3: "ON" }); 
     this.showToast("Controller 3 is Turning on")
   }else {
     const itemRef = this.db.object('relaymodule');
     itemRef.update({ relay3: "OFF" }); 
     this.showToast("Controller 3 is Turning off")
   }
   console.log(this.relay3Trig);
   }

   controller4(){
    this.relay4Trig = !this.relay4Trig
 
   if (this.relay4Trig){
     const itemRef = this.db.object('relaymodule');
     itemRef.update({ relay4: "ON" });
     this.showToast("Controller 4 is Turning on") 
   }else {
     const itemRef = this.db.object('relaymodule');
     itemRef.update({ relay4: "OFF" }); 
     this.showToast("Controller 4 is Turning off")
   }
   console.log(this.relay4Trig);
   }

   gsmControl(){
     this.gsmTrig = !this.gsmTrig
 
     if (this.gsmTrig){
      const itemRef = this.db.object('gsmSet');
      itemRef.update({ gsm: "ON" });
      this.showToast("Notification Is Turning on,you will receive notification When Sensor is triggered")
    }else {
      const itemRef = this.db.object('gsmSet');
      itemRef.update({ gsm: "OFF" });
      this.showToast("Notification is Turned Off")
    }
    console.log(this.gsmTrig);
    }

    controller5(){
      this.relay5Trig = !this.relay5Trig
   
     if (this.relay5Trig){
       const itemRef = this.db.object('gsmSet');
       itemRef.update({ realtime: "ON" }); 
       this.showToast("Realtime Update is ON,Make sure to Turn It OFF when not in use")
     }else {
       const itemRef = this.db.object('gsmSet');
       itemRef.update({ realtime: "OFF" }); 
       this.showToast("Realtime Update is OFF")
     }
     console.log(this.relay5Trig);
     }



restart(){
  const itemRef = this.db.object('user');
  itemRef.update({ system : "1" }); 
}

tempSet(){
  console.log(this.TempMax)
  console.log(this.TempMin)
  console.log(this.RelaySelect)
  const itemRef = this.db.object('gsmSet');
  itemRef.update({ tmin: this.TempMin });
  const itemRef2 = this.db.object('gsmSet');
 itemRef2.update({ tmax: this.TempMax });

  const itemRef3 = this.db.object('gsmSet');
  itemRef3.update({ trigArlarm1: this.RelaySelect });
  this.showToast("Temperature is set Min: "+this.TempMin+"°C Max: "+this.TempMax+"°C Relay 1 Trigger is "+this.RelaySelect)
}
humiSet(){
  console.log(this.humiMin)
  console.log(this.humiMax)
  const itemRef = this.db.object('gsmSet');
  itemRef.update({ hmin: this.humiMin });
  const itemRef2 = this.db.object('gsmSet');
  itemRef2.update({ hmax: this.humiMax });
  this.showToast("Humidity is set Min: "+this.humiMin+"% Max: "+this.humiMax+"% ")
  
}
setNumber(){
  console.log(this.phoneNum)
  const itemRef = this.db.object('gsmSet');
  itemRef.update({ phone: this.phoneNum });
  const itemRef1 = this.db.object('gsmSet');
  itemRef.update({ trigger: "ON" });

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
