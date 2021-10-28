import { OnInit } from "@angular/core";

import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AngularFireObject } from "@angular/fire/compat/database";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { timer } from "rxjs";
import { Injectable } from "@angular/core";



@Injectable({
    providedIn: 'root'
  })


export class sensorread implements OnInit{
    itemRef: AngularFireObject<any>;
    timerSubscription: Subscription;
    constructor(public db:AngularFireDatabase) { }
    public relayone : any;
ngOnInit(){

}

getwattSensor(){
    this.itemRef = this.db.object('relaymodule/relay1');
    this.itemRef.snapshotChanges().subscribe(action => {
      
      this.relayone = action.payload.val()
})

} 

wattValue(){
    return this.relayone;
}



}

