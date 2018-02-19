import { Injectable, Injector } from '@angular/core';
import { RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { BaseService } from '../../shared/services/base.service';


@Injectable()
export class UserService extends BaseService<any> {

    constructor (injector: Injector) {
        super(injector);
        console.log("constructor");
    }

    public getUser(id: number): Promise<any> {
        console.log("getUser");

        //return this.get(this.API_URL + "");
        return this.get("http://localhost:3000/api/users/" + id);
    }

    public getUsers(): Promise<Array<any>> {
        console.log("getUsers");

        return this.getMany("http://localhost:3000/api/users/");
    }

    public getUserGroups(id: number): Promise<Array<any>> {
        console.log("getUserGroups");

        return this.getMany("http://localhost:3000/api/users/" + id + "/groups");
    }

    public getUserScopes(id: number): Promise<Array<any>> {
        console.log("getUserScopes");

        return this.getMany("http://localhost:3000/api/users/" + id + "/scopes");
    }

    public removeGroup(id: number): Promise<any> {
        console.log("removeGroup");

        return this.put("http://localhost:3000/api/users/groups/" + id);
    }

    public removeScopes(id: number): Promise<any> {
        console.log("removeScopes");

        return this.put("http://localhost:3000/api/users/scopes/" + id);
    }
}