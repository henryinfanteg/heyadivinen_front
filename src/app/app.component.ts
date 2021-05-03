import { Plugins, StatusBarStyle } from "@capacitor/core";
import { Platform } from "@ionic/angular";
import { Component } from '@angular/core';
import { FirebaseauthService } from "./services/firebase/firebaseauth.service";
import { Router } from "@angular/router";
import { StorageService } from "./core/services/_service-util/storage.service";
import { User } from "./shared/models/user";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  constructor(
    private platform: Platform,
    private fireauth: FirebaseauthService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    this.platform.ready().then(async () => {
      SplashScreen.show();
      // StatusBar.setStyle({ style: StatusBarStyle.Light });
      this.fireauth.stateAuth().subscribe(res => {
        console.log('**** res stateAuth: ', res);
        if (res !== null) {
          if (res.emailVerified) {
            console.log('**** ENTRO NULLLL');
            const user = new User();
            user.uid = res.uid;
            user.username = res.email;
            this.storageService.userEvent.emit(user);
            // this.storageService.setDataUser(user);
            this.router.navigate(['/home']);
          } else {
            console.log('**** EMAIL NO VERIFICADO');
          }
        } else {
          this.router.navigate(['/login']);
        }
      });
    });
  }
}
