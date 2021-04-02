import { Injectable } from '@angular/core';
import { LoggerResponse } from '../shared/models/logger';
import { Parameters } from '../shared/parameters';
import { FirestoreService } from './firebase/firestore.service';

@Injectable({ providedIn: 'root' })
export class LoggerService {

    loggerResponse = new LoggerResponse();

    constructor(private firestore: FirestoreService) {
    }

    logResponse(response: any, methodName: string, username: string, uid: string, message: string, statusCode: number, body: any, api: string) {
        this.loggerResponse.type = Parameters.logsCreate;
        this.loggerResponse.level = Parameters.logsLevelInfo;
        this.loggerResponse.body = body + '';
        this.loggerResponse.uid = uid + '';
        this.loggerResponse.response = response + '';
        this.loggerResponse.username = username + '';
        this.loggerResponse.api = api + '';
        this.loggerResponse.method = methodName + '';
        this.loggerResponse.statusCode = statusCode;
        this.loggerResponse.message = message + '';
        console.log('loggerCreate: ', this.loggerResponse);
        this.firestore.createGenericAutomaticId(this.loggerResponse, Parameters.pathUserLogs);
    }

    loggerError(data: any, methodName: string, username: string, uid: string, err, api) {
        this.loggerResponse.type = Parameters.logsCreate;
        this.loggerResponse.level = Parameters.logsLevelError;
        this.loggerResponse.body = data + '';
        this.loggerResponse.uid = uid + '';
        this.loggerResponse.response = err.code + '';
        this.loggerResponse.username = username + '';
        this.loggerResponse.api = api + '';
        this.loggerResponse.method = methodName + '';
        // AVERIGUAR DONDE PUEDO SACAR EL STATUSCODE DEL ERROR
        this.loggerResponse.message = err.message + '';
        console.log('loggerError: ', this.loggerResponse);
        this.firestore.createGenericAutomaticId(this.loggerResponse, Parameters.pathUserLogs);
    }

    loggerRead() { }

}
