import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateUsrPage } from './create-usr.page';

const routes: Routes = [
  {
    path: '',
    component: CreateUsrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateUsrPageRoutingModule {}
