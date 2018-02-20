import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { MessageService } from './shared/services/message.service';
import { UserComponent } from './user/components/user.component';
import { UserService } from './user/services/user.service';
import { UsersComponent } from './user/components/users.component';
import { ModalComponent } from './shared/components/modal.component';
import { ScopeComponent } from './scope/components/scope.component';
import { ScopesComponent } from './scope/components/scopes.component';
import { GroupComponent } from './group/components/group.component';
import { GroupsComponent } from './group/components/groups.component';
import { ScopeService } from './scope/services/scope.service';
import { GroupService } from './group/services/group.service';
import { LoaderComponent } from './shared/components/loader.component';

@NgModule({
    declarations: [
        AppComponent,
        UserComponent,
        UsersComponent,
        ScopeComponent,
        ScopesComponent,
        GroupComponent,
        GroupsComponent,
        ModalComponent,
        LoaderComponent
    ],
    imports: [
        BrowserModule, 
        HttpModule, 
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule
    ],
    providers: [
        MessageService,
        UserService,
        ScopeService,
        GroupService
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule { }
