import {Component, OnInit, Input} from '@angular/core';
@Component({
    selector: 'ai-demand-view-base',
    templateUrl: './demand.view.base.component.html',
    styleUrls: ['../edit/demand.edit.base.scss']
})
export class DemandViewBaseComponent implements OnInit {
    @Input() template: any;

    constructor() {
    }

    ngOnInit(): void {
    }

}