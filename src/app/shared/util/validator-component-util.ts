import {AbstractControl } from '@angular/forms';

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
        // console.log('error:', fieldType, fieldControl.value, JSON.stringify(fieldControl.errors));
        let message = '';

        if (fieldControl.hasError('required')) {
            message = 'Campo requerido';
        } else if (fieldControl.hasError('minlength')) {
            message = `Mínimo ${fieldControl.errors.minlength.requiredLength} caracteres`;
        } else if (fieldControl.hasError('maxlength')) {
            message = `Máximo ${fieldControl.errors.maxlength.requiredLength} caracteres`;
        } else if (fieldControl.hasError('pattern')) {
            if (fieldType && fieldType.includes('email')) {
                message = 'Formato de email invalido';
            } else if (fieldType && fieldType === 'soloLetras') {
                message = 'No se permiten números en este campo';
            } else {
                message = 'Formato invalido';
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

}
