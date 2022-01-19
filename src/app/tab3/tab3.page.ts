import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireObject } from '@angular/fire/compat/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import * as moment from 'moment';
import { Chart } from 'chart.js';
import * as wom from "moment-weekofmonth";
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-power',
  templateUrl: './power.page.html',
  styleUrls: ['./power.page.scss'],
})


export class PowerPage implements OnInit {
  itemRef: AngularFireObject<any>;
  totalwatt :Observable<any>;
  totalPrice:Observable<any>;
  @ViewChild('linesChart2') linesChart2;

  public dayToday
  public powerIn
  public totalprices
  public totalmonthprices
  public hourUse
 
  constructor(public db:AngularFireDatabase,public auth: AngularFireAuth,public toastCtrl:ToastController) { 


    this.auth.onAuthStateChanged(user => {
      if (user) {
        //user.uid
       // console.log(user.uid)
       //var userid = user.uid

       this.totalwatt = db.object(user.uid+'/wattUsage/total').valueChanges();
       this.totalPrice = db.object(user.uid+'/wattUsage/price').valueChanges();
      }
      else {
        this.showToast("Please Login First")

      }
})

  }
  
  bars: any;
  colorArray: any;
  @ViewChild('barChart') barChart;
  async ngOnInit() {

    this.auth.onAuthStateChanged(user => {
      if (user) {
       // user.uid
        //console.log(user.uid)
      //var userid = user.uid

       const today = moment()
       const week = moment().isoWeek()
       console.log(week)
       
    
       
       
       const dayFormat = today.format("dddd");
       this.dayToday = dayFormat
       const timeNow = user.uid+'/chart/Time/'+dayFormat
       
       this.itemRef = this.db.object(user.uid+'/chart/Watt/Sunday');
       this.itemRef.snapshotChanges().subscribe(Sunday=> {
   
         this.itemRef = this.db.object(user.uid+'/chart/Watt/Monday');
       this.itemRef.snapshotChanges().subscribe(Monday => {
   
         this.itemRef = this.db.object(user.uid+'/chart/Watt/Tuesday');
         this.itemRef.snapshotChanges().subscribe(Tuesday=> {
   
       this.itemRef = this.db.object(user.uid+'/chart/Watt/Wednesday');
       this.itemRef.snapshotChanges().subscribe(Wednesday=> {
   
         this.itemRef = this.db.object(user.uid+'/chart/Watt/Thursday');
         this.itemRef.snapshotChanges().subscribe(Thursday=> {
   
           this.itemRef = this.db.object(user.uid+'/chart/Watt/Friday');
           this.itemRef.snapshotChanges().subscribe(Friday=> {
             
   
             this.itemRef = this.db.object(user.uid+'/chart/Watt/Saturday');
             this.itemRef.snapshotChanges().subscribe(Saturday=> {
              
               const SundayUse = Sunday.payload.val().reduce((a, b) => a + b, 0)
               var usageSunday = parseInt(SundayUse)
               const MondayUse = Monday.payload.val().reduce((a, b) => a + b, 0)
               var usageMonday = parseInt(MondayUse)
               const TuesdayUse = Tuesday.payload.val().reduce((a, b) => a + b, 0)
               var usageTuesday = parseInt(TuesdayUse)
               const WednesdayUse = Wednesday.payload.val().reduce((a, b) => a + b, 0)
               var usageWednesday = parseInt(WednesdayUse)
               const ThursdayUse = Thursday.payload.val().reduce((a, b) => a + b, 0)
               var usageThursday = parseInt(ThursdayUse)
               const FridayUse = Friday.payload.val().reduce((a, b) => a + b, 0)
               var usageFriday = parseInt(FridayUse)
               const SaturdayUse = Saturday.payload.val().reduce((a, b) => a + b, 0)
               var usageSaturday = parseInt(SaturdayUse)
               
                
               
   
         this.bars = new Chart(this.barChart.nativeElement, {
           type: 'bar',
           data: {
             labels: ['Sunday', 'Monday', 'Tuesday','Wednesday','Thursday','Friday','Saturday'],
             datasets: [{
               label: 'wh',
               data: [usageSunday, usageMonday, usageTuesday, usageWednesday,usageThursday,usageFriday,usageSaturday,],
               backgroundColor: '#40BFCF', // array should have same number of elements as number of dataset
               borderColor: '#40BFCF',// array should have same number of elements as number of dataset
               borderWidth: 1
             }]
           },
           options: {
             scales: {
               yAxes: [{
                 ticks: {
                   beginAtZero: true
                 }
               }]
             }
           }
         });
   
        const dayOfWeek = usageSunday + usageMonday+usageTuesday+usageThursday+usageWednesday+usageFriday+usageSaturday/1000
        let total = dayOfWeek/1000
         console.log(dayOfWeek)
   
          if(total <= 200){
            const sum = total * 21.8/100
            const itemRef = this.db.object(user.uid+'/wattUsage/price');
            itemRef.update({ week : sum.toFixed(2)});
          }else if(total >= 201 && total <= 300){
           const sum1 = total-200
           const sum2 = sum1*33.4/100
           const sum = sum2 + 43.60
           const itemRef = this.db.object(user.uid+'/wattUsage/price');
           itemRef.update({ week : sum.toFixed(2)});
   
          }else if (total >= 301 && total <= 600){
           const sum1 = total-300
           const sum2 = sum1*51.6/100
           const sum = sum2+ 33.40 + 43.60
            const itemRef = this.db.object(user.uid+'/wattUsage/price');
            itemRef.update({ week : sum.toFixed(2)});
   
          }else if (total >= 601 && total <= 900){
           const sum1 = total -600
           const sum2 = sum1*54.6/100
           const sum = sum2+43.60+33.40+154.80
           
           const itemRef = this.db.object(user.uid+'/wattUsage/price');
           itemRef.update({ week : sum.toFixed(2)});
          }else if(total >= 901){
           const sum1 = total -900
           const sum2 = sum1*57.1/100
           const sum = sum2+43.60+33.40+154.80+163.80
   
            const itemRef = this.db.object(user.uid+'/wattUsage/price');
            itemRef.update({ week : sum.toFixed(2)});
          }
         const sum = total.toPrecision(2);
         const sSum = parseFloat(sum) 
         const itemRef = this.db.object(user.uid+'/wattUsage/total');
         itemRef.update({ week : sSum});
       })
     })
   })
   })
   })
       })
   
       })

        // logged in or user exists
      }
      else {
        this.showToast("Please Login First")

      }
})
    

  }


powercalculate(){

  this.auth.onAuthStateChanged(user => {
    if (user) {
     // user.uid
      //console.log(user.uid)
     //var userid = user.uid

     if(this.powerIn <= 200){
      const icpt = this.powerIn*0.02
      const sum = (this.powerIn * 21.8/100)*this.hourUse
      this.totalprices = sum.toFixed(2)
      this.totalmonthprices = (this.totalprices*30).toFixed(2)
      
      
    }else if(this.powerIn >= 201 && this.powerIn <= 300){
      const sum1 = this.powerIn-200
      const sum2 = sum1*33.4/100
      const sum = (sum2 + 43.60)*this.hourUse
      this.totalprices = sum.toFixed(2)
      this.totalmonthprices = (this.totalprices*30).toFixed(2)
    }else if (this.powerIn >= 301 && this.powerIn <= 600){
      const sum1 = this.powerIn-300
      const sum2 = sum1*51.6/100
      const sum = (sum2+ 33.40 + 43.60)*this.hourUse
      this.totalprices = sum.toFixed(2)
      this.totalmonthprices = (this.totalprices*30).toFixed(2)
    }else if (this.powerIn >= 601 && this.powerIn <= 900){
      const sum1 = this.powerIn-600
      const sum2 = sum1*54.6/100
      const sum = (sum2+43.60+33.40+154.80)*this.hourUse
      this.totalprices = sum.toFixed(2)
      this.totalmonthprices = (this.totalprices*30).toFixed(2)
    }else if(this.powerIn >= 901){
      const sum1 = this.powerIn -900
      const sum2 = sum1*57.1/100
      const sum = (sum2+43.60+33.40+154.80+163.80)*this.hourUse
      this.totalprices = sum.toFixed(2)
      this.totalmonthprices = (this.totalprices*30).toFixed(2)
    }
    }
    else {
      this.showToast("Please Login First")

    }
})

  
}

getWatt(){

  this.auth.onAuthStateChanged(user => {
    if (user) {
     // user.uid
     // console.log(user.uid)
     //var userid = user.uid

     const Wattval = user.uid+'/chart/Watt/'+this.dayToday
     console.log(Wattval);
     this.itemRef = this.db.object(Wattval);
     this.itemRef.snapshotChanges().subscribe(Rwatt => {
       const watt = Rwatt.payload.val()
   
       this.bars = new Chart(this.linesChart2.nativeElement, {
         type: 'line',
         backgroundColor: "rgba(255, 0, 255, 0)",
         data: {
           labels: ['12Am', '1Am', '2Am', '3Am', '4Am', '5Am', '6Am','7Am', '8Am', '9Am', '10Am', '11Am', '12Pm', '1Pm','2Pm', '3Pm', '4Pm', '5Pm', '6Pm', '7Pm', '8Pm','9Pm', '10Pm', '11Pm',],
           datasets: [{
             backgroundColor: "#40BFCF",
             pointBackgroundColor: "#40BFCF",
             pointBorderColor: "#40BFCF",
             borderColor: "#40BFCF",
             data: Rwatt.payload.val(),
             fill: false,
           }]
         },
         options: {
           responsive: true,
           legend: {
             display: false
           },
           tooltips: {
             enabled: true
           },
           scales: {
             xAxes: [{
               gridLines: {
                 display: false
               }
             }],
             yAxes: [{
               gridLines: {
                 display: false
               },
               ticks: {
                 display: true
               }
             }]
           }
         }
       });
   
   
     })
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



