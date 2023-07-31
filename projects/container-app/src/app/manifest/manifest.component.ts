import { getManifest } from '@angular-architects/module-federation';
import { Component } from '@angular/core';
import { CustomManifest } from '../utils/module-federation-config';

@Component({
  selector: 'app-manifest',
  templateUrl: './manifest.component.html',
  styleUrls: ['./manifest.component.scss']
})
export class ManifestComponent {

    manifest = getManifest<CustomManifest>();
}
