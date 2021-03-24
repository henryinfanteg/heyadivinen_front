import { Injectable } from "@angular/core";
import { User } from "src/app/shared/models/user";

@Injectable({
    providedIn: 'root'
  })
export class StorageService {

    public user = new User();

    constructor() { }

    setDataUser(data: User) {
        this.user.uid = data.uid;
        this.user.country = data.country;
        this.user.birthDate = data.birthDate;
        this.user.username = data.username;
        this.user.status = data.status;
        this.user.modifyDate = data.modifyDate;
    }

    getDataUser() {
        if(this.user.uid !== null) {
            return this.user;
        } else {
            return null
        }
    }

    

}