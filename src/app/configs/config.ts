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
    static apiPalabrasCategorias = 'palabras - categorias';

    // Api Contacto
    static apiContacto = 'contacto - contacto';

    // Api Trace
    static apiTrace = 'trace - trace';

    // Patrones - Expresiones Regulares
    static emailValido = '[a-zA-Z\-0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}';

    // Estados mensajes
    static pendiente = 'PENDIENTE';

    // APIS Existentes
    static apis = [
        // Api Palabras
        'palabras',
        'categoriasPalabras',
        'contacto'
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
