import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import '@capacitor-community/sqlite';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { JsonSQLite } from '@capacitor-community/sqlite';
import DB from '../../../../assets/db.json';
import { Category } from 'src/app/shared/models/category';
const { CapacitorSQLite, Device, Storage } = Plugins;

const DB_SETUP_KEY = 'first_db_setup';
const DB_NAME_KEY = 'heyadivinen-local-db';
const DB_NAME_COMPLETE_KEY = DB_NAME_KEY + '-dbSQLite';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  dbReady = new BehaviorSubject(false);
  dbName = '';

  constructor(private http: HttpClient, private alertCtrl: AlertController) { }

  async init(): Promise<void> {
    const info = await Device.getInfo();

    if (info.platform === 'android') {
      try {
        const sqlite = CapacitorSQLite as any;
        await sqlite.requestPermissions();
        this.setupDatabase();
      } catch (e) {
        const alert = await this.alertCtrl.create({
          header: 'No DB access',
          message: 'This app can\'t work without Database access.',
          buttons: ['OK']
        });
        await alert.present();
      }
    } else {
      this.setupDatabase();
    }
  }

  private async setupDatabase() {
    const dbSetupDone = await Storage.get({ key: DB_SETUP_KEY });
    console.log('-----> dbSetupDone: ', dbSetupDone);
    if (!dbSetupDone.value) {
      this.downloadDatabase();
    } else {
      this.dbName = (await Storage.get({ key: DB_NAME_KEY })).value;
      console.log('----> dbName ***: ', this.dbName);

      await CapacitorSQLite.open({ database: this.dbName });
      this.dbReady.next(true);
    }
  }

  // Potentially build this out to an update logic:
  // Sync your data on every app start and update the device DB
  private async downloadDatabase(update = false) {
    //this.http.get('https://devdactic.fra1.digitaloceanspaces.com/tutorial/db.json').subscribe(async (jsonExport: JsonSQLite) => {
    // const jsonstring = JSON.stringify(jsonExport);
    const jsonstring = JSON.stringify(DB);
    const isValid = await CapacitorSQLite.isJsonValid({ jsonstring });

    if (isValid.result) {
      // this.dbName = jsonExport.database;
      this.dbName = DB.database;
      await Storage.set({ key: DB_NAME_KEY, value: this.dbName });
      await CapacitorSQLite.importFromJson({ jsonstring });
      await Storage.set({ key: DB_SETUP_KEY, value: '1' });

      // Your potential logic to detect offline changes later
      if (!update) {
        await CapacitorSQLite.createSyncTable({ database: DB_NAME_COMPLETE_KEY });
      } else {
        await CapacitorSQLite.setSyncDate({ syncdate: '' + new Date().getTime() })
      }
      this.dbReady.next(true);
    }
    //});
  }

  getCategoriesList() {
    return this.dbReady.pipe(
      switchMap(isReady => {
        if (!isReady) {
          return of({ values: [] });
        } else {
          const statement = 'SELECT * FROM categories;';
          return from(CapacitorSQLite.query({ database: DB_NAME_KEY, statement, values: [] }));
        }
      })
    )
  }

  async getProductById(id) {
    const statement = `SELECT * FROM products LEFT JOIN vendors ON vendors.id=products.vendorid WHERE products.id=${id} ;`;
    return (await CapacitorSQLite.query({ statement, values: [] })).values[0];
  }

  getDatabaseExport(mode) {
    return CapacitorSQLite.exportToJson({ jsonexportmode: mode });
  }

  addDummyCategory(category: Category) {
    console.log('------> ENTER ADD DUMMYYY');
    const statement = `INSERT INTO heyadivinen-local-db.category (id, description, price, status, free, icon) VALUES ('${category.id}','${category.description}', '${category.price}', ${category.status}, ${category.free}, '${category.icon}');`;
    return CapacitorSQLite.execute({ database: DB_NAME_KEY, statements: statement });
  }

  deleteProduct(productId) {
    const statement = `DELETE FROM products WHERE id = ${productId};`;
    return CapacitorSQLite.execute({ statements: statement });
  }

  // For testing only..
  async deleteDatabase() {
    const dbName = await Storage.get({ key: DB_NAME_KEY });
    await Storage.set({ key: DB_SETUP_KEY, value: null });
    return CapacitorSQLite.deleteDatabase({ database: dbName.value });
  }
  
}