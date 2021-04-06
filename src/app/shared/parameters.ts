export class Parameters {
    static pathUser = 'users/';
    static pathUserLogs = 'users-logs/';
    static pathCategories = 'categories/';
    static pathCategorieslogs = 'categories-logs/';
    static pathAuth = 'fireauth';

    // LOGS
    static logsCreate = 'CREATE';
    static logsLevelInfo = 'INFO';
    static logsLevelError = 'ERROR';
    static logsMessageUserCreated = 'USER CREATED';
    static logsMessageGetCreated = 'GET USER';
    static logsMessageUserSignUp = 'USER SIGN UP';
    static logsMessageUserSignIn = 'USER SIGN IN';
    static logsMessageUserGetAllCategories = 'ALL CATEGORIES GOT';
    static logsMessageLogOutSuccess = 'LOG OUT SUCCESS';
    
    static methodNameCreateUser = 'createUser';
    static methodNameSignUp = 'signUp';
    static methodNameSignIn = 'signIn';
    static methodNameGetInfoUser = 'getInfoUser';
    static methodNameGetAllCategories = 'getAllCategories';
    static methodNameLogOut = 'logout';

    static statusCodeCreate = 201;
    static statusCodeSuccess = 200;
    static statusCodeErrorGeneric = 400;

    static timeIntro = 3;
    static timeGame = 45;

    static actionPass = 'pass';
    static actionCorrect = 'correct';
    static pointsHit = 3;


    // ERRRORS
    static genericErrorService = 'Ha ocurrido un error. Por favor intenta más tarde';
    static registerErrorService = 'Ha ocurrido un error con el registro. Por favor intenta más tarde';
    static signInErrorService = 'Ha ocurrido un error al iniciar sesión. Por favor intenta más tarde';
    static createUserErrorService = 'Ha ocurrido un error al crear el usuario. Por favor intenta más tarde';
    static logOutErrorService = 'Ha ocurrido un error al cerrar sesión. Por favor intenta más tarde';
    static emailExisteErrorService = 'Ya hay una cuenta creada con este correo. Si no recuerdes la contraseña, dale click en "Restablecer contraseña"';
    static passOrUserIncorrectErrorService = 'El usuario y/o contraseña son incorrectos. Si no recuerdes la contraseña, dale click en "Restablecer contraseña"';
    static getAllCategoriesErrorService = 'Ha ocurrido un error al obtener las categorías. Por favor intenta más tarde';

    static durationToastThree = 5000;

    static colorError = 'danger';
}