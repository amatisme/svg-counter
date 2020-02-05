import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-timer',
  templateUrl: './svg-timer.component.html',
  styleUrls: ['./svg-timer.component.css']
})
export class SvgTimerComponent implements OnInit {

  private readonly _fullDashArray: number;
  private readonly _warningThreshold: number;
  private readonly _alertThreshold: number;
  private readonly _timeLimit: number;

  private colorCodes: any;
  private timePassed: number;
  private timeLeft: number;
  private timerInterval: number;
  private remainingPathColor: string;
  private baseTimerLabel: string;

  constructor() {
    this._timeLimit = 20;
    this._alertThreshold = 5;
    this._warningThreshold = 10;
    this._fullDashArray = 283;
  }

  ngOnInit() {
    this.timePassed = 0;
    this.timeLeft = this._timeLimit;
    this.timerInterval = null;
    this.colorCodes = {
      info: {
        color: "green"
      },
      warning: {
        color: "orange",
        threshold: this._warningThreshold
      },
      alert: {
        color: "red",
        threshold: this._alertThreshold
      }
    };
    this.remainingPathColor = this.colorCodes.info.color;

    // update path color
    // document
    //   .getElementById("base-timer-path-remaining")
    //   .style.color(this.colorCodes.info.color);

    this.startTimer();
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      //update time
      this.timeLeft = this._timeLimit - this.timePassed++;

      //update view
      this.baseTimerLabel = this.formatTime(this.timeLeft);

      // update appearance of timer
      this.setCircleDasharray();
      this.setRemainingPathColor();

      if(this.timeLeft === 0) { this.onTimesUp(); }
    }, 1000);
  }

  onTimesUp() {
    clearInterval(this.timerInterval);
  }

  formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;

    //append a zero
    let second: string;
    if(seconds < 10) {
      second = minutes + ":" + "0" + seconds;
    } else {
      second = minutes + ":" + seconds;
    }

    return second;
  }

  setRemainingPathColor() {
    if (this.timeLeft <= this.colorCodes.alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(this.colorCodes.warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(this.colorCodes.alert.color);
    } else if (this.timeLeft <= this.colorCodes.warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(this.colorCodes.info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(this.colorCodes.warning.color);
    }
  }

  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this._timeLimit;
    return rawTimeFraction - (1 / this._timeLimit) * (1 - rawTimeFraction);
  }

  setCircleDasharray() {
    let circleDasharray =  (this.calculateTimeFraction() * this._fullDashArray).toFixed(0);

    //update DOM element
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }
}
