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
        fixture.componentInstance.setDecimalTime(24, 0, 0);

        expect(fixture.componentInstance.decimalNow).toEqual(10);
    }));

    it('12 hours should return 0.5 decimal day (5 decimal hours)', async(() => {
        fixture.componentInstance.setDecimalTime(12, 0, 0);

        expect(fixture.componentInstance.decimalNow).toEqual(5);
    }));

    it('1440 minutes should return 1 decimal day (10 decimal hours)', async(() => {
        fixture.componentInstance.setDecimalTime(0, 1440, 0);

        expect(fixture.componentInstance.decimalNow).toEqual(10);
    }));

    it('720 minutes should return 5 decimal hours', async(() => {
        fixture.componentInstance.setDecimalTime(0, 720, 0);

        expect(fixture.componentInstance.decimalNow).toEqual(5);
    }));

    it('86400 seconds should return 10 decimal hours', async(() => {
        fixture.componentInstance.setDecimalTime(0, 0, 86400);

        expect(fixture.componentInstance.decimalNow).toEqual(10);
    }));

    it('43200 seconds should return 5 decimal hours', async(() => {
        fixture.componentInstance.setDecimalTime(0, 0, 43200);

        expect(fixture.componentInstance.decimalNow).toEqual(5);
    }));

    it('should format nicely', async(() => {
        var time = 9.346512;
        var expected = '9.34.65';

        expect(fixture.componentInstance.formatDecimalTime(time)).toEqual(expected);
    }));

    it('should format nicely with round up', async(() => {
        var time = 9.34655;
        var expected = '9.34.66';

        expect(fixture.componentInstance.formatDecimalTime(time)).toEqual(expected);
    }));

    it('should format nicely with round down', async(() => {
        var time = 9.34654;
        var expected = '9.34.65';

        expect(fixture.componentInstance.formatDecimalTime(time)).toEqual(expected);
    }));

    it('should convert inputed time AM', async(() => {
        fixture.componentInstance.inputTime = '9:30';
        fixture.componentInstance.convertInputTime();

        fixture.componentInstance.setDecimalTime(9, 30, 0);
        expect(fixture.componentInstance.calculatedDecimalTime).toEqual(fixture.componentInstance.decimalNow);
    }));

    it('should convert inputed time PM', async(() => {
        fixture.componentInstance.inputTime = '17:30';
        fixture.componentInstance.convertInputTime();

        fixture.componentInstance.setDecimalTime(17, 30, 0);
        expect(fixture.componentInstance.calculatedDecimalTime).toEqual(fixture.componentInstance.decimalNow);
    }));
});
