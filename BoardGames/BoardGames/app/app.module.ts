import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { GameService } from './game/game.service';

import { HeaderPipe } from './shared/header.pipe';

@NgModule({
    imports: [
        BrowserModule,
        HttpModule
    ],
    providers: [
        GameService
    ],
    declarations: [
        AppComponent,
        GameComponent,
        HeaderPipe
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
