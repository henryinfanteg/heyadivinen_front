import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailService } from './core/services/_service-util/detail.service';
import { SQLiteService } from './core/services/_service-util/sqlite.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import { ToastService } from './core/services/_service-util/toast.service';
import { TabsPage } from './pages/tabs/tabs/tabs.page';
import { LoggerService } from './services/logger.service';
import { HandlerErrorService } from './services/handler-error.service';
import { HeaderComponent } from './components/header/header.component';
// import { LoaderService } from 'src/app/core/services/_service-util/loader.service';
// import { NotifylUtil } from 'src/app/shared/util/notify-util';

@NgModule({
  declarations: [AppComponent, TabsPage, HeaderComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    // LoaderService,
    // NotifylUtil,
    SQLiteService,
    DetailService,
    ToastService,
    LoggerService,
    HandlerErrorService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
