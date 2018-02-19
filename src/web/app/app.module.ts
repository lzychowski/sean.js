import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MessageService } from './shared/services/message.service';
import { UserComponent } from './user/components/user.component';
import { UserService } from './user/services/user.service';
import { UsersComponent } from './user/components/users.component';
import { ModalComponent } from './shared/components/modal.component';

@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
        UsersComponent,
        ModalComponent
    ],
    imports: [
        BrowserModule, 
        HttpModule, 
        AppRoutingModule,
        BrowserAnimationsModule
    ],
    providers: [
        MessageService,
        UserService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
