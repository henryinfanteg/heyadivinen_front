import { Injectable } from "@angular/core";
import { ToastController } from "@ionic/angular";


@Injectable({
    providedIn: 'root'
  })
export class ToastService {

    constructor(public toastController: ToastController) { }

    async presentToast(msg: string, time: number, clr: string) {
        const toast = await this.toastController.create({
            message: msg,
            duration: time,
            color: clr
        });
        toast.present();
    }

}