import { AbstractControl, Validators } from '@angular/forms';

/**
 * Validador de CPF em Formulário
 */
export class CpfFormValidator {
    /**
     * Verifica se o CPF informado é válido
     *
     * @returns Validators
     */
    public static validar() {
        return (control: AbstractControl): Validators => {
            const cpfInicial: string = control.value;
            if (cpfInicial.includes('.') || cpfInicial.includes('-')) {
                if (cpfInicial.indexOf('.') !== 3) {
                    return { cpfInvalido: true };
                }
                if (cpfInicial.indexOf('.', 7) !== 7) {
                    return { cpfInvalido: true };
                }
                if (cpfInicial.indexOf('-', 11) !== 11) {
                    return { cpfInvalido: true };
                }
            }
            const regex = new RegExp('[.-]', 'g');
            const cpf = cpfInicial.replace(regex, '');
            if (cpf) {
                let numeros: any;
                let digitos: any;
                let soma: any;

                let resultado: any;
                let digitoVerificador: number;

                digitoVerificador = 1;
                if (cpf.length !== 11) {
                    return { cpfInvalido: true };
                }

                for (let index = 0; index < cpf.length - 1; index++) {
                    if (cpf.charAt(index) !== cpf.charAt(index + 1)) {
                        digitoVerificador = 0;
                        break;
                    }
                }

                if (!digitoVerificador) {
                    numeros = cpf.substring(0, 9);
                    digitos = cpf.substring(9);
                    soma = 0;

                    for (let index = 10; index > 1; index--) {
                        soma += numeros.charAt(10 - index) * index;
                    }
                    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

                    if (resultado !== Number(digitos.charAt(0))) {
                        return { cpfInvalido: true };
                    }

                    numeros = cpf.substring(0, 10);
                    soma = 0;

                    for (let index = 11; index > 1; index--) {
                        soma += numeros.charAt(11 - index) * index;
                    }
                    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

                    if (resultado !== Number(digitos.charAt(1))) {
                        return { cpfInvalido: true };
                    }

                    return null;
                } else {
                    return { cpfInvalido: true };
                }
            }

            return null;
        };
    }
}
