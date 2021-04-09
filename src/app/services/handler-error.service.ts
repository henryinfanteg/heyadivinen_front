import { Injectable } from "@angular/core";
import { ToastService } from "src/app/core/services/_service-util/toast.service";
import { Parameters } from "../shared/parameters";


@Injectable({ providedIn: 'root' })
export class HandlerErrorService {

  constructor(private toastService: ToastService) { }

  errorAuth(err: string, msg: string) {
    switch (err) {
      case 'auth/wrong-password' || 'auth/user-not-found':
        this.toastService.presentToast(msg, Parameters.durationToastThree, Parameters.colorError);
        break;
      case 'auth/email-already-in-use':
        this.toastService.presentToast(msg, Parameters.durationToastThree, Parameters.colorError);
        break;
      default:
        this.toastService.presentToast(Parameters.genericErrorService, Parameters.durationToastThree, Parameters.colorError);
    }
  }

  errorCategories(err: string, msg?: string) {
    switch (err) {
      default:
        this.toastService.presentToast(Parameters.getAllCategoriesErrorService, Parameters.durationToastThree, Parameters.colorError);
    }
  }

  errorUser(err: string, msg?: string) {
    switch (err) {
      default:
        this.toastService.presentToast(Parameters.createUserErrorService, Parameters.durationToastThree, Parameters.colorError);
    }
  }

  errorContact(err: string, msg?: string) {
    switch (err) {
      default:
        this.toastService.presentToast(Parameters.sendMessageErrorService, Parameters.durationToastThree, Parameters.colorError);
    }
  }
}
