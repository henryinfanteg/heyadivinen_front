export class Parameters {
    static pathUser = 'users/';
    static pathUserLogs = 'users-logs/';
    static pathCategories = 'categories/';
    static pathCategorieslogs = 'categories-logs/';
    static pathAuth = 'fireauth';
    static pathContact = 'contact/';
    static pathContactLogs = 'contact-logs/';

    // LOGS
    static logsCreate = 'CREATE';
    static logsLevelInfo = 'INFO';
    static logsLevelError = 'ERROR';
    static logsMessageUserCreated = 'USER CREATED';
    static logsMessageEmailVerificationSent = 'VERIFICATION EMAIL SENT';
    static logsMessageGetCreated = 'GET USER';
    static logsMessageUserSignUp = 'USER SIGN UP';
    static logsMessageUserSignIn = 'USER SIGN IN';
    static logsMessageUserGetAllCategories = 'ALL CATEGORIES GOT';
    static logsMessageLogOutSuccess = 'LOG OUT SUCCESS';
    static logsMessageUpdateUserParamsSuccess = 'LOG OUT SUCCESS';
    
    static methodNameCreateUser = 'createUser';
    static methodNameSignUp = 'signUp';
    static methodNameSignIn = 'signIn';
    static methodNameGetInfoUser = 'getInfoUser';
    static methodNameGetAllCategories = 'getAllCategories';
    static methodNameLogOut = 'logout';
    static methodNameSendMessage = 'sendMessage';
    static methodNameUpdateUserParams = 'updateUserParams';

    static statusCodeCreate = 201;
    static statusCodeSuccess = 200;
    static statusCodeErrorGeneric = 400;

    static timeIntro = 3;
    static timeGame = 45;

    static actionPass = 'pass';
    static actionCorrect = 'correct';
    static pointsHit = 3;

    static messageSent = 'Mensaje enviado';


    // ERRRORS
    static genericErrorService = 'Ha ocurrido un error. Por favor intenta más tarde';
    static registerErrorService = 'Ha ocurrido un error con el registro. Por favor intenta más tarde';
    static signInErrorService = 'Ha ocurrido un error al iniciar sesión. Por favor intenta más tarde';
    static createUserErrorService = 'Ha ocurrido un error al crear el usuario. Por favor intenta más tarde';
    static updateUserErrorService = 'Ha ocurrido un error al actualizar el usuario. Por favor intenta más tarde';
    static sendMessageErrorService = 'Ha ocurrido un error al enviar el mensaje. Por favor intenta más tarde';
    static logOutErrorService = 'Ha ocurrido un error al cerrar sesión. Por favor intenta más tarde';
    static emailExisteErrorService = 'Ya hay una cuenta creada con este correo. Si no recuerdes la contraseña, dale click en "Restablecer contraseña"';
    static passOrUserIncorrectErrorService = 'El usuario y/o contraseña son incorrectos. Si no recuerdes la contraseña, dale click en "Restablecer contraseña"';
    static getAllCategoriesErrorService = 'Ha ocurrido un error al obtener las categorías. Por favor intenta más tarde';
    static emailNoVerified = 'email-no-verified';
    static emailNoVerifiedMsg = 'No se ha verificado su cuenta. Revise su correo electrónico incluyendo los "no deseados"';
    static durationToastThree = 5000;
    static durationToastTen = 10000;

    static colorError = 'danger';
    static colorSuccess = 'success';

    static msgMailSentSuccess = 'Hemos enviado nuevamente el correo de verificación';
    static msgUpdateParamsUserSuccess = 'Se ha guardado la configuración correctamente';
}