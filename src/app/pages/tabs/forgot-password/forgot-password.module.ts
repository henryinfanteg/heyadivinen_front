import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { ForgotPasswordPage } from './forgot-password.page';
import { RouterModule, Routes } from '@angular/router';
import { FieldErrorDisplayComponent } from 'src/app/components/field-error-display/field-error-display.component';

const routes: Routes = [
  {
    path: '',
    component: ForgotPasswordPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ForgotPasswordPage, FieldErrorDisplayComponent]
})
export class ForgotPasswordPageModule {}
