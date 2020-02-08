import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  private settings: any;
  private view: string;
  private label: string;

  title = 'svg-timer';

  ngOnInit() {
    this.settings = {
      labels: {
        settings: "Settings",
        about: "About"
      },
      infoColor: "green",
      warningColor: "orange",
      alertColor: "red",
      time: 10
    };
  }

  setView(view) {
    this.view = view;
    this.label = this.settings.labels[view];
  }

  unsetView() {
    this.view = null;
    this.label = null;
  }

  checkView(name) {
    return (this.view === name ? true : false);
  }

  setProperty(param,value) {
    this.settings[param] = value;
  }
}
