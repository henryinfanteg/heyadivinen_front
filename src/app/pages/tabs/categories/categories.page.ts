import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
// import { LoaderService } from 'src/app/core/services/_service-util/loader.service';
import { ColorsUtil } from 'src/app/shared/util/colors-util';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { FirebaseauthService } from 'src/app/services/firebase/firebaseauth.service';
import { ToastService } from 'src/app/core/services/_service-util/toast.service';
import { Parameters } from 'src/app/shared/parameters';
import { StorageService } from 'src/app/core/services/_service-util/storage.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit, OnDestroy {

  templateRetry = false;

  categories = [];
  user;

  constructor(
    public router: Router,
    private firestoreService: FirestoreService,
    private fireauth: FirebaseauthService,
    private toastService: ToastService,
    private storageService: StorageService
    //, private loaderService: LoaderService
  ) {
  }
  ngOnDestroy(): void {
    this.storageService.userEvent.unsubscribe();
  }

  ngOnInit() {
    this.getAllCategories();
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
    // AQUI FALTA MIRAR QUE PASA CUANDO HAY ERROR Y COLOCAR EL HANDLER ERROR
    this.firestoreService.getCollection(Parameters.pathCategories).subscribe(resp => {
      this.categories = resp;
    });
  }

  showInstructions(categoria) {
    const navigationExtras: NavigationExtras = {
      state: {
        categoria: categoria
      }
    };
    this.router.navigate(['/tabs/home/instructions'], navigationExtras);
  }

  logout() {
    const resp = this.fireauth.logout();
    if(resp) {
      this.storageService.userEvent.emit(null);
      this.router.navigate(['/login']);
    } else {
      this.toastService.presentToast(Parameters.registerErrorService, Parameters.durationToastThree, Parameters.colorError);
    }
  }
}


