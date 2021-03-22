import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterPage } from './register.page';
import { FieldErrorDisplayComponent } from 'src/app/components/field-error-display/field-error-display.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: RegisterPage
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
  declarations: [RegisterPage, FieldErrorDisplayComponent]
})
export class RegisterPageModule {}
