import { SizeService } from './size.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gameOfLife';
  alive: boolean;

  constructor(private sizeService: SizeService) {
    setInterval(() => {
      this.alive = this.sizeService.alive;
      if(this.sizeService.alive == false)
      this.sizeService.alive = true;
      }, 500);
  }


}
