import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'notify-page',
    loadChildren: () => import('./notify-page/notify-page.module').then( m => m.NotifyPagePageModule)
  },
  {
    path: 'user-sign-in',
    loadChildren: () => import('./user-sign-in/user-sign-in.module').then( m => m.UserSignInPageModule)
  },
  {
    path: 'create-usr',
    loadChildren: () => import('./create-usr/create-usr.module').then( m => m.CreateUsrPageModule)
  },
  {
    path: 'power',
    loadChildren: () => import('./power/power.module').then( m => m.PowerPageModule)
  },
  {
    path: 'notification',
    loadChildren: () => import('./notification/notification.module').then( m => m.NotificationPageModule)
  },

 
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
