import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResultsPage } from '../results/results.page';
import { InstructionsPage } from '../instructions/instructions.page';
import { CategoriesPage } from '../categories/categories.page';
import { BoardPage } from '../board/board.page';
import { HomePage } from './home.page';
import { RetryRequestComponent } from 'src/app/components/retry-request/retry-request.component';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', redirectTo: 'categories' },
      { path: 'categories', component: CategoriesPage },
      { path: 'instructions', component: InstructionsPage },
      { path: 'board', component: BoardPage },
      { path: 'results', component: ResultsPage },
    ])
  ],
  declarations: [HomePage, InstructionsPage, CategoriesPage, BoardPage, ResultsPage, RetryRequestComponent]
})
export class HomePageModule {}
