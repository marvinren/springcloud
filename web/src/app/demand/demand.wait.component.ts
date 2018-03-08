import {Component, OnInit} from '@angular/core';
import {NgbDatepickerI18n} from '@ng-bootstrap/ng-bootstrap';
@Component({
    selector: 'ai-demand-wait',
    templateUrl: './demand.wait.component.html',
    styleUrls: ['./demand.wait.scss']
})
export class DemandWaitComponent implements OnInit {

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