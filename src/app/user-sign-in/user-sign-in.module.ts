import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule  } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserSignInPageRoutingModule } from './user-sign-in-routing.module';

import { UserSignInPage } from './user-sign-in.page';
import { Routes, RouterModule } from '@angular/router';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserSignInPageRoutingModule,
    ReactiveFormsModule
   
  ],
  declarations: [UserSignInPage]
})
export class UserSignInPageModule {}
