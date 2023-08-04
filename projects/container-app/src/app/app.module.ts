import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DockModule } from 'primeng/dock';
import { DropdownModule } from 'primeng/dropdown';
import { TooltipModule } from 'primeng/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ManifestComponent } from './manifest/manifest.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ColorPipe } from './pipes/color.pipe';
import { ThemeIconPipe } from './pipes/theme-icon.pipe';
import { ThemeLocalStorageService, THEME_STORAGE_SERVICE } from './services/storage/theme-storage.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NotFoundComponent,
        ManifestComponent,
        ThemeIconPipe,
        ColorPipe,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,

        DockModule,
        DropdownModule,
        TooltipModule,
    ],
    providers: [
        {
            provide: THEME_STORAGE_SERVICE,
            useClass: ThemeLocalStorageService,
        },
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
