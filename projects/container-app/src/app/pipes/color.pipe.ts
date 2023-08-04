import { Pipe, PipeTransform } from '@angular/core';
import { Theme } from '../enums/theme.enum';
import { ThemeService } from '../services/theme.service';

@Pipe({
    name: 'color'
})
export class ColorPipe implements PipeTransform {

    // colorSchema = [
    //     '#ff1d58', // Yass Queen
    //     '#f75990', // Sister Sister
    //     '#fff685', // Crown Yellow
    //     '#00DDFF', // Blue Light
    //     '#0049B7', // Brutal Blue
    // ];
    // oldcolorSchemaDark = [
    //     '#71C161', // Mantis
    //     '#24441C', // Cal Poly Green
    //     '#233D6C', // Yale Blue
    //     '#375369', // Charcoal
    //     '#323B73', // Delft Blue
    // ];

    colorSchemaDark = [
        '#714969', // Eggplant
        '#50456A', // English Violet
        '#323B72', // Delft Blue
        '#1F3B69', // Yale Blue
        '#313BCD', // Palatinate Blue
        '#5772C9', // Royal Blue
        '#64AB5B', // Asparagus
        '#3F6F34', // Fern Green
        '#12320B', // Pakistan Green
        '#366462', // Caribbean Current
    ];

    colorSchemaLight = [
        '#4769FF', // Neon Blue
        '#627BFE', // Crayola Blue
        '#708AFF', // Cornflower Blue
        '#8BB927', // Apple Green
        '#73A223', // Apple Green
        '#6F960D', // Avocado
        '#069D3D', // Pigmnet Green
        '#BB80CB', // African Violet
        '#D5729B', // Thulian Pink
        '#FD6356', // Bittersweet
    ];

    transform(index: string | number, theme: Theme): string {
        index = +index;
        
        return theme === Theme.DARK ? this.colorSchemaDark[index % this.colorSchemaLight.length] : this.colorSchemaLight[index % this.colorSchemaLight.length];
    }

}
