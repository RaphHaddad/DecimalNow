import { Component, OnInit, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

    public decimalNow = 0.0;
    public calculatedDecimalTime = 0.0;
    public inputTime: string;
    public error: string;

    constructor( @Inject(PLATFORM_ID) private platformId: Object) {  }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            var now = new Date();
            this.setDecimalTime(now.getHours(), now.getMinutes(), now.getSeconds());
            setInterval(() => {
                var now = new Date();
                this.setDecimalTime(now.getHours(), now.getMinutes(), now.getSeconds());
            }, 1);
        }
    }

    public convertInputTime() {
        this.error = "";
        if (this.inputTime) {
            var timeArr = this.inputTime.split(':');
            var hours = timeArr[0];
            var minutes = timeArr[1];
            this.calculatedDecimalTime = this.getDecimalTime(parseInt(hours), parseInt(minutes), 0);
        } else {
            this.error = "Please input valid time";
        }
    }

    public formatDecimalTime(decimalTime: number) {
        if (decimalTime === 0) {
            return "";
        }
        var decimalTimeAsString = decimalTime.toString();
        return decimalTimeAsString.slice(0, 1) + '.' +
               decimalTimeAsString.slice(2, 4) + '.' + 
               decimalTimeAsString.slice(4, 6);
    }

    public setDecimalTime(hours: number, minutes: number, seconds: number) {
        this.decimalNow = this.getDecimalTime(hours, minutes, seconds);
    }

    private getDecimalTime(hours: number, minutes: number, seconds: number) {
        var dhours = hours * 5 / 12;
        var dminutes = minutes * 1000 / 144 / 1000;
        var dsecond = seconds * 1000 / 864 / 10000;
        return dhours + dminutes + dsecond;
    }
}
