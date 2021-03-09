import { Plugins, StatusBarStyle } from "@capacitor/core";
import { Platform } from "@ionic/angular";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {
  constructor(
    private platform: Platform
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    const {SplashScreen, StatusBar} = Plugins;
    try {
      await SplashScreen.show();
      await StatusBar.setStyle({style: StatusBarStyle.Light});
      if (navigator.onLine) {
        console.log('**** Internet is connected');
     } else {
        console.log('**** No internet connection');
     }
      if(this.platform.is('android')) {
        StatusBar.setBackgroundColor({color: '#CDCDCD'});
      }
    } catch (error) {
      console.log('This is normal in a web browser', error);
    }
  }
}
