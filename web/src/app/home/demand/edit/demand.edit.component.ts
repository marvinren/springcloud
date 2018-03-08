import {Component, OnInit} from '@angular/core';
@Component({
    selector: 'ai-demand-edit',
    templateUrl: './demand.edit.component.html',
    styleUrls: ['../demand.scss', './demand.edit.scss']
})
export class DemandEditComponent implements OnInit {
    nav = 1;
    rightModel = '';

    template = {
        type: 1
    };

    constructor() {
    }

    ngOnInit(): void {
    }

    showSubmit() {
        this.rightModel = 'show';
    }

    closeSubmit() {
        this.rightModel = 'false';
    }

    onSubmit() {

    }
}