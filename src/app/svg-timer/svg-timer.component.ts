import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-timer',
  templateUrl: './svg-timer.component.html',
  styleUrls: ['./svg-timer.component.css']
})
export class SvgTimerComponent implements OnInit {

  private readonly _fullDashArray: number;

  private _warningThreshold: number;
  private _alertThreshold: number;
  private _timeLimit: number;

  private colorCodes: any;
  private timePassed: number;
  private timeLeft: number;
  private timerInterval: number;
  private remainingPathColor: string;
  private baseTimerLabel: string;
  private active: boolean = false;

  @Input() settings: any;
  @Input() alertColor: string = "orange";
  @Input() warningColor: string = "red";
  @Input() infoColor: string = "green";
  @Input() time: string;

  constructor() {
    this._fullDashArray = 283;
  }

  ngOnInit() {
    // set the initial thresholds
    if(!this.time) this._timeLimit = 20;
    this.setThresholds();


    // set the default color codes
    this.colorCodes = {
      info: {
        color: "green"
      },
      warning: {
        color: "orange",
        threshold: 10
      },
      alert: {
        color: "red",
        threshold: 5
      }
    };


    // set path element
    this.elem = document.getElementById("remaining");
    this.setTimer();
  }

  ngOnChanges(changes: any) {
    //change settings from parent
    if(changes.time) {
      this._timeLimit = changes.time.currentValue;
      this.baseTimerLabel = this.formatTime(changes.time.currentValue);
      this.setThresholds();
      this.resetTimer();
    }
    this.setRemainingPathColor();
  }

  setTimer() {
    this.timePassed = 0;
    this.timeLeft = this._timeLimit;
    this.timerInterval = null;
    this.active = false;

    //update view
    this.baseTimerLabel = this.formatTime(this.timeLeft);

    //add initial color attribute
    this.elem = document.getElementById("remaining");
    this.elem.classList.add(this.infoColor);

    // update appearance of timer
    this.setCircleDasharray();
  }

  setThresholds() {
    this._warningThreshold = this._timeLimit / 2;
    this._alertThreshold = this._timeLimit / 4;
  }

  onTimesUp() {
    clearInterval(this.timerInterval);
  }

  resetTimer() {
    clearTimeout(this.timePassed);
    this.setTimer();
  }

  startTimer() {
    // reset if needed
    this.active = true;

    if(this.timeLeft === 0) this.resetTimer();

    this.timerInterval = setInterval(() => {
      //update time
      this.timeLeft = this._timeLimit - this.timePassed++;

      //update view
      this.baseTimerLabel = this.formatTime(this.timeLeft);

      // update appearance of timer
      this.setCircleDasharray();
      this.setRemainingPathColor();

      if(this.timeLeft === 0) {
        this.onTimesUp();
      }
    }, 1000);
  }

  stopTimer() {
    clearTimeout(this.timerInterval);
    this.timeLeft = this.timePassed;
    this.active = false;

    //add initial color attribute
    this.elem.classList = [];
  }

  formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let label: string;

    //append a zero
    let second: string;
    if(seconds < 10) {
      return "0" + minutes + ":" + "0" + seconds;
    } else {
      return "0" + minutes + ":" + seconds;
    }
  }

  setRemainingPathColor() {
    // start with clean set of style classes
    this.elem.classList = [];
    // add the appropriate class
    if(this.timeLeft <= this._alertThreshold) {
      if(this.alertColor) this.elem.style.color = this.alertColor;
    } else if (this.timeLeft <= this._warningThreshold) {
      if(this.warningColor) this.elem.style.color = this.warningColor;
    } else {
      if(this.infoColor) this.elem.style.color = this.infoColor;
    }
  }

  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this._timeLimit;
    return rawTimeFraction - (1 / this._timeLimit) * (1 - rawTimeFraction);
  }

  setCircleDasharray() {
    let circleDasharray: string = (this.calculateTimeFraction() * this._fullDashArray).toFixed(0) + " 283";
    this.elem.setAttribute("stroke-dasharray", circleDasharray);
  }
}
