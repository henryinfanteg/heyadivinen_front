

export class User {
    uid: string;
    country: number;
    birthDate: Date;
    username: string;
    mailVerified = false;
    status = true;
    creationDate = new Date();
    modifyDate: Date;
    parameters = 
        {
            countryPreference: 'CO',
            initYear: 0,
            endYear: 0
        }
    
}