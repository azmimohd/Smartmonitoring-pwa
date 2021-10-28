import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotifyPagePageRoutingModule } from './notify-page-routing.module';

import { NotifyPagePage } from './notify-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotifyPagePageRoutingModule
  ],
  declarations: [NotifyPagePage]
})
export class NotifyPagePageModule {}
