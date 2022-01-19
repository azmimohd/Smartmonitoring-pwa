import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { ToastController, NavController, AlertController } from '@ionic/angular';

import { AngularFireObject } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Moment } from 'moment';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  
})



export class Tab3Page implements OnInit {
  public dayToday : string
  public counter : number
  public resetSelect
  public sensor
  timerSubscription: Subscription;
  itemRef: AngularFireObject<any>;
  airsensor: Observable<any>;
  item: Observable<any>;
  chart = []; 
  arraytoPassChart = []
  datevalue:any;
  @ViewChild('barChart') barChart;
  @ViewChild('linesChart') linesChart;
  @ViewChild('linesChart2') linesChart2;
  @ViewChild('linesChart3') linesChart3;
  @ViewChild('linesChart4') linesChart4;
  @ViewChild('linesChart5') linesChart5;
  
  
  
  bars: any;
  colorArray: any;
  
  
    
  constructor(
    private toastController: ToastController,
    private navCtrl: NavController,
    public db: AngularFireDatabase,
    public toastCtrl:ToastController,
    public auth: AngularFireAuth
    
    ) {

      
      
  }

  getWatt(){
    
    this.auth.onAuthStateChanged(user => {
      if (user) {
        //user.uid
       // console.log(user.uid)
      // var userid = user.uid

       this.timerSubscription = timer(0, 500000).pipe(
        map(() => {
      const today = moment()
      const dayFormat = today.format("dddd");
      //this.dayToday = dayFormat
      
      console.log(dayFormat);
      const Wattval = user.uid+'/chart/Watt/'+this.dayToday
      const Tempval = user.uid+'/chart/Temp/'+this.dayToday
      const Humival = user.uid+'/chart/Humi/'+this.dayToday
      const Airval = user.uid+'/chart/Air/'+this.dayToday
      const timeNow = user.uid+'/chart/Time/'+this.dayToday
      console.log(Wattval)
       console.log(Wattval)
      this.itemRef = this.db.object(timeNow);
      this.itemRef.snapshotChanges().subscribe(Rtime => {
      
      this.itemRef = this.db.object(Wattval);
      this.itemRef.snapshotChanges().subscribe(Rwatt => {
        const watt = Rwatt.payload.val()
         console.log(watt)
      this.itemRef = this.db.object(Tempval);
      this.itemRef.snapshotChanges().subscribe(Rtemp => {
  
      this.itemRef = this.db.object(Humival);
      this.itemRef.snapshotChanges().subscribe(Rhumi => {
  
      this.itemRef = this.db.object(Airval);
      this.itemRef.snapshotChanges().subscribe(Rair => {
  
    
        this.itemRef = this.db.object(user.uid+'/chart/trig/day');
        this.itemRef.snapshotChanges().subscribe(trig => {
  
          this.itemRef = this.db.object(user.uid+'/chart/trig/currentDay');
          this.itemRef.snapshotChanges().subscribe(curentDay => {
       console.log(Rtemp.payload.val())
       console.log(Rtime.payload.val())
        this.bars = new Chart(this.linesChart2.nativeElement, {
          type: 'line',
          backgroundColor: "rgba(255, 0, 255, 0)",
          data: {
            labels: ['12Am', '1Am', '2Am', '3Am', '4Am', '5Am', '6Am','7Am', '8Am', '9Am', '10Am', '11Am', 
            '12Pm', '1Pm','2Pm', '3Pm', '4Pm', '5Pm', '6Pm', '7Pm', '8Pm','9Pm', '10Pm', '11Pm',],
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
                  display: true
                }
                
              }],
              yAxes: [{
                gridLines: {
                  display: true
                },
                ticks: {
                  display: true
                },
              }]
            }
          }


    
        });
  
        this.bars = new Chart(this.linesChart3.nativeElement, {
          type: 'line',
          backgroundColor: "rgba(255, 0, 255, 0)",
          data: {
            labels: ['12Am', '1Am', '2Am', '3Am', '4Am', '5Am', '6Am','7Am', '8Am', '9Am', '10Am', '11Am', 
            '12Pm', '1Pm','2Pm', '3Pm', '4Pm', '5Pm', '6Pm', '7Pm', '8Pm','9Pm', '10Pm', '11Pm',],
            datasets: [{
              backgroundColor: "#40BFCF",
              pointBackgroundColor: "#40BFCF",
              pointBorderColor: "#40BFCF",
              borderColor: "#40BFCF",
              data: Rtemp.payload.val(),
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
                  display: true
                }
              }],
              yAxes: [{
                gridLines: {
                  display: true
                },
                ticks: {
                  display: true
                }
              }]
            }
          }
        });
  
  
        this.bars = new Chart(this.linesChart4.nativeElement, {
          type: 'line',
          backgroundColor: "rgba(255, 0, 255, 0)",
          data: {
            labels: ['12Am', '1Am', '2Am', '3Am', '4Am', '5Am', '6Am','7Am', '8Am', '9Am', '10Am', '11Am', '12Pm', '1Pm','2Pm', '3Pm', '4Pm', '5Pm', '6Pm', '7Pm', '8Pm','9Pm', '10Pm', '11Pm',],
            datasets: [{
              backgroundColor: "#40BFCF",
              pointBackgroundColor: "#40BFCF",
              pointBorderColor: "#40BFCF",
              borderColor: "#40BFCF",
              data: Rhumi.payload.val(),
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
                  display: true
                }
              }],
              yAxes: [{
                gridLines: {
                  display: true
                },
                ticks: {
                  display: true
                }
              }]
            }
          }
        });
  
  
        this.bars = new Chart(this.linesChart5.nativeElement, {
          type: 'line',
          backgroundColor: "rgba(255, 0, 255, 0)",
          data: {
            labels: ['12Am', '1Am', '2Am', '3Am', '4Am', '5Am', '6Am','7Am', '8Am', '9Am', '10Am', '11Am', '12Pm', '1Pm','2Pm', '3Pm', '4Pm', '5Pm', '6Pm', '7Pm', '8Pm','9Pm', '10Pm', '11Pm',],
            datasets: [{
              backgroundColor: "#40BFCF",
              pointBackgroundColor: "#40BFCF",
              pointBorderColor: "#40BFCF",
              borderColor: "#40BFCF",
              data: Rair.payload.val(),
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
                  display: true
                }
              }],
              yAxes: [{
                gridLines: {
                  display: true
                },
                ticks: {
                  display: true
                }
              }]
            }
          }
        });
        
  const WattvalDay = user.uid+'/wattUsage/'+dayFormat     
  const todayUsage = watt.reduce((a, b) => a + b, 0)
  var usage = parseInt(todayUsage)
  console.log(usage)
  const itemRef = this.db.object(WattvalDay);
  itemRef.update({ day : usage}); 
      
  
      });
    });
  });
  });
  });
  });
  
  
  
    });
  })
  ).subscribe(); 
      }
      else {
        this.showToast("Please Login First")

      }
})


  }

  ngOnInit(): void {
    Chart.pluginService.register(ChartAnnotation);
  }






graphReset(){

  this.auth.onAuthStateChanged(user => {
    if (user) {
     // user.uid
     // console.log(user.uid)
     //var userid = user.uid

     this.showToast("Data Collection for "+this.sensor+"/"+this.resetSelect+" has been deleted!!")
     for(this.counter=0;this.counter<=23;this.counter++){
       const select = user.uid+'/chart/'+this.sensor+'/'+this.resetSelect+'/'+this.counter
       const itemRef = this.db.object(select);
       itemRef.set(0);
       
     }
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
    duration: 4000
  });
  toast.present();
}
}




function rgba(arg0: number, arg1: number, arg2: number, arg3: number) {
  throw new Error('Function not implemented.');
}





