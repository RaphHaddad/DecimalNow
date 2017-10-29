import { Component, OnInit, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

    public decimalNow: string;
    public inputOutputDecimalTime: string;
    public inputOutputTime: string;
    public errors: string[];
    private inputChanged: string;
    private inputChangedDecimal = "decimalTime";
    private inputChangedTime = "time";

    constructor( @Inject(PLATFORM_ID) private platformId: Object) {  }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            setInterval(() => {
                this.setDecimalTimeNow();
            }, 0);
        }
    }

    public convert() {
        this.errors = [];
        if (this.inputChanged === this.inputChangedTime) {
            this.convertInputToDecimalTime();
        } else if (this.inputChanged === this.inputChangedDecimal) {
            this.convertInputToTime();
        } else {
            this.errors.push("you must change one of the inputs");
        }
    }

    public formatDecimalTime(decimalTime: number) {
        if (!decimalTime) {
            return "";
        }
        var decimalTimeAsString = decimalTime.toString();
        return decimalTimeAsString.slice(0, 1) + '.' +
            decimalTimeAsString.slice(2, 4) + '.' +
            decimalTimeAsString.slice(4, 6);
    }

    public setDecimalTime(hours: number, minutes: number, seconds: number) {
        this.decimalNow = this.getDecimalTime(hours, minutes, seconds).toString();
    }

    public decimalTimeInputChanged() {
        this.inputChanged = this.inputChangedDecimal;
    }

    public timeInputChanged() {
        this.inputChanged = this.inputChangedTime;
    }

    private convertInputToDecimalTime() {
        if (this.inputOutputTime) {
            var timeArr = this.inputOutputTime.split(':');
            var hours = timeArr[0];
            var minutes = timeArr[1];
            this.inputOutputDecimalTime =
                this.formatDecimalTime(this.getDecimalTime(parseInt(hours), parseInt(minutes), 0));
        } else {
            this.errors.push("Please input valid time");
        }
    }

    private getDecimalTime(hours: number, minutes: number, seconds: number) {
        var dhours = hours * 5 / 12;
        var dminutes = minutes * 1000 / 144 / 1000;
        var dseconds = seconds * 1000 / 864 / 10000;
        return dhours + dminutes + dseconds;
    }

    private getTime(dhours: number, dminutes: number, dseconds: number) {
        var hours = (dhours * 8640);
        var minutes = dminutes * (864/10);
        var seconds = (dseconds * 60) / 100;
        return new Date(2000, 1, 1, 0, 0, seconds + hours + minutes).toLocaleTimeString();
    }

    private setDecimalTimeNow() {
        var now = new Date();
        this.setDecimalTime(now.getHours(), now.getMinutes(), now.getSeconds());
    }

    private convertInputToTime() {
        try {
            var splitedDecimalTime = this.inputOutputDecimalTime.split('.');
            var dhours = parseInt(splitedDecimalTime[0]);
            var dminutesStr = splitedDecimalTime[1];
            var dminutes = parseInt(dminutesStr);
            var dsecondsStr = splitedDecimalTime[2];
            var dseconds = parseInt(dsecondsStr);
            if (dminutesStr.length !== 2) {
                this.errors.push("Decimal minutes should be two digits. Example: '00', '05' or '20'");
            } else if (dminutes < 0 || dminutes >= 100) {
                this.errors.push("Decimal minutes should be between 0 and 99 inclussive");
            }

            if (dsecondsStr && (dsecondsStr.length !== 2)) {
                this.errors.push("Decimal seconds should be two digits. Example: '00', '05' or '20'");
            } else if (dsecondsStr && (dseconds < 0 || dseconds >= 100)) {
                this.errors.push("Decimal seconds should be between 0 and 99 inclussive");
            }
            else if (!dsecondsStr) {
                dseconds = 0;
            }
            if (dhours < 0 || dhours > 10) {
                this.errors.push("Decimal hours should be between 0 and 10 inclussive");
            }
            if (this.errors.length <= 0) {
                this.inputOutputTime = this.getTime(dhours, dminutes, dseconds);
            } 
        } catch (error) {
            this.errors.push(
                "You must enter decimal time in a proper format. See example above (decimal seconds are optional");
        }
    }
}
