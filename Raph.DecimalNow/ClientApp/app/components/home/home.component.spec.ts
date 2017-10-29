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
        fixture.componentInstance.inputOutputDecimalTime = "10.00.00";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var expected = new Date(2000, 1, 1, 24, 0, 0);
        expect(fixture.componentInstance.inputOutputTime).toEqual(expected.toLocaleTimeString());
    }));

    it('should convert decimal time to time for half day', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "5.00.00";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var expected = new Date(2000, 1, 1, 12, 0, 0);
        expect(fixture.componentInstance.inputOutputTime).toEqual(expected.toLocaleTimeString());
    }));

    it('should convert decimal time to time for fifth of a day', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "2.00.00";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var expected = new Date(2000, 0, 0, 4, 48, 0);
        expect(fixture.componentInstance.inputOutputTime).toEqual(expected.toLocaleTimeString());
    }));

    it('should convert decimal time to time for fourth of a minute', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "0.00.25";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var expected = new Date(2000, 1, 1, 0, 0, 15);
        expect(fixture.componentInstance.inputOutputTime).toEqual(expected.toLocaleTimeString());
    }));

    it('should convert decimal time to time for 30 seconds', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "0.00.50";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var expected = new Date(2000, 1, 1, 0, 0, 30);
        expect(fixture.componentInstance.inputOutputTime).toEqual(expected.toLocaleTimeString());
    }));

    it('should convert decimal time to time for quarter day', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "2.50.00";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var expected = new Date(2000, 1, 1, 6, 0, 0);
        expect(fixture.componentInstance.inputOutputTime).toEqual(expected.toLocaleTimeString());
    }));

    it('should convert decimal time to time for 4:30PM', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "6.88.00";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var expected = new Date(2000, 1, 1, 16, 30, 43);
        expect(fixture.componentInstance.inputOutputTime).toEqual(expected.toLocaleTimeString());
    }));

    it('should convert decimal time to time for 3:14PM', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "6.35.00";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var expected = new Date(2000, 1, 1, 15, 14, 24);
        expect(fixture.componentInstance.inputOutputTime).toEqual(expected.toLocaleTimeString());
    }));

    it('should convert decimal time to time for 7:09PM', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "7.98.00";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var expected = new Date(2000, 1, 1, 19, 9, 7);
        expect(fixture.componentInstance.inputOutputTime).toEqual(expected.toLocaleTimeString());
    }));

    it('should validate decimal time format when only minute', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "6.35";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var hasError = fixture.componentInstance.errors.length > 0;
        expect(hasError).toBe(false);
    }));

    it('should error decimal time format when hour greater than 10', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "11.35";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var hasError = fixture.componentInstance.errors.length > 0;
        expect(hasError).toBe(true);
    }));

    it('should error decimal time format when hour less than 0', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "-1.35";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var hasError = fixture.componentInstance.errors.length > 0;
        expect(hasError).toBe(true);
    }));

    it('should error decimal time format when minute is more than 99', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "1.100";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var hasError = fixture.componentInstance.errors.length > 0;
        expect(hasError).toBe(true);
    }));

    it('should error decimal time format when minute is less than 0', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "1.-1";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var hasError = fixture.componentInstance.errors.length > 0;
        expect(hasError).toBe(true);
    }));

    it('should error decimal time format when minute is not two digits', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "1.5";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var hasExplanation = fixture.componentInstance.errors.filter(x => x.includes("two digits")).length > 0;
        expect(hasExplanation).toBe(true);
    }));


    it('should error decimal time format when second is more than 99', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "1.10.100";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var hasError = fixture.componentInstance.errors.length > 0;
        expect(hasError).toBe(true);
    }));

    it('should error decimal time format when second is less than 0', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "1.10.-1";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var hasError = fixture.componentInstance.errors.length > 0;
        expect(hasError).toBe(true);
    }));

    it('should validate decimal time format when second is 00', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "1.10.00";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var hasError = fixture.componentInstance.errors.length > 0;
        expect(hasError).toBe(false);
    }));

    it('should error decimal time format when second is not two digits', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "1.50.4";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var hasExplanation = fixture.componentInstance.errors.filter(x => x.includes("two digits")).length > 0;
        expect(hasExplanation).toBe(true);
    }));

    it('should calculate valid date if only decimal hours and decimal minutes are given', async(() => {
        fixture.componentInstance.inputOutputDecimalTime = "7.98";
        fixture.componentInstance.decimalTimeInputChanged();

        fixture.componentInstance.convert();

        var expected = new Date(2000, 1, 1, 19, 9, 7);
        expect(fixture.componentInstance.inputOutputTime).toEqual(expected.toLocaleTimeString());
    }));

    it('should append zero to decimal seconds', async(() => {
        fixture.componentInstance.inputOutputTime = new Date(2000, 1, 1, 19, 30, 0).toLocaleTimeString();
        fixture.componentInstance.timeInputChanged();

        fixture.componentInstance.convert();

        expect(fixture.componentInstance.inputOutputDecimalTime).toEqual("8.12.50");
    }));

    it('should error on first attempt to convert', async(() => {
        fixture.componentInstance.convert();

        var hasExplanation = fixture.componentInstance.errors.filter(x => x.includes("must change one of the inputs")).length > 0;
        expect(hasExplanation).toBe(true);
    }));
});
