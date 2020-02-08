import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-timer',
  templateUrl: './svg-timer.component.html',
  styleUrls: ['./svg-timer.component.css']
})
export class SvgTimerComponent implements OnInit {

  private readonly _fullDashArray: number;

  private warningThreshold: number;
  private alertThreshold: number;
  private timeLimit: number;
  private timePassed: number;
  private timeLeft: number;
  private timerInterval: number;
  private timerStopped: boolean;
  private remainingPathColor: string;
  private baseTimerLabel: string;


  @Input() alertColor: string = "orange";
  @Input() warningColor: string = "red";
  @Input() infoColor: string = "green";
  @Input() time: string;

  constructor() {
    this._fullDashArray = 283;
  }

  ngOnInit() {
    // set the initial thresholds
    if(!this.time) this.timeLimit = 20;
    this.timerStopped = true;
    this.setThresholds();
    this.setTimer();
  }

  ngOnChanges(changes: any) {
    //change settings from parent
    if(changes.time) {
      this.timeLimit = changes.time.currentValue;
      this.setTimerLabel(changes.time.currentValue);
      this.setThresholds();
      this.resetTimer();
    }
    this.setRemainingPathColor();
  }

  setTimer() {
    this.timePassed = 0;
    this.timeLeft = this.timeLimit;
    this.timerInterval = null;
    this.timerStopped = true;

    //update view
    this.setTimerLabel(this.timeLeft);

    //add initial color attribute
    document.getElementById("remaining").classList.add(this.infoColor);

    // update appearance of timer
    this.setCircleDasharray();
  }

  setThresholds() {
    this.warningThreshold = this.timeLimit / 2;
    this.alertThreshold = this.timeLimit / 4;
  }

  onTimesUp() {
    clearInterval(this.timerInterval);
  }

  resetTimer() {
    this.onTimesUp();
    this.setTimer();
  }

  startTimer() {
    //stop timer if already started
    if(this.timerStopped) {
      // reset if needed
      this.timerStopped = null;

      this.timerInterval = setInterval(() => {
        //update time
        this.timeLeft = this.timeLimit - this.timePassed++;

        this.setTimerLabel(this.timeLeft);
        this.setCircleDasharray();
        this.setRemainingPathColor();

        //update the view
        if(this.timeLeft <= 0) {
          this.onTimesUp();
        }
      }, 1000);
    } else {
      this.stopTimer();
    }
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.timeLeft = this.timePassed;

    // update view
    this.setRemainingPathColor();
  }

  setTimerLabel(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
    let label: string;

    //append a zero
    let second: string;
    if(seconds < 10) {
      this.baseTimerLabel = "0" + minutes + ":" + "0" + seconds;
    } else {
      this.baseTimerLabel = "0" + minutes + ":" + seconds;
    }
  }

  setRemainingPathColor() {
    // get the element
    let elem = document.getElementById("remaining");

    // clear color when stopped
    if(this.timerStopped && this.timePassed > 0) {
      elem.style.color = 'cyan';
    } else {
      // remove all previous
      elem.classList = [];

      // add the appropriate class
      if(this.timeLeft <= this.alertThreshold) {
        if(this.alertColor) elem.style.color = this.alertColor;
      } else if (this.timeLeft <= this.warningThreshold) {
        if(this.warningColor) elem.style.color = this.warningColor;
      } else {
        if(this.infoColor) elem.style.color = this.infoColor;
      }
    }
  }

  calculateTimeFraction() {
    const rawTimeFraction = this.timeLeft / this.timeLimit;
    console.log(rawTimeFraction);
    return rawTimeFraction - (1 / this.timeLimit) * (1 - rawTimeFraction);
  }

  setCircleDasharray() {
    let circleDasharray: string = (this.calculateTimeFraction() * this._fullDashArray).toFixed(0) + " 283";
    document.getElementById("remaining").setAttribute("stroke-dasharray", circleDasharray);
  }
}
