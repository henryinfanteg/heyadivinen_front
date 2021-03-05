import { Config } from '../../configs/config';
export class ColorsUtil {
  static getColors(index) {
      const num = this.getNumber(index);
      return Config.coloresCategorias[num];
  }

  static getNumber(data) {
      let i = data;
      if (i > Config.coloresCategorias.length - 1) {
          i = i - Config.coloresCategorias.length;
          if (i < Config.coloresCategorias.length) {
              return i;
          } else {
              this.getNumber(i);
          }
      } else {
          return i;
      }
  }
}
