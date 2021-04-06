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

    constructor() { }

    getDataUser() {
        return this.userEvent;
    }

    setCategories(cat) {
        this.categories = cat
    }

    getCategories() {
        return this.categories;
    }
}