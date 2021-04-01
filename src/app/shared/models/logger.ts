export class LoggerRequest {
    date = new Date();
    type = 'REQUEST';
    level: string;
    requestId: string;
    appId: string;
    username: string;
    ipClient: string;
    ipServer: string;
    api: string;
    method: string;
    uri: string;
    body: string;
}

export class LoggerTrace {
    date = new Date();
    type = 'TRACE';
    level: string;
    requestId: string;
    api: string;
    method: string;
    message: string;
    endpoint: string;
    body: string;
    statusCode: string;
    error: string;
}

export class LoggerResponse {
    date = new Date();
    type: string;
    level: string;
    uid: string;
    username: string;
    api: string;
    method: string;
    body: string;
    statusCode: number;
    message: string;
    response: string;
}

export class LoggerGeneral {
    date = new Date();
    type: string;
    level: string;
    body: string;
    response: string;
    username: string;
    ipClient: string;
    ipServer: string;
    api: string;
    method: string;
    uri: string;
    statusCode: number;
    message: string;
}