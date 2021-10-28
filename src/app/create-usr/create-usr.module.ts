import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateUsrPageRoutingModule } from './create-usr-routing.module';

import { CreateUsrPage } from './create-usr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateUsrPageRoutingModule,
    ReactiveFormsModule,

  ],
  declarations: [CreateUsrPage]
})
export class CreateUsrPageModule {}
