import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Config } from '../../../configs/config';
import { ValidatorComponentUtil } from 'src/app/shared/util/validator-component-util';
import { Contact } from 'src/app/shared/models/contact';
// import { NotifylUtil } from 'src/app/shared/util/notify-util';
import { ContactService } from '../../../services/contact/contact.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { Parameters } from 'src/app/shared/parameters';
import { ToastService } from 'src/app/core/services/_service-util/toast.service';
import { HandlerErrorService } from 'src/app/services/handler-error.service';
import { LoggerService } from 'src/app/services/logger.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  form: FormGroup;
  isValidFormDatosUsuario = false;
  contact: Contact;
  validatorComponent = ValidatorComponentUtil;

  constructor(
    private formBuilder: FormBuilder,
    private firestore: FirestoreService,
    private toastService: ToastService,
    private handlerError: HandlerErrorService,
    private loggerService: LoggerService
    // private notifyUtil: NotifylUtil
  ) { }

  ngOnInit() {
    this.iniatializeForm();
  }

  iniatializeForm() {
    this.form = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(Config.validEmail)])],
      subject: [null, [Validators.minLength(2)]],
      message: [null, [Validators.minLength(2), Validators.required]]
    });
  }

  sendMessage() {
    if (this.form.valid) {
      this.contact = new Contact();
      this.contact.email = this.form.controls.email.value;
      this.contact.subject = this.form.controls.subject.value;
      this.contact.message = this.form.controls.message.value;
      this.contact.status = Config.pending;

      this.firestore.createGenericAutomaticId(this.contact, Parameters.pathContact).then(res => {
        this.toastService.presentToast(Parameters.messageSent, Parameters.durationToastThree, Parameters.colorSuccess);
      }, err => {
        // this.loggerService.loggerError(this.form.controls.email.value, Parameters.methodNameSendMessage, this.form.controls.email.value, null, err, Parameters.pathAuth);
        this.handlerError.errorContact(err);
      });
    } else {
      this.validatorComponent.validateAllFormFields(this.form);
    }

  }

}
