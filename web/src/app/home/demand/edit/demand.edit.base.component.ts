import {Component, OnInit, Input} from '@angular/core';
@Component({
    selector: 'ai-demand-edit-base',
    templateUrl: './demand.edit.base.component.html',
    styleUrls: ['./demand.edit.base.scss']
})
export class DemandEditBaseComponent implements OnInit {

    @Input() template;

    constructor() {
    }

    ngOnInit(): void {
    }

}