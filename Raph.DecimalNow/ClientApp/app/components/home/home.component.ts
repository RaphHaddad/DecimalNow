import { Component, OnInit, Inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

    public decimalNow = 0.0;

    constructor( @Inject(PLATFORM_ID) private platformId: Object) {  }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformId)) {
            setInterval(() => {
                var now = new Date();
                this.toDecimalTime(now.getHours(), now.getMinutes(), now.getSeconds());
            }, 500);
        }
    }

    public toDecimalTime(hours: number, minutes: number, seconds: number) {
        var dhours = hours * 5 / 12;
        var dminutes = minutes * 1000 / 144 / 1000;
        var dsecond = seconds * 1000 / 864 / 10000;
        this.decimalNow = dhours + dminutes + dsecond;
    }
}
