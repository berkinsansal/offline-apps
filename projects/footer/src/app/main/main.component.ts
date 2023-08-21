import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DockModule } from 'primeng/dock';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, DockModule],
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

    @Input() menuItems: MenuItem[] = [];
    // @Input() colorPipe!: PipeTransform;
    // @Input() colorPipe = 'color';
    // @Input() selectedTheme!: any;

}
