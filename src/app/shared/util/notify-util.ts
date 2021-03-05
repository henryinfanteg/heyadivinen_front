import { ToastController } from '@ionic/angular';

declare const $: any;

export class NotifylUtil {

    constructor(private toastController: ToastController) { }

    async successToast(message: string) {
        const toast = await this.toastController.create({
          color: 'success',
          message: message,
          duration: 2000
        });
        toast.present();
    }

    async dangerToast(message: string) {
        const toast = await this.toastController.create({
          color: 'danger',
          message: message,
          duration: 2000
        });
        toast.present();
    }

}
