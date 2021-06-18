

export class User {
    uid: string;
    country: number;
    birthDate: Date;
    username: string;
    mailVerified = false;
    status = true;
    creationDate = new Date();
    modifyDate: Date;
    token: string;
    methodAuth = 'manualAuth';
    parameters = 
        {
            countryPreference: 'CO',
            initYear: 0,
            endYear: 0
        }
    
}