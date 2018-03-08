import {Component, OnInit} from '@angular/core';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
import {IslamicCivilI18n} from '../../../core/providers/date.datepickerI18n';
@Component({
    selector: 'ai-demand',
    templateUrl: './demand.component.html',
    styleUrls: ['./demand.scss'],
    providers: [{provide: NgbDatepickerI18n, useClass: IslamicCivilI18n}]
})
export class DemandComponent implements OnInit {

    searchBox = {
        demand_name: '',
        demand_number: '',
        demand_creator: '',
        charge: '',
        submit_time_begin: null,
        submit_time_end: null,
        dept: '',
        flow: '',
        step: '',
        type: '',
        system: ''
    };
    searchBoxFlag = false;
    pagination = {
        page: 1
    };

    constructor() {
    }

    ngOnInit(): void {
    }
}