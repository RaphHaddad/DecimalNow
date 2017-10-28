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
    public error: string;
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
        this.error = "";
        if (this.inputChanged === this.inputChangedTime) {
            this.convertInputToDecimalTime();
        } else if (this.inputChanged === this.inputChangedDecimal) {
            this.convertInputToTime();
        } else {
            throw "couldn't detect which input was changed";
        }
    }

    public formatDecimalTime(decimalTime: number) {
        if (!decimalTime) {
            return "";
        }
        var decimalTimeAsString = decimalTime.toString();
        return decimalTimeAsString.slice(0, 1) + '.' +
            decimalTimeAsString.slice(2, 4) + '.' +
            decimalTimeAsString.slice(4, 6)
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
            this.error = "Please input valid time";
        }
    }

    private getDecimalTime(hours: number, minutes: number, seconds: number) {
        var dhours = hours * 5 / 12;
        var dminutes = minutes * 1000 / 144 / 1000;
        var dseconds = seconds * 1000 / 864 / 10000;
        return dhours + dminutes + dseconds;
    }

    private getTime(dhours: number, dminutes: number, dseconds: number) {
        var hours = dhours / (5 / 12);
        var minutes = dminutes / (100000 / 144 / 1000);
        var seconds = dseconds / (1000 / 864);
        return new Date(2000, 1, 1, hours, minutes, seconds).toLocaleTimeString();
    }

    private setDecimalTimeNow() {
        var now = new Date();
        this.setDecimalTime(now.getHours(), now.getMinutes(), now.getSeconds());
    }

    private convertInputToTime() {
        var splitedDecimalTime = this.inputOutputDecimalTime.split('.');
        var dhours = parseInt(splitedDecimalTime[0]);
        var dminutes = parseInt(splitedDecimalTime[1]);
        var dseconds = parseInt(splitedDecimalTime[2]);

        this.inputOutputTime = this.getTime(dhours, dminutes, dseconds);
    }
}
