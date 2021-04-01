import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { StorageUser } from "src/app/shared/models/storage";
import { User } from "src/app/shared/models/user";

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    userEvent = new EventEmitter<User>();

    constructor() { }

    getDataUser() {
        return this.userEvent;
    }
}