import { Component, OnInit } from '@angular/core';
import { VersionService } from 'src/app/shared/services/version.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  buildDate = '';

  constructor(private versionService: VersionService) {}

  ngOnInit() {
    this.buildDate = this.versionService.getBuildVersion();
  }
}
