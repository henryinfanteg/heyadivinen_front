import { Config } from '../../configs/config';

export class RequestUtil {

    static generateRequestId(apiName?: string): string {
        return this.getInitialsApi(apiName) + new Date().getTime() + this.getRandomInt(1, 100);
    }

    static getInitialsApi(apiName: string): string {
        switch (apiName) {
            // Palabras
            case Config.apiPalabrasPalabras: {
                return 'APAPAL';
            }
            case Config.apiPalabrasCategorias: {
                return 'APACAT';
            }
            default: {
                return '';
            }
        }
    }

    static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
