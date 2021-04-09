export class Config {

    // Headers
    static headerRequestId = 'Request-Id';

    // Tipos de estudios
    static versionTerminosCondiciones = 1.0;

    // Valores por defecto
    static paisIdDefault = 'COL'; // Colombia
    static mayoriaEdad = 18;

    static anoActual = new Date().getFullYear();

    // Api Palabras
    static apiPalabrasPalabras = 'palabras - palabras';
    static apiPalabrasCategorias = 'words - categories';

    // Api Contacto
    static apiContacto = 'contact - contact';

    // Api Trace
    static apiTrace = 'trace - trace';

    // Patrones - Expresiones Regulares
    static validEmail = '[a-zA-Z\-0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';
    static validPassword = '^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\\D*\\d)[A-Za-z\\d!$%@#£€*?&]{6,}$';

    // Estados mensajes
    static pending = 'PENDIENTE';

    // APIS Existentes
    static apis = [
        // Api Palabras
        'words',
        'categoriasPalabras',
        'contact'
    ];

    // MENSAJES GENÉRICOS
    static mensajeEnviado = 'Tu mensaje fue enviado con éxito';
    static errorIntenteMasTarde = 'Ha ocurrido un error. Intenta más tarde.';

    // COLORES PARA BACKGROUND CATEGORIAS
    static coloresCategorias = [
        '#0080d0',
        '#d8424b',
        '#05958c',
        '#5c3dbf',
        '#0080d0',
        '#d8424b',
        '#05958c',
        '#5c3dbf',
        '#0080d0',
        '#d8424b',
        '#05958c',
        '#5c3dbf',
    ];
}
