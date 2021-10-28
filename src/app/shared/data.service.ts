import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase ,AngularFireObject,AngularFireList} from '@angular/fire/compat/database';
import { userDetails } from './user';
import { notifyDetail } from './user';

@Injectable({
    providedIn: 'root'
  })
  

export class dataservice {
    envdata: AngularFireObject<any>;
    envSensorList: AngularFireList<any>;
    userSet: AngularFireList<any>;

  constructor(    
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    ) {




      }
    
     createUser(apt:userDetails){

         const itemRef = this.db.object('user');
         itemRef.update({ name: apt.name,phone:apt.phone });

     }


     createNotify(apt:notifyDetail){
        
        
        const notiRef = this.db.list('notification');
        notiRef.push({ name: apt.name,id: apt.id ,age:apt.age});
     }


}