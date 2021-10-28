import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController, MenuController} from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl  } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/compat/database';
@Component({
  selector: 'app-user-sign-in',
  templateUrl: './user-sign-in.page.html',
  styleUrls: ['./user-sign-in.page.scss'],
})
export class UserSignInPage implements OnInit{


  validations_form: FormGroup;

  validation_messages = {
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'At least 6 characters long.' }
    ]
  };

  constructor(
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastCtrl: ToastController,
    public menuCtrl: MenuController) { }


  ngOnInit() {
    this.menuCtrl.enable(false); //Disable lateral menu

    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }


  tryLogin(value) {
    this.doLogin(value)
      .then(res => {
        this.router.navigate(["/tabs/tab1"]);

        const itemRef = this.db.object('user');
        itemRef.update({ ActiveUser: value.email });
      }, err => {
        this.showToast("There was an error. Check email and pass.");
        console.log(err)
      })
  }
  
    // Sign up with email/password
    SignUp(email, password,value) {
      return this.afAuth.createUserWithEmailAndPassword(email, password)
        .then((result) => {
          this.showToast("welcome."+value.email);
          console.log(result.user)
        }).catch((error) => {
          window.alert(error.message)
        })
    }
  




    doLogin(value: any) {
      return new Promise<any>((resolve, reject) => {
        this.afAuth.signInWithEmailAndPassword(value.email, value.password)
          .then(
            res => {
              resolve(res)
            },
            err => reject(err))
      })
    }


    async showToast(msg: any) {
      const toast = await this.toastCtrl.create({
        header: msg,
        position: 'bottom',
        duration: 3000
      });
      toast.present();
    }

}
