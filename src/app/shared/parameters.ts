export class Parameters {
    static pathUser = 'users/';
    static pathUserLogs = 'users-logs/';
    static pathCategories = 'categories/';
    static pathCategorieslogs = 'categories-logs/';

    // LOGS
    static logsCreate = 'CREATE';
    static logsLevelInfo = 'INFO';
    static logsLevelError = 'ERROR';
    static logsMessageUserCreated = 'USER CREATED';
    static logsMessageUserSignUp = 'USER SIGN UP';
    
    static methodNameCreateUser = 'createUser';
    static methodNameSignUp = 'signUp';

    static statusCodeCreate = 201;
    static statusCodeSuccess = 200;
    static statusCodeErrorGeneric = 400;


    // ERRRORS
    static registerErrorService = 'Ha ocurrido un error con el registro. Por favor intenta más tarde';
    static createUserErrorService = 'Ha ocurrido un error al crear el usuario. Por favor intenta más tarde';
    static logoutErrorService = 'Ha ocurrido un error al cerrar sesión. Por favor intenta más tarde';
    static emailExisteErrorService = 'Ya hay una cuenta creada con este correo. Si no recuerdes la contraseña, dale click en "Restablecer contraseña"';
    static passOrUserIncorrectErrorService = 'El usuario y/o contraseña son incorrectos. Si no recuerdes la contraseña, dale click en "Restablecer contraseña"';

    static durationToastThree = 5000;

    static colorError = 'danger';
}