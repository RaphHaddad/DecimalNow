import { Component } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    public decimalNow = 0.0;

    constructor() {
        setInterval(() => {
            var now = new Date();
            this.decimalNow = this.toDecimalTime(now.getHours(), now.getMinutes(), now.getSeconds());
        }, 500);
    }

    private toDecimalTime(hours: number, minutes: number,seconds: number)
    {
        const dhours = hours * 5 / 12;
        const dminutes = minutes * 1000 / 144 / 1000;
        const dsecond = seconds * 1000 / 864 / 100000;
        return dhours + dminutes + dsecond;
    }
}
