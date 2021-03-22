import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class FirestoreService {

  constructor(public database: AngularFirestore) { }

  createGeneric(data: any, path : string, id: string) {
      const collection = this.database.collection(path);
      return collection.doc(id).set(data);
  }

  getGeneric(path: string, id: string) {
      const collection = this.database.collection(path);
      return collection.doc(id).valueChanges();

  }

  updateGeneric(data: any, path: string, id: string) {
      const collection = this.database.collection(path);
      return collection.doc(id).update(data);
  }

  deleteGeneric(path: string, id: string) {
      const collection = this.database.collection(path);
      return collection.doc(id).delete();
  }

  getCollection(path: string) {
      const collection = this.database.collection(path);
      return collection.valueChanges();
  }


}
