import { Pipe, PipeTransform } from '@angular/core';
import { Theme } from '../enums/theme.enum';

@Pipe({
    name: 'themeIcon'
})
export class ThemeIconPipe implements PipeTransform {

    transform(theme: Theme): string {
        switch (theme) {
            case Theme.LIGHT:
                return 'bi-sun-fill';
            case Theme.DARK:
                return 'bi-moon-stars-fill';
            default:
                return '';
        }
    }

}
