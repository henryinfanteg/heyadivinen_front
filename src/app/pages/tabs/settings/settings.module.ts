import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';
import { WordSuggestionPage } from '../word-suggestion/word-suggestion.page';
import { FieldErrorDisplayComponent } from 'src/app/components/field-error-display/field-error-display.component';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  }, 
  {
    path: 'suggestion',
    component: WordSuggestionPage
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
  declarations: [SettingsPage, WordSuggestionPage, FieldErrorDisplayComponent]
})
export class SettingsPageModule { }
