import { Plugins, StatusBarStyle } from "@capacitor/core";
import { Platform } from "@ionic/angular";
import { Component } from '@angular/core';
import { DetailService } from "./core/services/_service-util/detail.service";
import { SQLiteService } from "./core/services/_service-util/sqlite.service";
import { DBService } from "./core/services/_service-util/db.service";
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

  private initPlugin: boolean;
  public user = this.storageService.getDataUser();

  constructor(
    private platform: Platform,
    private _sqlite: SQLiteService,
    private _detail: DetailService,
    private dbService: DBService,
    private fireauth: FirebaseauthService,
    private router: Router,
    private storageService: StorageService
  ) {
    this.initializeApp();
  }

  /*
  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    try {
      this.platform.ready().then(async => {
        SplashScreen.show();
        StatusBar.setStyle({ style: StatusBarStyle.Light });
        this.databaseService.init();
        this.databaseService.dbReady.subscribe(isReady => {
          if (isReady) {
            console.log('**** DB Readyyy');
          }
        });


        if (navigator.onLine) {
          console.log('**** Internet is connected');
        } else {
          console.log('**** No internet connection');
        }
        if (this.platform.is('android')) {
          StatusBar.setBackgroundColor({ color: '#CDCDCD' });
        }
      });;

    } catch (error) {
      console.log('This is normal in a web browser', error);
    }
  }*/

  initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    this.platform.ready().then(async () => {
      SplashScreen.show();
      // StatusBar.setStyle({ style: StatusBarStyle.Light });
      this._detail.setExistingConnection(false);
      this._detail.setExportJson(false);
      this._sqlite.initializePlugin().then(ret => {
        this.initPlugin = ret;
        console.log(">>>> in App  this.initPlugin " + this.initPlugin);
        this.fireauth.stateAuth().subscribe(res => {
          console.log('**** res stateAuth: ', res);
          if(res !== null) {
            this.user.uid = res.uid;
            this.user.username = res.email;
            this.storageService.setDataUser(this.user);
            this.router.navigate(['/home']);
          } else {
            this.router.navigate(['/login']);
          }
        });
        // this.dbService.importFullJsonToDb(); 
        // this.dbService.addUser(); 
      });
    });
  }
}
