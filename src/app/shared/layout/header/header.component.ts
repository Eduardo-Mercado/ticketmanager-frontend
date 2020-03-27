import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  hora: number;
  min: number;
  sec = 0;
  stopTimer = false;
  interval: any;

  constructor() { }

  ngOnInit() {
   this.hora = this.min = this.sec = 0;
  }

  play() {
    if ( !this.stopTimer) {

      this.interval = setInterval(() => {
        if ( this.sec < 60) {
          this.sec++;
        } else {
          this.sec = 0;
          if ( this.min < 60 ) {
            this.min ++;
          } else {
            this.min = 0;
            if ( this.hora < 24 ) {
              this.hora ++;
            } else {
              this.hora = 0;
            }
          }
        }
      }, 1000);

    }
  }

  public pause() {
    clearInterval(this.interval);
  }

  public stop() {
    this.stopTimer = true;
    clearInterval(this.interval);
  }
}
