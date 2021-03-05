export class StringUtil {

  // Obtienes las iniciales de un grupo de palabras
  static getIniciales(...texts: string[]) {
    let iniciales = '';
    for (const text of texts) {
      iniciales += text.charAt(0);
    }
    return iniciales;
  }

  static colocarPuntoAlFinal(cadena: string) {
    if (cadena.substring(cadena.length - 1) !== '.') {
      cadena = cadena + '.';
    }
    return cadena;
  }

  static cortarTexto(texto: string, length: number) {
    if (texto.length > length) {
      return texto.substring(0, length) + '...';
    }
    return texto;
  }

  static eliminarTildes(texto: string): string {
    return texto.replace(/Á/g, 'A')
    .replace(/É/g, 'E')
    .replace(/Í/g, 'I')
    .replace(/Ó/g, 'O')
    .replace(/Ú/g, 'U')
    .replace(/Ñ/g, 'N')
    .replace(/Ä/g, 'A')
    .replace(/Ö/g, 'O')
    .replace(/Ü/g, 'U')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/ä/g, 'a')
    .replace(/ö/g, 'o')
    .replace(/ü/g, 'u');
  }

}
