/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { assert } from 'chai';
import { HomeComponent } from './home.component';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
let fixture: ComponentFixture<HomeComponent>;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

describe('Home component', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({ imports: [FormsModule], declarations: [HomeComponent] });
        fixture = TestBed.createComponent(HomeComponent);
        fixture.detectChanges();
    });

    it('24 hours should return 1 decimal day (10 decimal hours)', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = new Date(1980, 6, 6, 24, 0, 0).toString();

        fixture.componentInstance.setDecimalTime(24, 0, 0);

        expect(fixture.componentInstance.decimalNow).toEqual("10");
    }));

    it('12 hours should return 0.5 decimal day (5 decimal hours)', async(() => {
        fixture.componentInstance.setDecimalTime(12, 0, 0);

        expect(fixture.componentInstance.decimalNow).toEqual("5");
    }));

    it('1440 minutes should return 1 decimal day (10 decimal hours)', async(() => {
        fixture.componentInstance.setDecimalTime(0, 1440, 0);

        expect(fixture.componentInstance.decimalNow).toEqual("10");
    }));

    it('720 minutes should return 5 decimal hours', async(() => {
        fixture.componentInstance.setDecimalTime(0, 720, 0);

        expect(fixture.componentInstance.decimalNow).toEqual("5");
    }));

    it('86400 seconds should return 10 decimal hours', async(() => {
        fixture.componentInstance.setDecimalTime(0, 0, 86400);

        expect(fixture.componentInstance.decimalNow).toEqual("10");
    }));

    it('43200 seconds should return 5 decimal hours', async(() => {
        fixture.componentInstance.setDecimalTime(0, 0, 43200);

        expect(fixture.componentInstance.decimalNow).toEqual("5");
    }));

    it('should format nicely', async(() => {
        var time = 9.346512;
        var expected = '9.34.65';

        expect(fixture.componentInstance.formatDecimalTime(time)).toEqual(expected);
    }));

    it('should use 10s in seconds', async(() => {
        var time = 9.340654;
        var expected = '9.34.06';

        expect(fixture.componentInstance.formatDecimalTime(time)).toEqual(expected);
    }));

    it('should convert inputed time AM', async(() => {
        fixture.componentInstance.inputOutputTime = '9:30';
        fixture.componentInstance.timeInputChanged();
        fixture.componentInstance.convert();

        expect(fixture.componentInstance.inputOutputDecimalTime).toEqual("3.95.83");
    }));

    it('should convert inputed time PM', async(() => {
        fixture.componentInstance.inputOutputTime = '17:30';
        fixture.componentInstance.timeInputChanged();
        fixture.componentInstance.convert();

        expect(fixture.componentInstance.inputOutputDecimalTime).toEqual("7.29.16");
    }));

    it('should convert inputed time with nice format', async(() => {
        fixture.componentInstance.inputOutputTime = '03:02';
        fixture.componentInstance.timeInputChanged();
        fixture.componentInstance.convert();

        expect(fixture.componentInstance.inputOutputDecimalTime).toEqual("1.26.38");
    }));

    it('should convert decimal time to time', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = '1.0.0';
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        expect(fixture.componentInstance.inputOutputTime).toEqual("24");
    }));

    it('should validate decimal time format when convert', async(() => {
        expect(true).toBeFalsy();
    }));
});
