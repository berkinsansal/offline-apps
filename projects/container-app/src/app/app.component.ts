import { getManifest } from '@angular-architects/module-federation';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, SelectItem, TooltipOptions } from 'primeng/api';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { Theme } from './enums/theme.enum';
import { ThemeService } from './services/theme.service';
import { CustomManifest, CustomRemoteConfig, setRoutePaths } from './utils/module-federation-config';
import { buildRoutes } from './utils/routes';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    title = 'container-app';
    themeOptions: SelectItem<Theme>[] = [
        { value: Theme.LIGHT },
        { value: Theme.DARK },
    ];
    selectedTheme = Theme.INITIAL;

    remotes: CustomRemoteConfig[] = [];
    menuItems: MenuItem[] = [];

    constructor(
        private router: Router,
        private themeService: ThemeService) {
            
        this.themeService.themeChanged$.subscribe(theme => {
            this.selectedTheme = theme;
        });
    }

    async ngOnInit(): Promise<void> {
        const manifest = getManifest<CustomManifest>();
        setRoutePaths(manifest);

        // Hint: Move this to an APP_INITIALIZER to avoid issues with deep linking
        const routes = buildRoutes(manifest);
        this.router.resetConfig(routes);

        const tooltipProps: TooltipOptions = {
            tooltipPosition: 'top',
            positionTop: -15,
            positionLeft: 15,
            showDelay: 100
        }

        this.menuItems.push({
            id: '0',
            label: 'Home',
            routerLink: 'home',
            icon: 'bi-house',
            // styleClass: this.colorSchemaLight[0],
            tooltipOptions: {
                tooltipLabel: 'Home',
                ...tooltipProps,
            },
        });

        this.remotes = Object.values(manifest);
        this.remotes.forEach(remote => {
            this.menuItems.push({
                id: this.menuItems.length.toString(),
                label: remote.displayName,
                routerLink: remote.routePath,
                icon: remote.displayIcon,
                // styleClass: this.colorSchemaLight[this.menuItems.length % this.colorSchemaLight.length],
                tooltipOptions: {
                    tooltipLabel: remote.displayName,
                    ...tooltipProps,
                },
            });
        });

        this.menuItems.push({
            id: this.menuItems.length.toString(),
            label: 'Manifest',
            routerLink: 'manifest',
            icon: 'bi-filetype-json',
            // styleClass: this.colorSchemaLight[this.menuItems.length % this.colorSchemaLight.length],
            tooltipOptions: {
                tooltipLabel: 'Manifest',
                ...tooltipProps,
            },
        });
    }

    changeTheme(event: DropdownChangeEvent) {
        this.themeService.switchTheme(event.value);
    }

}
