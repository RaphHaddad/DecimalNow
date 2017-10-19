import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    public decimalNow = 0.0;

    constructor() {
        setTimeout(() => {
            var now = new Date();
            this.decimalNow = this.toDecimalTime(now.getHours(), now.getMinutes(), now.getSeconds());
        }, 500);
    }

    private toDecimalTime(hours: number, minutes: number,seconds: number)
    {
        var dhours = hours * 5 / 12;
        var dminutes = minutes * 1000 / 144 / 1000;
        var dsecond = seconds * 1000 / 864 / 100000;
        return dhours + dminutes + dsecond;
    }
}
