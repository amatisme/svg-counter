import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-pv-textfield',
  templateUrl: './pv-textfield.component.html',
  styleUrls: ['./pv-textfield.component.css']
})
export class PvTextfieldComponent implements OnInit {

  private maxlength: number;
  private placeholder: string;
  private pattern: RegExp;

  @Input() value: string;
  @Input() label: string;
  @Input() validate: string;
  @Input() required: boolean = true;
  @Input() maxlength: number;

  @Output() valueChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
    if(this.value) this.object = this.value;
    switch(this.validate) {
      case 'email':
        this.maxlength = 55;
        this.pattern = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        this.placeholder = "example@domain.com";
        break;
      case 'phone':
        this.maxlength = 10;
        this.pattern = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        this.placeholder = "10 digits 1234567890";
        break;
      case 'integer':
          this.pattern = /^\d+$/;
          this.placeholder = "eg. 123";
          break;
      case 'currency':
          this.pattern = /^\$?(([1-9]\d{0,2}(,\d{3})*)|0)?\.\d{1,2}$/;
          this.placeholder = "eg. 100,000.00";
          break;
      default:
        this.pattern = null;
      break;
    }
  }

  valueChanged(value) {
    if(this.pattern) { // validate rgex pattern before sending
      try {
        if(this.pattern.test(value)) {
          this.valueChange.emit(value);
        }
      } catch(err) {
        console.log(err);
      }
    } else {
      this.valueChange.emit(value);
    }
  }

}
