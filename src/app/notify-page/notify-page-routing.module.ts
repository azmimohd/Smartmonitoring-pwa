import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotifyPagePage } from './notify-page.page';

const routes: Routes = [
  {
    path: '',
    component: NotifyPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotifyPagePageRoutingModule {}
