import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
 
@Injectable()
export class MessageService {

    public messageDictionary = {};

    private subject = new Subject<any>();
 
    public sendMessage(message: string) {
        console.log("sendMessage");
        this.addMessageToDictionary(message);
        this.subject.next({ text: message });
    }
 
    public clearMessage() {
        console.log("clearMessage");

        this.subject.next();
    }
 
    public getMessage(): Observable<any> {
        console.log("getMessage");

        return this.subject.asObservable();
    }

    public addMessageToDictionary(message: string): void {
        console.log("addMessageToDictionary");

        this.messageDictionary[message] =  true;
    }

}