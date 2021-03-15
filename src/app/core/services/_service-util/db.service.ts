import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import '@capacitor-community/sqlite';
import { BehaviorSubject } from 'rxjs';
import { SQLiteService } from './sqlite.service';
import { DetailService } from './detail.service';
import DB from '../../../../assets/db.json';

const DB_NAME_KEY = 'heyadivinen';
const twoUsers: string = `
INSERT INTO users (id,username) VALUES (1,"henfante90");
INSERT INTO users (id,username) VALUES (2,"henryinfanteg");
`;

@Injectable({
    providedIn: 'root'
})
export class DBService {
    sqlite: any;
    platform: string;
    handlerPermissions: any;
    initPlugin: boolean = false;

    constructor(
        private _sqlite: SQLiteService,
        private _detailService: DetailService
    ) { }

    async exportPartialDbToJson(): Promise<boolean> {
        let result: any = await this._sqlite.echo("Hello World");
        console.log(" from Echo " + result.value);

        // ************************************************
        // Export Json Object from an Existing Database
        // ************************************************

        // create the connection to the database
        const db = await this._sqlite
            .createConnection(DB_NAME_KEY, false,
                "no-encryption", 1);
        if (db === null) return false;

        // open db testNew
        result = await db.open();
        if (!result.result) return false;

        // ************************************************
        // Partial Export json
        // ************************************************
        result = await db.setSyncDate("2020-05-20T18:40:00.000Z");
        if (!result.result) {
            console.log(`setSyncDate: ${result.message}`);
            return false;
        }
        let jsonObj = await db.exportToJson('partial');
        console.log("$$$ jsonObj " + JSON.stringify(jsonObj))
        // test Json object validity
        result = await this._sqlite
            .isJsonValid(JSON.stringify(jsonObj.export));
        if (!result.result) {
            console.log(`isJsonValid: ${result.message}`);
            return false;
        }
        /*if (jsonObj.export.tables.length != 3 || jsonObj.export.tables[0].name != 'users'
            || jsonObj.export.tables[1].name != 'messages' || jsonObj.export.tables[2].name != 'images'
            || jsonObj.export.tables[0].values.length != 4 || jsonObj.export.tables[1].values.length != 3
            || jsonObj.export.tables[2].values.length != 1) {
            return false;
        }*/
        // close the connection
        result = await this._sqlite.closeConnection(DB_NAME_KEY);
        if (!result.result) return false;
        this._detailService.setExportJson(false);

        return true;
    }

    async exportFullDbToJson(): Promise<boolean> {
        let result: any = await this._sqlite.echo("Hello World");
        console.log(" from Echo " + result.value);

        // ************************************************
        // Export Json Object from an Existing Database
        // ************************************************

        // create the connection to the database
        const db = await this._sqlite
            .createConnection(DB_NAME_KEY, false,
                "no-encryption", 1);
        if (db === null) return false;

        // open db testNew
        result = await db.open();
        if (!result.result) return false;

        // ************************************************
        // Full Export json
        // ************************************************
        let jsonObj: any = await db.exportToJson('full');

        console.log("$$$ jsonObj " + JSON.stringify(jsonObj))
        // test Json object validity
        result = await this._sqlite
            .isJsonValid(JSON.stringify(jsonObj.export));
        if (!result.result) {
            console.log(`isJsonValid: ${result.message}`);
            return false;
        }
        // test Json object validity
        result = await this._sqlite
            .isJsonValid(JSON.stringify(jsonObj.export));
        if (!result.result) {
            console.log(`isJsonValid: ${result.message}`);
            return false;
        }
        /*if (jsonObj.export.tables.length != 3 || jsonObj.export.tables[0].name != 'category'
            || jsonObj.export.tables[1].name != 'messages' || jsonObj.export.tables[2].name != 'images'
            ) {
            return false;
        }*/
        // close the connection
        result = await this._sqlite.closeConnection(DB_NAME_KEY);
        if (!result.result) return false;
        this._detailService.setExportJson(false);

        return true;
    }

    async importPartialJsonToDb(): Promise<boolean> {
        let result: any = await this._sqlite.echo("Hello World");
        console.log(" from Echo " + result.value);

        // ************************************************
        // Create Database from imported Json
        // ************************************************

        // test Json object validity
        result = await this._sqlite
            .isJsonValid(JSON.stringify(DB));
        if (!result.result) {
            console.log(`isJsonValid: ${result.message}`);
            return false;
        }
        console.log("$$$ dataToImport Json Object is valid $$$");
        
        // partial import
        result = await this._sqlite
            .importFromJson(JSON.stringify(DB));
        console.log(`partial import result ${result.changes.changes}`);
        if (result.changes.changes === -1) return false;
        // create the connection to the database
        let db = await this._sqlite
            .createConnection(DB_NAME_KEY, false,
                "no-encryption", 1);
        if (db === null) return false;

        // open db "db-from-json"
        result = await db.open();
        if (!result.result) return false;

        result = await db.getSyncDate();
        if (result.syncDate === 0) return false;
        console.log("$$ syncDate " + result.syncDate);

        // select all users in db
        result = await db.query("SELECT * FROM CATEGORIES;");
        console.log(`result.values ${JSON.stringify(result)}`)
        /*if (result.values.length !== 6 ||
            result.values[0].name !== "Whiteley" ||
            result.values[1].name !== "Jones" ||
            result.values[2].name !== "Simpson" ||
            result.values[3].name !== "Brown" ||
            result.values[4].name !== "Addington" ||
            result.values[5].name !== "Bannister") {
            return false;
        }*/

        // close the connection
        result = await this._sqlite.closeConnection(DB_NAME_KEY);
        console.log(`result after closeConnection ${JSON.stringify(result)}`)
        if (!result.result) return false;

        this._detailService.setExportJson(true);
        return true;

    }

    async importFullJsonToDb(): Promise<boolean> {
        let result: any = await this._sqlite.echo("Hello importFullJsonToDb &&");
        console.log(" from Echo " + result.value);

        // ************************************************
        // Create Database from imported Json
        // ************************************************

        // test Json object validity
        result = await this._sqlite
            .isJsonValid(JSON.stringify(DB));
            console.log('#### result: ', result);
        if (!result.result) {
            console.log(`isJsonValid: ${result.message}`);
            return false;
        }
        console.log("$$$ dataToImport Json Object is valid $$$")
        // full import
        result = await this._sqlite
            .importFromJson(JSON.stringify(DB));
        console.log(`full import result ${result.changes.changes}`);
        if (result.changes.changes === -1) return false;


        // create the connection to the database
        let db = await this._sqlite
            .createConnection(DB_NAME_KEY, false,
                "no-encryption", 1);
        if (db === null) return false;

        // open db "db-from-json"
        result = await db.open();
        if (!result.result) return false;

        // create synchronization table 
        result = await db.createSyncTable();
        if (result.changes.changes < 0) return false;


        result = await db.getSyncDate();
        if (result.syncDate === 0) return false;
        console.log("$$ syncDate " + result.syncDate);

        // select all users in db
        result = await db.query("SELECT * FROM CATEGORIES;");
        /*if(result.values.length !== 4 || 
                      result.values[0].name !== "Whiteley" ||
                      result.values[1].name !== "Jones" ||
                      result.values[2].name !== "Simpson" ||
                      result.values[3].name !== "Brown"  ) {
          return false;
        }*/

        // close the connection
        result = await this._sqlite.closeConnection(DB_NAME_KEY);
        console.log(`result after closeConnection ${JSON.stringify(result)}`)
        if (!result.result) return false;

        this._detailService.setExportJson(true);
        return true;

    }

    async addUser(): Promise<boolean> {
        let result: any = await this._sqlite.echo("Hello World");
        console.log(" from Echo " + result.value);
        // initialize the connection
        const db = await this._sqlite
                    .createConnection(DB_NAME_KEY, false, "no-encryption", 1);
        console.log("db " + db)
    
        // open db testNew
        let ret = await db.open();
        if (!ret.result) {
          return false;
        }
        
        // set the synchronization date
        const syncDate: string = "2021-03-15T00:33:25.000Z";
        ret = await db.setSyncDate(syncDate);
        if(!ret.result) return false;
    
    
        // add two users in db
        ret = await db.execute(twoUsers);
        if (ret.result) {
          return false;
        }
        // select all users in db
        ret = await db.query("SELECT * FROM users;");
    
        // add one user with statement and values              
        /*let sqlcmd: string = 
                    "INSERT INTO users (name,email,age) VALUES (?,?,?)";
        let values: Array<any>  = ["Simpson","Simpson@example.com",69];
        ret = await db.run(sqlcmd,values);
        if(ret.changes.lastId !== 3) {
          return false;
        }*/
        // add one user with statement              
        /*sqlcmd = `INSERT INTO users (name,email,age) VALUES ` + 
                                  `("Brown","Brown@example.com",15)`;
        ret = await db.run(sqlcmd);
        if(ret.changes.lastId !== 4) {
          return false;
        }    */
      }
}