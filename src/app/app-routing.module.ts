import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  /*{
    path: '',
    loadChildren: () => import('./pages/tabs/tabs/tabs.module').then(m => m.TabsPageModule)
  },*/
  { path: 'home', loadChildren: './pages/tabs/home/home.module#HomePageModule' },
  {
    path: 'login',
    loadChildren: () => import('./pages/tabs/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/tabs/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'settings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/tabs/settings/settings.module').then(m => m.SettingsPageModule)
          }
        ]
  },
  {
    path: 'contact',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/tabs/contact/contact.module').then(m => m.ContactPageModule)
      }
    ]
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./pages/tabs/user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/tabs/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
