import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/_service-util/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  user;
  
  constructor(private storageService: StorageService, private router: Router, private activedRoute: ActivatedRoute) {
    this.storageService.userEvent.subscribe(resp => {
      this.user = resp;
    });
  }

  prueba() {
    console.log('AAAAAAA: ', this.activedRoute);
  }

  ngOnInit() {}
}
