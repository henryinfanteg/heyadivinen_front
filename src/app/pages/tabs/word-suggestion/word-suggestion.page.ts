import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'src/app/core/services/_service-util/toast.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { HandlerErrorService } from 'src/app/services/handler-error.service';
import { LoggerService } from 'src/app/services/logger.service';
import { Suggestion } from 'src/app/shared/models/suggestion';
import { Parameters } from 'src/app/shared/parameters';
import { ValidatorComponentUtil } from 'src/app/shared/util/validator-component-util';

@Component({
  selector: 'app-word-suggestion',
  templateUrl: './word-suggestion.page.html',
  styleUrls: ['./word-suggestion.page.scss'],
})
export class WordSuggestionPage implements OnInit {

  form: FormGroup;
  isValidFormDatosUsuario = false;
  validatorComponent = ValidatorComponentUtil;
  suggestion: Suggestion;

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
      category: [null, [Validators.required]],
      words: [null, [Validators.required]]
    });
  }

  sendSuggestion() {
    if (this.form.valid) {
      this.suggestion = new Suggestion();
      this.suggestion.category = this.form.controls.category.value;
      this.suggestion.words = this.form.controls.words.value;

      this.firestore.createGenericAutomaticId(this.suggestion, Parameters.pathSuggestion).then(res => {
        this.toastService.presentToast(Parameters.suggestionSent, Parameters.durationToastThree, Parameters.colorSuccess);
      }, err => {
        // this.loggerService.loggerError(this.form.controls.email.value, Parameters.methodNameSendMessage, this.form.controls.email.value, null, err, Parameters.pathAuth);
        this.handlerError.errorContact(err);
      });
    } else {
      this.validatorComponent.validateAllFormFields(this.form);
    }

  }

}
