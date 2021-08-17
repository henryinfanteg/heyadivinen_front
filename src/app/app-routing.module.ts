import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: 'home', loadChildren: './pages/tabs/home/home.module#HomePageModule' },
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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
