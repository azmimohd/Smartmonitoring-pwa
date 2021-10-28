import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController, MenuController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-create-usr',
  templateUrl: './create-usr.page.html',
  styleUrls: ['./create-usr.page.scss'],
})
export class CreateUsrPage implements OnInit {

  validations_form: FormGroup;

  validation_messages = {

    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'At least 6 characters long.' }
    ]
  };

  constructor( public afAuth: AngularFireAuth,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    public menuCtrl: MenuController,public db: AngularFirestore) { }

  ngOnInit() {
    this.menuCtrl.enable(false); //Disable lateral menu

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9 ]*$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }



  tryRegister(value) {
    this.afAuth.createUserWithEmailAndPassword(value.email, value.password)
      .then(res => {
        console.log(res);

        this.db.collection<any>('users').doc(res.user.uid).set({
          "uid": res.user.uid,
          "name": res.user.displayName,
          "email": res.user.email
        })

        this.showToast("account"+value.email + "has been created");
        this.router.navigate(["/user-sign-in"]);

      }, err => {
        console.log(err);
        if (err.code === 'auth/email-already-in-use') {
          this.showToast(value.email + " is already in use. Try another.");
        } else {
          this.showToast("There was an error. Please try again.");
        }
      })
  }




  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      header: msg,
      position: 'bottom',
      duration: 3000
    });
    toast.present();
  }
}
