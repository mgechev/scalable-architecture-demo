import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'sd-app',
  moduleId: module.id,
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(private _router: Router) {}

  navigateTo(page: string) {
    this._router.navigate([page]);
  }
}
