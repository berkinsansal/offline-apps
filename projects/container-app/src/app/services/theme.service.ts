import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from '../enums/theme.enum';
import { ThemeStorage, THEME_STORAGE_SERVICE } from './storage/theme-storage.service';

@Injectable({
    providedIn: 'root'
})
export class ThemeService {

    /**
     * contains the current active theme
     * avoid mutating it directly, instead use `updateCurrentTheme`
     */
    private currentTheme: Theme = Theme.INITIAL;

    /**
     * BehaviorSubject that detects the theme changes
     */
    private themeChangedSubject = new BehaviorSubject(this.currentTheme);

    /**
     * Observable that emits the current theme when theme changes.
     * Exposed publicly so that other components can use this feature
     */
    themeChanged$: Observable<Theme>;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        @Inject(THEME_STORAGE_SERVICE) private themeStorage: ThemeStorage
    ) {
        this.themeChanged$ = this.themeChangedSubject.asObservable();
        this.init();
    }

    /**
     * Init function that update the application based on the initial theme value
     * Flow as below
     * 1 - If there is a saved theme in the browser - use this as the initial value
     * 2 - If there is no saved theme, Check for the preferred device theme
     * 3 - If device theme is dark, set the init value to `dark` 
     * 4 - Else set the default value to `light`
     */
    private init() {
        const deviceTheme = window.matchMedia("(prefers-color-scheme: dark)");
        let initTheme = this.themeStorage.get();
        if (!initTheme) {
            deviceTheme.matches ? (initTheme = Theme.DARK) : (initTheme = Theme.LIGHT);
        }
        
        const link = this.document.createElement('link');
        link.id = 'app-theme';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = initTheme + '-theme.css';
        document.head.appendChild(link);

        this.updateCurrentTheme(initTheme);
        this.document.body.classList.add(this.currentTheme);
    }

    /**
     * Function to mutate the currentTheme
     * @param theme Theme
     */
    private updateCurrentTheme(theme: Theme) {
        this.currentTheme = theme;
        this.themeChangedSubject.next(this.currentTheme);
        this.themeStorage.save(this.currentTheme);
    }

    /**
     * Function that switches the theme
     * Exposed publicly
     */
    switchTheme(theme: Theme) {
        this.document.body.classList.toggle(Theme.LIGHT);
        this.document.body.classList.toggle(Theme.DARK);

        let themeLink = this.document.getElementById('app-theme') as HTMLLinkElement;
        if (themeLink) {
            themeLink.href = theme + '-theme.css';
        }
        
        this.updateCurrentTheme(theme);
    }
}
