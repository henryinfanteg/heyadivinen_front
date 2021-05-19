import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { StorageUser } from "src/app/shared/models/storage";
import { User } from "src/app/shared/models/user";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    userEvent = new EventEmitter<User>();
    categories = [];
    user = new User();

    constructor() { }

    getUser(){
        return this.user;
    }

    setUser(usr: User) {
        this.user = usr;
        return this.user;
    }

    getDataUser() {
        console.log('emitterrrr: ', this.userEvent);
        return this.userEvent;
    }

    setCategories(cat) {
        this.categories = cat
    }

    getCategories() {
        return this.categories;
    }
}