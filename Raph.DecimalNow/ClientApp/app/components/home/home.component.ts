import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})
export class HomeComponent {
    public decimalNow = 0.0;

    calcDecimalNow() {
        Observable.interval(100).subscribe(() => {
            var now = new Date();
            this.decimalNow = this.toDecimalTime(now.getHours(), now.getMinutes(), now.getSeconds());
        });
    }

    private toDecimalTime(hours: number, minutes: number,seconds: number) {
        var dhours = hours * 5 / 12;
        var dminutes = minutes * 1000 / 144 / 1000;
        var dsecond = seconds * 1000 / 864 / 100000;
        return dhours + dminutes + dsecond;
    }
}
