import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

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

}
