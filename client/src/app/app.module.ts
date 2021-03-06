import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {RouterModule, Routes} from "@angular/router";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {LoginFormComponent} from "./authorization/login-form.component";
import {RegisterFormComponent} from "./authorization/register-form.component";
import {MainPageComponent} from "./main-page/main-page.component";
import {ForumComponent} from "./forum/forum.component";
import {ContactComponent} from "./contact/contact.component";
import {ContactDetailsComponent} from "./contact/contact-details.component";
import {SearchComponent} from "./search/search.component";
import {NewForumComponent} from "./forum/new-forum.component";
import {AdminPanelComponent} from "./admin-panel/admin-panel.component";

const appRoutes: Routes = [
    {path: 'login', component: LoginFormComponent},
    {path: 'register', component: RegisterFormComponent},
    {
        path: 'main-page', component: MainPageComponent,
        children: [
            {path: '', component: ForumComponent},
            {path: 'forum/:id', component: ForumComponent},
            {path: 'direct-message/:username/:id', component: ContactComponent},
            {path: 'contact-details/:username', component: ContactDetailsComponent},
            {path: 'search/:value', component: SearchComponent},
            {path: 'new-forum', component: NewForumComponent},
        ]
    },
    {path: 'admin-panel', component: AdminPanelComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
    imports: [BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes)],
    declarations: [AppComponent, LoginFormComponent, RegisterFormComponent, MainPageComponent, ForumComponent, NewForumComponent,
        ContactComponent, ContactDetailsComponent, SearchComponent, ForumComponent,
        AdminPanelComponent
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
