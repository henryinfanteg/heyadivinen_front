import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
// import { LoaderService } from 'src/app/core/services/_service-util/loader.service';
import { ColorsUtil } from 'src/app/shared/util/colors-util';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { FirebaseauthService } from 'src/app/services/firebase/firebaseauth.service';
import { ToastService } from 'src/app/core/services/_service-util/toast.service';
import { Parameters } from 'src/app/shared/parameters';
import { StorageService } from 'src/app/core/services/_service-util/storage.service';
import { HandlerErrorService } from 'src/app/services/handler-error.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit, OnDestroy {

  templateRetry = false;

  categories = [];
  user;

  categoryTest = {
    createDate: null,
    description: "PELÍCULAS 1",
    icon: "movies-one",
    id: 1,
    price: 0,
    status: true,
    updateDate: null,
    words: [{ clue: "", description: "Titanic" }, { clue: "", description: "Harry Potter" }]
  };

  getAllCategories$;

  constructor(
    public router: Router,
    private firestoreService: FirestoreService,
    private fireauth: FirebaseauthService,
    private toastService: ToastService,
    private storageService: StorageService,
    private loggerService: LoggerService,
    private handlerError: HandlerErrorService
    //, private loaderService: LoaderService
  ) {
    this.user = this.storageService.getDataUser();
  }
  ngOnDestroy(): void {
    this.storageService.userEvent.unsubscribe();
    this.getAllCategories$.unsubscribe();
  }

  ngOnInit() {
    // this.getAllCategories();
  }

  changeColor(index) {
    return ColorsUtil.getColors(index);
  }

  freeOrNot(flag) {
    if (flag) {
      return '';
    } else {
      return 'logo-usd';
    }
  }

  getAllCategories() {
    this.getAllCategories$ = this.firestoreService.getCollection(Parameters.pathCategories).subscribe(resp => {
      // PENSAR SI BASTA CON EL ARRAY DE CATEGORIAS EN EL SESSION STORAGE
      this.categories = resp;
      this.storageService.setCategories(resp);
      // this.loggerService.logResponse(JSON.stringify(resp), Parameters.methodNameGetAllCategories, this.user.username, this.user.uid, Parameters.logsMessageUserGetAllCategories, Parameters.statusCodeSuccess, null, Parameters.pathCategories);
    }, err => {
      // this.loggerService.loggerError(null, Parameters.methodNameGetAllCategories, this.user.username, this.user.uid, err, Parameters.pathCategories);
      this.handlerError.errorCategories(err.code);
    });
  }

  showInstructions(cat) {
    // TEST LINES -> DELETE FOR PDN
    console.log('---> showInst: ', cat);
    cat = this.categoryTest;

    const navigationExtras: NavigationExtras = {
      state: {
        categoria: cat
      }
    };
    this.router.navigate(['/home/instructions'], navigationExtras);
  }

  logOut() {
    console.log('ENTRÓ AL LOGOUT');
    const resp = this.fireauth.logout().then(res => {
      // this.loggerService.logResponse(JSON.stringify(resp) , Parameters.methodNameLogOut, this.user.username, this.user.uid, Parameters.logsMessageLogOutSuccess, Parameters.statusCodeSuccess, null, Parameters.pathAuth);
      this.storageService.userEvent.emit(null);
      this.router.navigate(['/login']);
    }, err => {
      //this.loggerService.loggerError(null, Parameters.methodNameLogOut, this.user.username, this.user.uid, Parameters.logOutErrorService, Parameters.pathAuth);
      this.handlerError.errorAuth(null, Parameters.logOutErrorService);
    });
    this.getAllCategories$.unsubscribe();
  }
}


