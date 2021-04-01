import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/_service-util/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user;
  
  constructor(private storageService: StorageService) {
    /*this.storageService.obsUser.subscribe(resp => {
      console.log('TABS RESP: ', resp);
      this.user = resp;
    });*/
    this.storageService.userEvent.subscribe(resp => {
      console.log('TABS RESP: ', resp);
      this.user = resp;
    });
  }

  ngOnInit() {}
}
