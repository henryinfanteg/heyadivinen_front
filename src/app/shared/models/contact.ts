export class Contact {
    id: string;
    email: string;
    subject: string;
    message: string;
    status: string;
    creationDate = new Date();
    updateModify: Date;
}