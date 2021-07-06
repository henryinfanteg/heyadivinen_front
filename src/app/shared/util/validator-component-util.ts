import { formatDate } from '@angular/common';
import { AbstractControl, FormControl, FormGroup, Validators, ValidationErrors, ValidatorFn } from '@angular/forms';
import moment from 'moment';

export class ValidatorComponentUtil {

    // Devuelve true si el campo tiene errores
    static isFieldInvalid(fieldControl: AbstractControl): boolean {
        return fieldControl.invalid && fieldControl.touched;
    }

    // Devuelve true si el campo es requerido
    static isRequired(fieldControl: AbstractControl): boolean {
        if (fieldControl.validator) {
            const validator = fieldControl.validator({} as AbstractControl);
            if (validator && validator.required) {
                return true;
            } else {
                return false;
            }
        }
    }

    // Devuelve el error de un campo
    static getFieldError(fieldControl: AbstractControl, fieldType?: string): string {
        // console.log('getFieldError:', fieldType, fieldControl.value, JSON.stringify(fieldControl.errors));
        let message = '';

        if (fieldControl.hasError('required')) {
            message = 'Campo requerido';
        } else if (fieldControl.hasError('minlength')) {
            message = `Mínimo ${fieldControl.errors.minlength.requiredLength} caracteres`;
        } else if (fieldControl.hasError('maxlength')) {
            message = `Máximo ${fieldControl.errors.maxlength.requiredLength} caracteres`;
        } else if(fieldControl.hasError('noAge')) {
            message = `Debes tener mínimo 13 años para registrarte`;
        } else if (fieldControl.hasError('pattern')) {
            if (fieldType && fieldType.includes('email')) {
                message = 'Debe tener un formato de email';
            } else if (fieldType && fieldType === 'soloLetras') {
                message = 'Este campo no puede contener números';
            } else if(fieldType && fieldType.includes('password')) {
                message = 'Debe tener un número, una minúscula y una mayúscula por lo menos';
            } else {
                message = 'Formato inválido';
            }
        } else if (fieldControl.hasError('mustMatch')) {
            if (fieldType && fieldType.includes('password')) {
                message = 'las contraseñas no coinciden';
            } else {
                message = 'los campos no coinciden';
            }
        }
        return message;
    }

    static validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

   static minimumAge(age:number, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const matchingControl = formGroup.controls[matchingControlName];
            let dateB = new Date(formatDate(formGroup.controls[matchingControlName].value, 'yyyy-MM-dd', 'en-US'));
            if (formGroup.controls[matchingControlName].valid) {
              // carefull, moment months range is from 0 to 11
              const value: { year: string, month: string, day: string } = {
                year: dateB.getFullYear() + '',
                month: dateB.getMonth() + '',
                day: dateB.getDate() + '',
              };
              const date = moment({ year: +value.year, month: (+value.month) - 1, day: +value.day }).startOf('day');
              if (date.isValid()) {
                // https://momentjs.com/docs/#/displaying/difference/
                const now = moment().startOf('day');
                const yearsDiff = date.diff(now, 'years');
                if (yearsDiff > -age) {
                    matchingControl.setErrors({ noAge: true });
                } else {
                    matchingControl.setErrors(null);
                }
              }
            }
          };
      }

}
