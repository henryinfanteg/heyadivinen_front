import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { IonicModule } from '@ionic/angular';

import { TabsPage } from './tabs.page';
import { StorageService } from 'src/app/core/services/_service-util/storage.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule
  ],
  declarations: [],
  providers: [StorageService]
})
export class TabsPageModule {}
