// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  APP_ID: 'MAXADIVINA-APP',

  endpointPalabras: 'http://localhost:3000',
  endpointContacto: 'http://localhost:3001',

  // endpointPalabras: 'http://ec2-34-222-126-25.us-west-2.compute.amazonaws.com:3000',
  // endpointContacto: 'http://ec2-34-222-126-25.us-west-2.compute.amazonaws.com:3001',

  // tslint:disable-next-line:max-line-length
  tokenApiUnknownUser: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOjEsInBlcm1pc29zIjp7IkFERCI6dHJ1ZSwiREVMRVRFIjp0cnVlLCJSRUFEIjp0cnVlLCJVUERBVEUiOnRydWV9LCJhdWQiOiJBTEwiLCJpYXQiOjE1MzU5NTA2ODYsImlzcyI6IlRFU1QiLCJzdWIiOiJhZG1pbiJ9.Ewt7rbpqeUFwH1pDItgFeFNyOEFDJAc0iWEt0mFuhXM',
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  firebaseConfig : {
    apiKey: "AIzaSyDcSmOKllR_dfb1p5wc70OF3K2Jz7Owg_M",
    authDomain: "heyadivinen.firebaseapp.com",
    projectId: "heyadivinen",
    storageBucket: "heyadivinen.appspot.com",
    messagingSenderId: "813522283524",
    appId: "1:813522283524:web:6e61761e76b0af189ed951",
    measurementId: "G-EXTBQ9CBX2"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
