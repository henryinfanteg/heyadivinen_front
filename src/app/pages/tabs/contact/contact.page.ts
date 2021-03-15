import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Config } from '../../../configs/config';
import { ValidatorComponentUtil } from 'src/app/shared/util/validator-component-util';
import { Contacto } from 'src/app/shared/models/contacto';
// import { NotifylUtil } from 'src/app/shared/util/notify-util';
import { ContactService } from '../../../services/contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  form: FormGroup;
  isValidFormDatosUsuario = false;
  contacto: Contacto;

  constructor(private formBuilder: FormBuilder, private contactoService: ContactService
    // private notifyUtil: NotifylUtil
    ) { }

  ngOnInit() {
    this.iniatializeForm();
  }

  iniatializeForm() {
    this.form = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(Config.emailValido)])],
      asunto: [null, [Validators.minLength(2)]],
      mensaje: [null, [Validators.minLength(2), Validators.required]]
    });
  }

  isFieldInvalid(fieldControl: AbstractControl): boolean {
    return ValidatorComponentUtil.isFieldInvalid(fieldControl);
  }

  getFieldError(fieldControl: AbstractControl, fieldType?: string): string {
    return ValidatorComponentUtil.getFieldError(fieldControl, fieldType);
  }

  isRequired(fieldControl: AbstractControl): boolean {
    return ValidatorComponentUtil.isRequired(fieldControl);
  }

  enviarMensaje() {
    this.contacto = new Contacto();
    this.contacto.correo = this.form.get('email').value;
    this.contacto.asunto = this.form.get('asunto').value;
    this.contacto.descripcion = this.form.get('mensaje').value;
    this.contacto.estado = Config.pendiente;

    this.contactoService.add(this.contacto).subscribe((response: any) => {
      console.log('response enviarMensaje: ', response);
      if (response != null && response.status === 201) {
        // this.notifyUtil.successToast(Config.mensajeEnviado);
      } else {
        // this.notifyUtil.dangerToast(Config.errorIntenteMasTarde);
      }
    });
}

}
